import {Component} from './utils'

export class Checkbox extends Component {
  render() {
    const {className, ...props} = this.props

    return (
      <label className={className || 'pl-checkbox'}>
        <input
          type='checkbox'
          className='pl-checkbox-input'
          {...props}
          />
        <span className='pl-checkbox-decorator'>
          <span className='mdi mdi-check pl-checkbox-icon' />
        </span>
      </label>
    )
  }
}

export class Radio extends Component {
  render() {
    const {className, ...props} = this.props

    return (
      <label className={className || 'pl-radio'}>
        <input
          type='radio'
          className='pl-radio-input'
          {...props}
          />
        <span className='pl-radio-decorator' />
      </label>
    )
  }
}

export class Switch extends Component {
  render() {
    const {className, ...props} = this.props

    return (
      <label className={className || 'pl-switch'}>
        <input
          type='checkbox'
          className='pl-switch-input'
          {...props}
          />
        <span className='pl-switch-knob' />
        <span className='pl-switch-track' />
      </label>
    )
  }
}

export class ToggleItem extends Component {
  render() {
    const {className, children, ...props} = this.props

    return (
      <label className={className || 'pl-toggle-item'}>
        <input
          type='radio'
          className='pl-toggle-input'
          {...props}
          />
        <span className='pl-toggle-decorator'>
          {children}
        </span>
      </label>
    )
  }
}
