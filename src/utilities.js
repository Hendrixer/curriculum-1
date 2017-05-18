export const each = (array, cb) => {
  for (let i = 0; i < array.length; i++) {
    cb(array[i], i, array)
  }
}

export const map = (array, cb) => {
  let results = []
  for (let i = 0; i < array.length; i++) {
    results.push(cb(array[i], i, array))
  }
  return results
}
