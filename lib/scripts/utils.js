import {createElement, Component as ReactComponent} from 'react'
import {is, equalBy} from 'emerge'
import {isObject} from 'fpx'

const {$$typeof: elementMarker} = createElement('div')

export class Component extends ReactComponent {
  // Prevents unnecessary renders caused by ancestor instances. Works best if
  // props and state are kept shallow.
  shouldComponentUpdate(props, state) {
    return !reactEqual(this.props, props) || !reactEqual(this.state, state)
  }
}

/**
 * Utils
 */

export function isElement(value) {
  return isObject(value) && value.$$typeof === elementMarker
}

export function reactEqual(left, right) {
  return isElement(left) && isElement(right)
    ? elemEqual(left, right)
    : equalBy(reactEqual, left, right)
}

function elemEqual(left, right) {
  return (
    is(left.type, right.type) &&
    is(left.key, right.key) &&
    propsEqual(left.props, right.props)
  )
}

function propsEqual(left, right) {
  for (const key in left) {
    if (key === 'children') continue
    if (!reactEqual(left[key], right[key])) return false
  }

  for (const key in right) {
    if (key === 'children') continue
    if (!reactEqual(left[key], right[key])) return false
  }

  return reactEqual(left.children, right.children)
}
