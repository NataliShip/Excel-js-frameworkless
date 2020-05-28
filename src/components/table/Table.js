import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template'
import { resize } from '@/components/table/resize'
import { shouldResize, isCell, matrix } from '@core/helpers/utils'
import { TableSelection } from '@/components/table/TableSelection'
import { dom } from '@core/helpers/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'click']
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const cell = this.root.find('[data-id="0:0"]')
    this.selection.select(cell)
  }

  toHTML() {
    return createTable(25)
  }

  onClick(e) {
    if (isCell(e)) {
      const targetEl = dom(e.target)
      if (e.shiftKey) {
        const target = targetEl.id(true)
        const current = this.selection.current.id(true)
        const cells = matrix(target, current)
            .map(id => this.root.find(`[data-id="${id}"]`))
        this.selection.selectGroup(cells)
      } else {
        this.selection.select(targetEl)
      }
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resize(event, this.root)
    }
  }
}
