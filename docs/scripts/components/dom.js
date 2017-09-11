import {render, unmountComponentAtNode} from 'react-dom'
import {Agent, PraxComponent} from 'prax'
import {CleanupQue} from '../utils'
import {Root} from '../views/root'

export class Dom extends Agent {
  constructor (env) {
    super({
      cleanup: new CleanupQue(),
    })
    this.env = env
  }

  init () {
    const {env} = this
    const {cleanup} = this.deref()

    PraxComponent.prototype.env = env

    const rootNode = document.getElementById('root')

    if (rootNode) {
      render(<Root />, rootNode)
      cleanup.push(() => {
        unmountComponentAtNode(rootNode)
      })
    }
  }
}
