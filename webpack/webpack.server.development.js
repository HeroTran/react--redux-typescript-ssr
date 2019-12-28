const WebpackBar = require('webpackbar');
const merge = require('webpack-merge');

const { server } = require('./common');

module.exports = merge(server, {
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js'
  },
  plugins: [new WebpackBar({ name: 'server' })]
});
