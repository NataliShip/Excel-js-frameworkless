class Dom {
  constructor(selector) {
    this.el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.el.innerHTML = html
      return this
    }

    return this.el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.el
    }

    if (Element.prototype.append) {
      this.el.append(node)
    } else {
      this.el.appendChild(node)
    }

    return this
  }

  on(eventType, callback) {
    this.el.addEventListener(eventType, callback)
  }

  remove(eventType, callback) {
    this.el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return dom(this.el.closest(selector))
  }

  get dataset() {
    return this.el.dataset
  }

  getCoords() {
    return this.el.getBoundingClientRect()
  }

  findAll(selector) {
    return this.el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object.entries(styles).forEach(([key, value]) => {
      this.el.style[key] = value
    })
  }
}

// static method
dom.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)

  if (classes) {
    el.classList.add(classes)
  }

  return dom(el)
}

export function dom(selector) {
  return new Dom(selector)
}
