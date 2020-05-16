import { getMethodName } from '@core/helpers/utils'

export class DomListener {
  constructor(root, listeners = []) {
    if (!root) throw new Error('No $root provided for DomListener')
    this.root = root
    this.listeners = listeners
  }

  initDomListeners() {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener)

      if (!this[methodName]) {
        throw new Error(`Method ${methodName} is not implemented in ${this.name} class`)
      }

      this[methodName] = this[methodName].bind(this)
      this.root.on(listener, this[methodName])
    })
  }

  removeDomListeners() {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener)
      this.root.remove(listener, this[methodName])
    })
  }
}
