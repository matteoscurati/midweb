const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const jquery = require('jquery');
const webpack = require('webpack');

let styles = null;

if (process.env.NODE_ENV !== 'production') {
  styles = {
    test: /\.sass$/,
    use: [{
      loader: "style-loader"
    }, {
      loader: "css-loader", options: {
        sourceMap: true
      }
    }, {
      loader: "postcss-loader", options: {
        plugins: function () {
          return [
            require('autoprefixer')
          ];
        },
        sourceMap: true
      }
    }, {
      loader: "sass-loader", options: {
        sourceMap: true
      }
    }, {
      loader: "import-glob-loader"
    }]
  }
} else {
  styles = {
    test: /\.sass$/,
    loader: ExtractTextPlugin.extract({
      use: [{
        loader: "css-loader"
      }, {
        loader: "postcss-loader", options: {
          plugins: function () {
            return [
              require('autoprefixer')
            ];
          }
        }
      }, {
        loader: "sass-loader"
      }, {
        loader: "import-glob-loader"
      }],
      fallback: "style-loader"
    })
  }
};

const config = {
  entry: {
    index: path.join(__dirname, '/source/assets/javascripts/index.js'),
  },
  resolve: {
    modules: [
      __dirname + '/source/assets/javascript',
      __dirname + '/source/assets/stylesheets',
      __dirname + '/node_modules',
    ],
    extensions: ['.js', '.css', '.sass']
  },
  output: {
    path: path.join(__dirname, '/.tmp/dist'),
    filename: 'assets/javascripts/index.js'
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
      },
      styles
    ],
  },
  devtool: "source-map",
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new ExtractTextPlugin('assets/stylesheets/application.css')

  ],
};

module.exports = config;
