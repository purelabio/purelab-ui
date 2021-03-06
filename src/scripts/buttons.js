import {findDOMNode} from 'react-dom'
import {Component} from './utils'

export class Button extends Component {
  constructor () {
    super(...arguments)
    this.state = {cursorX: '50%', cursorY: '50%', animate: false}
    this.setButton = this.setButton.bind(this)
    this.onAnimationEnd = this.onAnimationEnd.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onAnimationEnd (event) {
    event.preventDefault()
    this.setState({animate: false})
  }

  setButton (button) {
    // Without findDOMNode, the ref might be a nested component instance
    this.button = findDOMNode(button)
  }

  onClick (event) {
    const layerRect = this.button.getBoundingClientRect()
    this.setState({
      cursorX: event.clientX - layerRect.left,
      cursorY: event.clientY - layerRect.top,
      animate: true,
    })
  }

  render() {
    const {element, children, className, ...props} = this.props
    const {cursorX, cursorY, animate} = this.state

    return React.cloneElement(element || <button />, {
      className: className || 'pl-button-raised',
      ref: this.setButton,
      onClick: this.onClick,
      onAnimationEnd: this.onAnimationEnd,
      children: (
        <span className='row-center-center'>
          {children}
          {animate ?
          <span
            className='pl-ripple-container --animate'
            style={{top: cursorY, left: cursorX}}
            /> : null}
        </span>
      ),
      ...props,
    })
  }
}

export class ActionButton extends Component {
  render () {
    const {className, ...props} = this.props

    return (
      <Button
        className={className || 'pl-action-button'}
        {...props}
        >
        <span className='mdi mdi-1x5 mdi-plus' />
      </Button>
    )
  }
}

export class ChipButton extends Component {
  render() {
    const {className, children, ...props} = this.props

    return (
      <Button
        className={className || 'pl-chip-button'}
        {...props}
        >
        {children}
      </Button>
    )
  }
}
