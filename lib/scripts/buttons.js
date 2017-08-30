import {PraxComponent} from 'prax'
import {findDOMNode} from 'react-dom'

export class Button extends PraxComponent {
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

  subrender () {
    const element = this.props.element
    const children = this.props.children
    const className = this.props.className
    const props = _.omit(this.props, 'element', 'children', 'className')

    const cursorX = this.state.cursorX
    const cursorY = this.state.cursorY
    const animate = this.state.animate

    return React.cloneElement(
      element || React.createElement('button'),
      Object.assign({}, {
        className: className || 'pl-button-raised',
        ref: this.setButton,
        onClick: this.onClick,
        onAnimationEnd: this.onAnimationEnd,
      }, props),
      React.createElement('span', {className: 'row-center-center'}, [
        children,
        animate ? React.createElement('span', {
          className: 'pl-ripple-container --animate',
          style: {top: cursorY, left: cursorX},
          key: 'ripple',
        }) : null,
      ])
    )
  }
}

export class ActionButton extends PraxComponent {
  subrender () {
    const className = this.props.className
    const props = _.omit(this.props, 'className')

    return React.createElement(
      Button,
      Object.assign({}, {className: className || 'pl-action-button'}, props),
      React.createElement('span', {className: 'mdi mdi-1x5 mdi-plus'})
    )
  }
}
