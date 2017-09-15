const path              = require('path');
const webpack           = require('webpack');
const Merge             = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BaseConfig        = require('./webpack.base.conf.js');
const entry             = {index: './demo/index.js'};

// add hot-reload related code to entry chunks
Object.keys(entry)
  .forEach(name => entry[name] = ['./build/dev-client'].concat(entry[name]));

module.exports = Merge(BaseConfig, {
  entry: entry,

  output: {
    path: path.resolve(__dirname, '../'),
    filename: '[name].js?[hash:8]',
  },

  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
    ]
  },

  devtool: '#cheap-module-eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [require('nib')()],
          import: ['~nib/lib/nib/index.styl']
        },
        vue: {
          loaders: {
            css: 'style-loader!css-loader',
            stylus: 'style-loader!css-loader!stylus-loader'
          }
        },
      }
    }),
    new HtmlWebpackPlugin({
      cache: true,
      hash: false,
      inject: true,
      chunksSortMode: 'dependency',
      filename: 'index.html',
      template: './demo/index.html',
      chunks: ['index']
    })
  ]

});