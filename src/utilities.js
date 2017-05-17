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

export const reduce = (array, cb, accumulator) => {
  accumulator = accumulator === undefined
    ? array[0] 
    : accumulator

  for(let i = 0; i < array.length; i++){
    accumulator = cb(accumulator, array[i], i)
  }
  return accumulator
}
