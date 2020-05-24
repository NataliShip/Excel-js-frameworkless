import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'mouseup']
    })
    this.isResizing = false
    this.target = null
    this.x = { start: 0, current: 0 }
    this.y = { start: 0, current: 0 }
  }

  toHTML() {
    return createTable(50)
  }

  onMousedown(e) {
    if (e.target.dataset.resize) {
      this.isResizing = true
      this.x.start = e.pageX
      this.y.start = e.pageY
      this.target = e.target
    }
  }

  onMousemove(e) {
    if (this.isResizing && this.target?.dataset?.resize) {
      this.x.current = e.pageX
      this.y.current = e.pageY
    }
  }

  onMouseup(e) {
    if (this.isResizing && this.target?.dataset?.resize) {
      this.isResizing = false

      if (this.target.dataset.resize === 'row') {
        const row = this.target.closest('.row')
        const newHeight = this.y.current - this.y.start + this.target.closest('.row').offsetHeight
        row.style.height = `${newHeight}px`
      }
      if (this.target.dataset.resize === 'col') {
        const colIndex = this.target.closest('.column')?.dataset?.index
        const colArray = document.querySelectorAll(`[data-index="${colIndex}"]`)
        const newWidth = this.x.current - this.x.start + this.target.closest('.column').offsetWidth
        colArray.forEach(cell => cell.style.width = `${newWidth}px`)
      }

      this.x = { start: 0, current: 0 }
      this.y = { start: 0, current: 0 }
    }
  }
}
