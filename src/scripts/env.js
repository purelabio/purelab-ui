import {Agent, patch, derefIn} from 'prax'
import {Dom} from './components/dom'

export class Env extends Agent {
  init (prevEnv) {
    const prev = path => derefIn(prevEnv, path)

    this.swap(patch, {
      dom: new Dom(this, prev(['dom'])),
    })

    if (prevEnv) prevEnv.deinit()

    this.deref().dom.init()
  }

  deinit() {
    // Views drive a lot of reactivity, they need to die first
    try {this.swap(patch, {dom: null})}
    finally {super.deinit()}
  }
}
