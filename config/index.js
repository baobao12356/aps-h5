var path = require('path');
var proxyConfig = require('./proxyConfig');

module.exports = {
  build: {
    env: {NODE_ENV: '"production"'},
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: {NODE_ENV: '"development"'},
    port: 9000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: proxyConfig,
    cssSourceMap: false
  }
};
