import { CODES } from '@core/helpers/constants'

function toCell(row) {
  return (_, col) => `
    <div
      class='cell' 
      data-col=${col}
      data-type='cell'
      data-id="${row}:${col}"
      contenteditable
    ></div>
  `
}

function toColumn(el, col) {
  return `
    <div class='column' data-resizeble='resizeble' data-col=${col}>
      ${el}
      <div class='col-resize' data-resize='col'></div>
    </div>
  `
}

function createRow(index, content) {
  const resizeElement = index ? `<div class='row-resize' data-resize='row'></div>` : ''
  return `
    <div class='row' data-resizeble='resizeble'>
      <div class='row-info'>
        ${ index || '' }
        ${ resizeElement }
      </div>
      <div class='row-data'>${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row += 1) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
