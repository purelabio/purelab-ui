import {PraxComponent} from 'prax'

export class Root extends PraxComponent {
  subrender () {
    return (
      <div className='stretch-to-viewport'>
        <div className='flex-1'>
          <Section title='Buttons'>
            <ActionButtons />
            <div className='row-center-start gaps-4-h'>
              <FlatButtons />
              <RaisedButtons />
            </div>
          </Section>
          <Section title='Chip Buttons'>
            <ChipButtons />
          </Section>
          <Section title='Switches and sliders'>
            <Switches />
          </Section>
        </div>
      </div>
    )
  }
}
