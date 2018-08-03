# Shopify Plugins

[![CircleCI](https://circleci.com/gh/nerdsofalltrades/shopify-plugins.svg?style=svg)](https://circleci.com/gh/nerdsofalltrades/shopify-plugins)
[![Greenkeeper badge](https://badges.greenkeeper.io/nerdsofalltrades/shopify-plugins.svg)](https://greenkeeper.io/)

Add features to your Shopify storefront and checkout with lightweight and easily integrateable plugins.

## Shop integration

Plugins are loaded dynamically and only in context. That means, that i.e. the _progress-bar_ plugin is only loaded in when visitor is in the checkout process.
The _accept-terms_ plugin is only loaded for the checkout contact information step.

To enable a plugin add this code to your _Google Analytics Additional Scripts_ section in Shopify's Admin / Online Store / Preferences.

```
  (function() {
    var plugin = document.createElement('script');
    plugin.src = '//cdn.jsdelivr.net/gh/nerdsofalltrades/shopify-plugins/dist/shopify-plugin-loader.min.js';
    document.body.appendChild(plugin);

    plugin.onload = function () {
      var ctx = window.ShopifyPlugins;

      // Load plugins here

      // Load the accept-terms plugin only in checkout
      // contact information step
      ctx.checkout.contactInformation.load('accept-terms');

      // Load the progress-bar plugin for all steps
      // in checkout
      ctx.checkout.all.load('progress-bar');

      // Load other plugins here...
    }
  })();
```

## Plugins

### Accept terms plugin

This plugin adds a mandatory Accept Terms checkbox below the Accept Marketing
Checkbox in Shopify's contact information checkout step.

![Accept terms plugin in action](examples/accept-terms/accept-terms.png)

Add this code to your `plugin.onload` function to enable it.

```
ctx.checkout.contactInformation.load('accept-terms');
```

Without options standard english texts are displayed and the url of your terms
is expected to be found at `/pages/terms`. To change that just pass options
and set it up as you like.

```
ctx.checkout.contactInformation.load('accept-terms', {
  // The checkbox label
  label: "I have read and I agree to the",
  // The label of the terms link
  termsName: "terms",
  // The url to your terms
  termsURL: "/pages/terms",
  // Message displayed when customer tries to go on without agreeing
  errorMessage: "Please agree to our terms before your purchase"
});
```

### Progress bar plugin

This plugin replaces the upper breadcrumb navigation of Shopify's checkout with
a bubble progress bar.
As the existing breadcrumb labels are used for displaying the single steps no additional
configuration is needed.

![Progress bar plugin in action](examples/progress-bar/progress-bar.png)

Add this code to your `plugin.onload` function to enable it.

```
ctx.checkout.all.load('progress-bar');
```

## Development

```
$ npm install
$ npm run dev
```

Open http://localhost:3000 to test the plugins.

## Note

This software is not correlated to Shopify.
