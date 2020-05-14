export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = document.createElement('div')
    $root.classList.add('excel')

    this.components.forEach(Component => {
      const $container = document.createElement('div')
      $container.classList.add(Component.className)
      const component = new Component($container)
      $container.innerHTML = component.toHTML()
      $root.append($container)
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
  }
}
