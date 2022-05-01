function inertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function save(item, key, compare, maxLen) {
  const items = JSON.parse(localStorage.getItem(key))
  inertArray(items, item, compare, maxLen)
  localStorage.setItem(key, JSON.stringify(items))
  return items
}

export function remove(key, compare) {
  const items = JSON.parse(localStorage.getItem(key))
  deleteFromArray(items, compare)
  localStorage.setItem(key, JSON.stringify(items))
  return items
}

export function load(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function clear(key) {
  localStorage.removeItem(key)
  return []
}

export function saveAll(items, key) {
  localStorage.setItem(key, JSON.stringify(items))
}
