export class TableSelection {
  static className = 'selected'

  constructor() {
    this._group = []
    this.current = null
  }

  select(el) {
    this._clear()
    this.current = el
    this._group.push(el)
    el.addClass(TableSelection.className)
  }

  _clear() {
    this._group.forEach(el => el.removeClass(TableSelection.className))
    this._group = []
  }

  selectGroup(collection = []) {
    this._clear()
    this._group = [...collection]
    collection.forEach(el => el.addClass(TableSelection.className))
  }
}
