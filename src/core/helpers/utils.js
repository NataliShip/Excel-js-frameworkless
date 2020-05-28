export function getMethodName(string) {
  if (typeof string !== 'string') return ''

  return `on${string[0].toUpperCase()}${string.slice(1)}`
}

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function range(start, end) {
  if (start > end) {
    [start, end] = [end, start]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, i) => start + i)
}

export function matrix(target, current) {
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  return cols.reduce((acc, c) => {
    rows.forEach(r => acc.push(`${r}:${c}`))
    return acc
  }, [])
}
