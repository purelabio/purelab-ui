/* eslint-disable no-multi-assign */

// This must be executed before any other code.
if (module.hot) {
  module.hot.accept(err => {
    console.warn('Exception during HMR update.', err)
  })
  module.hot.dispose(() => {
    console.clear()
  })
}

const {Env} = require('./env')

window.app = {}

const prevEnv = window.app.env

export const env = window.app.env = new Env()

try {
  env.init(prevEnv)
}
catch (err) {
  if (prevEnv) prevEnv.deinit()
  throw err
}

/**
 * REPL
 */

const prax = require('prax')

window.app = {React, ...window.app, ...prax, prax, env}

delete window.app.isNaN
delete window.app.isFinite
delete window.app.exports

prax.assign(window, window.app)
;['log', 'info', 'warn', 'error', 'clear'].forEach(key => {
  if (!/bound/.test(console[key].name)) {
    window[key] = console[key] = console[key].bind(console)
  }
})
