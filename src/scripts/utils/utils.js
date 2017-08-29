import {TaskQue} from 'prax'

export class CleanupQue extends TaskQue {
  constructor () {
    super()
    this.dam()
  }

  flush () {
    if (this.state !== this.state.FLUSHING) {
      try {super.flush()}
      finally {this.dam()}
    }
  }

  deinit () {
    this.flush()
  }
}
