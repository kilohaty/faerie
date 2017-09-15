const path               = require('path');
const webpack            = require('webpack');
const Merge              = require('webpack-merge');
const BaseConfig         = require('./webpack.base.conf.js');
const CssAssetsPlugin    = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = Merge(BaseConfig, {
  entry: {index: './src/index.js'},

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'faerie'
  },

  externals: {
    vue: 'Vue',
  },

  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
    ]
  },

  devtool: '#source-map',

  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, '../dist')],
      {root: path.join(__dirname, '../'), verbose: true, dry: false}),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {use: [require('nib')()], import: ['~nib/lib/nib/index.styl'],},
        vue: {
          loaders: {
            css: ExtractTextPlugin.extract('css-loader'),
            stylus: ExtractTextPlugin.extract('css-loader!stylus-loader')
          }
        },
      }
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    new CssAssetsPlugin({
      cssProcessorOptions: {autoprefixer: false, discardComments: {removeAll: true}},
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      sourceMap: true
    }),
  ]

});