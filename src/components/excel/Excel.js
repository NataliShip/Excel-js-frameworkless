import { dom } from '@core/helpers/dom'

export class Excel {
  constructor(selector, options) {
    this.el = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot() {
    const root = dom.create('div', 'excel')

    this.components.forEach(Component => {
      const container = dom.create('div', Component.className)
      const component = new Component(container)
      container.innerHTML = component.toHTML()
      root.append(container)
    })

    return root
  }

  render() {
    this.el.append(this.getRoot())
  }
}
