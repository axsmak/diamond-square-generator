const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const app = require('./package.json');

module.exports = {
  mode: 'development',
  entry: './debug/plot.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'plot.js',
    library: 'Plot',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './debug/index.html'),
      filename: 'index.html',
      title: app.description,
      inject: 'head',
      hot: true,
    }),
  ],
};
