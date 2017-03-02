const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const jquery = require('jquery');
const webpack = require('webpack');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, '/source/javascripts/'),
  dist: path.join(__dirname, '/.tmp/dist'),
};

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.dist,
    filename: 'javascripts/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ],
  },
  devtool: "source-map",
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
};
