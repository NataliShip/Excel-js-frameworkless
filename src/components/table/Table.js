import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(50)
  }

  onMousedown(e) {
    if (e.target.dataset.resize) {
      console.log('start resizing', e.target.dataset.resize)
    }
  }
}
