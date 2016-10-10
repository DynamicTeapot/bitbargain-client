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
  devServer: {
    proxy: {
      '/api/**': {
        target: 'http://52.52.22.4',
        secure: false
      },
      '/auth/**': {
        target: 'http://52.52.22.4',
        secure: false
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
