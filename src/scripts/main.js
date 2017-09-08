/* eslint-disable no-multi-assign */

import * as prax from 'prax'
import {Env} from './env'

window.app = {}

const prevEnv = window.app.env

const env = window.app.env = new Env()

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
