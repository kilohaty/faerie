const path    = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
    }
  },

  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue-loader',},
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash:8]'
        }
      }
    ]
  },

  plugins: [
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
  ],

};
