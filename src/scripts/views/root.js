import {PraxComponent} from 'prax'
import {Button} from 'lib'

export class Root extends PraxComponent {
  subrender () {
    return (
      <div className='stretch-to-viewport'>
        <div className='flex-1'>
          <Button>Button</Button>
        </div>
      </div>
    )
  }
}
