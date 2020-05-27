import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template'
import { resize } from '@/components/table/resize'
import { shouldResize } from '@core/helpers/utils'

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
    if (shouldResize(event)) {
      resize(event, this.root)
    }
  }
}
