import {PraxComponent} from 'prax'
import {Button, ActionButton, ChipButton, Checkbox, Radio, Switch, ToggleItem} from 'purelab-ui'

export class Section extends PraxComponent {
  subrender() {
    const {title, single, children} = this.props

    return (
      <div className='col-start-stretch padding-2 children-margin-2-v fg-black-600'>
        {!title ? null :
        <h2 className='weight-bold padding-2-h'>
          {title}
        </h2>}
        <div className='row-stretch'>
          <div className='padding-2 children-margin-3-v'>
            {children}
          </div>
          {single ? null :
          <div className='padding-2 children-margin-3-v theme-bg-primary fg-white'>
            {children}
          </div>}
        </div>
      </div>
    )
  }
}

export class FlatButtons extends PraxComponent {
  subrender() {
    return (
      <div className='col-start-stretch children-margin-3-v'>
        <h3 className='font-smaller text-center weight-bold'>
          Flat
        </h3>
        <Button className='pl-button-flat'>
          Normal
        </Button>
        <Button className='pl-button-flat hover'>
          Hover
        </Button>
        <Button className='pl-button-flat active'>
          Active
        </Button>
        <Button className='pl-button-flat' disabled>
          Disabled
        </Button>
      </div>
    )
  }
}

export class RaisedButtons extends PraxComponent {
  subrender() {
    return (
      <div className='col-start-stretch children-margin-3-v'>
        <h3 className='font-smaller text-center weight-bold'>
          Raised
        </h3>
        <Button className='pl-button-raised'>
          Normal
        </Button>
        <Button className='pl-button-raised hover'>
          Hover
        </Button>
        <Button className='pl-button-raised active'>
          Active
        </Button>
        <Button className='pl-button-raised' disabled>
          Disabled
        </Button>
      </div>
    )
  }
}

export class ActionButtons extends PraxComponent {
  subrender() {
    return (
      <div className='row-center-start children-margin-1-h'>
        <ActionButton />
        <ActionButton className='pl-action-button hover' />
        <ActionButton className='pl-action-button active' />
        <ActionButton className='pl-action-button' disabled />
      </div>
    )
  }
}

export class ChipButtons extends PraxComponent {
  subrender() {
    return (
      <div className='children-margin-1x25-v'>
        <h3 className='font-small'>Normal</h3>
        <div className='row-start-start children-margin-0x5-h'>
          <ChipButton>
            Normal
          </ChipButton>
          <ChipButton className='pl-chip-button hover'>
            Hover
          </ChipButton>
          <ChipButton className='pl-chip-button active'>
            Active
          </ChipButton>
          <ChipButton className='pl-chip-button' disabled>
            Disabled
          </ChipButton>
        </div>
        <h3 className='font-small'>Selected</h3>
        <div className='row-start-start children-margin-0x5-h'>
          <ChipButton aria-pressed>
            Normal
          </ChipButton>
          <ChipButton className='pl-chip-button hover' aria-pressed>
            Hover
          </ChipButton>
          <ChipButton className='pl-chip-button active' aria-pressed>
            Active
          </ChipButton>
          <ChipButton className='pl-chip-button' disabled aria-pressed>
            Disabled
          </ChipButton>
        </div>
      </div>
    )
  }
}

export class Switches extends PraxComponent {
  subrender() {
    return (
      <div className='children-margin-2-v'>
        <div className='row-stretch'>
          <div className='col-start-center children-margin-2-v'>
            <Checkbox defaultChecked />
            <Checkbox />
          </div>
          <div className='col-start-center children-margin-2-v'>
            <Radio defaultChecked />
            <Radio />
          </div>
          <div className='col-start-center children-margin-2-v'>
            <Switch defaultChecked />
            <Switch />
          </div>
        </div>
        <div className='pl-toggle'>
          <ToggleItem name='toggle'>1</ToggleItem>
          <ToggleItem name='toggle'>2</ToggleItem>
          <ToggleItem name='toggle'>3</ToggleItem>
          <ToggleItem name='toggle'>4</ToggleItem>
          <ToggleItem name='toggle'>5</ToggleItem>
        </div>
      </div>
    )
  }
}
