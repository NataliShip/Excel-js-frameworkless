import { CODES } from '@core/helpers/constants'

function createCell() {
  return `
    <div class="cell" contenteditable>A1</div>
  `
}

function toColumn(el) {
  return `
    <div class='column'>${el}</div>
  `
}

function createRow(content) {
  return `
    <div class='row'>
      <div class='row-info'></div>
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

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i += 1) {
    rows.push(createRow())
  }

  return rows.join('')
}
