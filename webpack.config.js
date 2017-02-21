const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const jquery = require('jquery');
const merge = require('webpack-merge');
const webpack = require('webpack');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, '/source/javascripts/'),
  dist: path.join(__dirname, '/.tmp/dist'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.dist,
      filename: 'javascripts/index.js',
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      })
    ],
  },
  parts.loadJavaScript({ include: PATHS.app }),
]);

const productionConfig = merge([
  parts.lintJavaScript({ include: PATHS.dist })
]);

const developmentConfig = merge([
  {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            failOnWarning: false,
            failOnError: true,
            fix: true,
          },
        },
      }),
    ],
  },
  parts.lintJavaScript({
    include: PATHS.dist,
    options: {
      emitWarning: true,
    },
  }),
]);

module.exports = function(env) {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
