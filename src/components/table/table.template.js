import { CODES } from '@core/helpers/constants'

function toCell(_, index) {
  return `
    <div class='cell' data-index=${index} contenteditable></div>
  `
}

function toColumn(el, index) {
  return `
    <div class='column' data-resizeble='resizeble' data-index=${index}>
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

  for (let i = 0; i < rowsCount; i += 1) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
