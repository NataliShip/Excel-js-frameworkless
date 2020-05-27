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
      let value = 0

      target.css({
        opacity: 1
      })

      const line = dom.create('div')
      this.root.append(line)

      document.onmousemove = e => {
        if (type === 'row') {
          const delta = e.pageY - coords.bottom
          value = coords.height + delta
          if (value < 0) return

          target.css({
            bottom: `${-delta - 4}px`
          })
          line.css({
            position: 'absolute',
            top: `${e.pageY - this.root.getCoords().top}px`,
            left: '0',
            height: '1px',
            width: '100vw',
            background: '#3c74ff'
          })
        }
        if (type === 'col') {
          const delta = e.pageX - coords.right
          value = coords.width + delta
          if (value < 0) return

          target.css({
            right: `${-delta - 4}px`
          })
          line.css({
            position: 'absolute',
            top: '0',
            left: `${e.pageX}px`,
            height: '100vh',
            width: '1px',
            background: '#3c74ff'
          })
        }
      }

      document.onmouseup = () => {
        target.css({
          opacity: 0,
          bottom: 0,
          right: 0
        })

        if (type === 'row') {
          parent.css({height: `${value}px`})
        }
        if (type === 'col') {
          this.root.findAll(`[data-index="${parent.dataset.index}"]`)
              .forEach(cell => dom(cell).css({width: `${value}px`}))
        }

        line.delete()
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
