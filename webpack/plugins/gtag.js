const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = class GtagPlugin {
  constructor(id) {
    this.id = id;
    if (!this.id) {
      throw new Error('Google Measurement ID is required');
    }
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('GtagPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'GtagPlugin',
        (data, cb) => {
          data.headTags.push({
            tagName: 'script',
            voidTag: false,
            attributes: {
              async: true,
              src: `https://www.googletagmanager.com/gtag/js?id=${this.id}`,
            },
          });
          data.headTags.push({
            tagName: 'script',
            voidTag: false,
            innerHTML: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${this.id}');`, // eslint-disable-line max-len
          });
          cb(null, data);
        }
      );
    });
  }
};
