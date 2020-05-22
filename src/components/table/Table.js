import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor(root, options) {
    super(root, {
      name: 'Table',
      // listeners: ['mouseup', 'mousedown', 'mousemove']
    })
  }

  toHTML() {
    return createTable(50)
  }

  // onMouseup(e) {
  //   console.log(e)
  // }
  //
  // onMousedown(e) {
  //   console.log(e)
  // }
  //
  // onMousemove() {
  //   console.log('mousemove')
  // }
}
