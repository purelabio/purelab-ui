import {PraxComponent} from 'prax'
import {Section, FlatButtons, RaisedButtons, ActionButtons, ChipButtons} from './guideline'

export class Root extends PraxComponent {
  subrender () {
    return (
      <div className='stretch-to-viewport'>
        <div className='flex-1'>
          <Section title='Buttons'>
            <ActionButtons />
            <div className='row-center-start children-margin-4-h'>
              <FlatButtons />
              <RaisedButtons />
            </div>
          </Section>
          <Section title='Chip Buttons'>
            <ChipButtons />
          </Section>
        </div>
      </div>
    )
  }
}
