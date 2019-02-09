const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const name = require('./package.json').name;
const version = require('./package.json').version;
const mode = process.env.NODE_ENV || 'production';
const plugins = ['accept-terms', 'validate-contact-information', 'progress-bar'];
const config = {
  mode,
  target: 'web',
  entry: {
    loader: './src/loader.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'shopify-plugin-[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VERSION': JSON.stringify(version)
    }),
    new HtmlWebpackPlugin({
      plugins: plugins
        .map(plugin => {
          return `<li><a href="${plugin}.html">${plugin} plugin </a></li>`;
        })
        .toString()
        .replace(/,/g, ' '),
      template: './examples/index.html'
    })
  ],
  devServer: {
    port: 3000
  }
};

plugins.forEach(plugin => {
  const pluginIdentifier = plugin;
  console.log('Registering plugin', plugin);
  config.entry[plugin] = `./src/plugins/${plugin}.js`;
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: `./examples/${plugin}/${plugin}.html`,
      filename: `${plugin}.html`,
      inject: false,
      version,
      install: `//cdn.jsdelivr.net/gh/nerdsofalltrades/${name}@${version}/dist/shopify-plugin-loader.min.js`
    })
  );
});

module.exports = config;
