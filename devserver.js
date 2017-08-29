'use strict'

const bs = require('browser-sync').create()
const mapValues = require('lodash/mapValues')

const config = require('./webpack.config')

const compiler = require('webpack')(extend(config, {
  entry: mapValues(config.entry, fsPath => (
    ['webpack-hot-middleware/client', fsPath]
  )),
}))

bs.init({
  startPath: '/',
  server: {
    baseDir: 'dist',
    middleware: [
      require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        stats: config.stats,
      }),
      require('webpack-hot-middleware')(compiler),
    ],
  },
  port: 23888,
  files: 'dist',
  open: false,
  online: false,
  ui: false,
  ghostMode: false,
  notify: false,
})

function extend () {
  return Object.assign({}, ...arguments)
}
