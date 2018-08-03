class Loader {
  static load(plugin, options) {
    const origin =
      process.env.NODE_ENV === 'production'
        ? `//cdn.jsdelivr.net/gh/nerdsofalltrades/shopify-plugins@${process.env.VERSION}/dist/`
        : '';
    process.env.NODE_ENV === 'development' && console.log(`Lazy-Loading ${plugin} plugin...`);
    fetch(`${origin}shopify-plugin-${plugin}.min.js`).then(result => {
      result.text().then(script => {
        const code = document.createElement('script');
        code.innerHTML = script;
        document.body.appendChild(code);
        window.ShopifyPlugins.plugins[plugin](options);
      });
    });
  }
}

class FalseLoader extends Loader {
  static load(plugin) {
    process.env.NODE_ENV === 'development' && console.log(`Not loading ${plugin}`);
  }
}

class ProductLoader {
  static load(plugin, options) {
    if (window.Shopify && window.Shopify.Page === 'product') {
      Loader.load(plugin, options);
    } else {
      FalseLoader.load(plugin);
    }
  }
}

class CheckoutLoader extends Loader {
  static load(plugin, options) {
    if (window.Shopify && window.Shopify.Checkout) {
      Loader.load(plugin, options);
    } else {
      FalseLoader.load(plugin);
    }
  }
  static get all() {
    return CheckoutLoader;
  }
  static get contactInformation() {
    if (window.Shopify && window.Shopify.Checkout && window.Shopify.Checkout.step === 'contact_information') {
      return CheckoutLoader;
    }
    return FalseLoader;
  }
}

class Context {
  constructor() {
    this.plugins = {};
  }

  get all() {
    return Loader;
  }

  get product() {
    return ProductLoader;
  }

  get checkout() {
    return CheckoutLoader;
  }
}

process.env.NODE_ENV === 'development' && console.log(`Shopify-Plugins Loader ${process.env.VERSION} initializing...`);
window.ShopifyPlugins = new Context();
