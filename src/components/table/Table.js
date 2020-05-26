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
      const type = event.target.dataset.resize
      const parent = target.closest('[data-resizeble="resizeble"]')
      const coords = parent.getCoords()
      const colArray = this.root.findAll(`[data-index="${parent.dataset.index}"]`)

      document.onmousemove = e => {
        if (type === 'row') {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          parent.css({height: `${value}px`})
        }
        if (type === 'col') {
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          colArray.forEach(cell => dom(cell).css({width: `${value}px`}))
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
