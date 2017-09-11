'use strict'

const pt = require('path')
const webpack = require('webpack')

const PROD = process.env.NODE_ENV === 'production'

const SRC_DIR = pt.resolve('docs/scripts')
const PUBLIC_DIR = pt.resolve('gh-pages/scripts')

module.exports = {
  entry: {
    main: pt.join(SRC_DIR, 'main.js'),
  },

  output: {
    path: PUBLIC_DIR,
    filename: '[name].js',
    // For dev middleware
    publicPath: '/scripts/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          pt.resolve('docs'),
          pt.resolve('src'),
        ],
        use: {loader: 'babel-loader'},
      },
      ...(!PROD ? [] : [
        // disable dev features and warnings in React and related libs
        {
          test: /react.*\.jsx?$/,
          include: /node_modules/,
          use: {loader: 'transform-loader', options: {envify: true}},
        },
      ]),
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      React: 'react',
    }),
    ...(PROD ? [
      new webpack.EnvironmentPlugin({
        NODE_ENV: process.env.NODE_ENV || 'development',
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        toplevel: true,
        compress: {warnings: false},
      }),
    ] : [
      new webpack.HotModuleReplacementPlugin(),
    ]),
  ],

  resolve: {
    alias: {
      'purelab-ui': pt.resolve(__dirname, './src/scripts/'),
    },
  },

  devtool: PROD ? 'source-map' : false,

  stats: {
    assets: false,
    colors: true,
    hash: false,
    modules: false,
    timings: true,
    version: false,
  },
}
