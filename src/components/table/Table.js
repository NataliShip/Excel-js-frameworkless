import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template'
import { dom } from '@core/helpers/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(25)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const target = dom(event.target)
      const parent = target.closest('[data-resizeble="resizeble"]')
      const coords = parent.getCoords()
      const colArray = this.root.findAll(`[data-index="${parent.dataset.index}"]`)

      document.onmousemove = e => {
        if (event.target.dataset.resize === 'row') {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          parent.el.style.height = `${value}px`
        }
        if (event.target.dataset.resize === 'col') {
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          colArray.forEach(cell => cell.style.width = `${value}px`)
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
