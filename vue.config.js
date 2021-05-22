const path = require('path');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  chainWebpack: config => {
    config.module.rule('svg')
      .exclude
      .add(resolve('src/icons'))
      .end();
    config.module.rule('icons')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  },
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  }
};
