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

export const filter = (array, cb) => {
  return reduce(array, (results, item, i) => {
    if (cb(item, i, array)) {
      results.push(item)
    }
    return results
  }, [])
}

export const every = (array, cb) => {
  if (!array.length) {
    return true
  }

  let result = false
  for (let i = 0; i < array.length; i++) {
    result = Boolean(cb(array[i], i, array))
    if (!result) {
      return result
    }
  }
  return result
}


export const flatten = (array, result = []) => {
  return reduce(array, (mem, item) => {
    if (Array.isArray(item)) {
      return flatten(item, mem)
    }
    mem.push(item)
    return mem
  }, result)
}


