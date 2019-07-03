/* eslint-env node, commonjs */
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkerPlugin = require('worker-plugin')

module.exports = {
  mode: 'production',
  entry: { main: './main.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new WorkerPlugin()
  ],
  // devtool: 'source-map',
  // devtool: 'eval-source-map',
  // devtool: 'inline-cheap-module-source-map',
  // devtool: 'inline-source-map',
  optimization: {
    minimize: false
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8000
  }
}
