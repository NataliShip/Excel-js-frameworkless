export class TableSelection {
  static className = 'selected'

  constructor() {
    this._group = []
  }

  select(el) {
    this._clear()
    this._group.push(el)
    el.addClass(TableSelection.className)
  }

  _clear() {
    this._group.forEach(el => el.removeClass(TableSelection.className))
    this._group = []
  }

  selectGroup() {

  }
}
