class Dom {

}

dom.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return el
}

export function dom() {
  return new Dom()
}
