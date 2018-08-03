export default class Plugin {
  static register(key, plugin) {
    window.ShopifyPlugins.plugins[key] = plugin;
  }
}
