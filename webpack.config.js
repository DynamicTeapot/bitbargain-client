const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/public');
const APP_DIR = path.resolve(__dirname, 'client');

const config = {
  entry: './app/routes.jsx',
  output: {
    path: BUILD_DIR,
    publicPath: BUILD_DIR,
    filename: 'bundle.js'
  },
  devserver: {
    proxy: {
      '/api': {
        target: 'http://bitbargains.online'
      },
      '/auth': {
        target: 'http://bitbargains.online'
      }
    },
    port: 3000,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};

module.exports = config;
