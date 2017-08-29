'use strict'

const fs = require('fs')
const pt = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: pt.resolve('src/scripts/main.js'),
  },

  output: {
    path: pt.resolve('dist/scripts'),
    filename: '[name].js',
    // For dev middleware
    publicPath: '/scripts/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          fs.realpathSync('src'),
        ],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      React: 'react',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  // For dev middleware
  stats: {
    colors: true,
    chunks: false,
    version: false,
    hash: false,
    assets: false,
  },
}
