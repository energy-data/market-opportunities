export function toggleArrayElement (array, el) {
  const tempArray = array.slice(0)
  const index = tempArray.indexOf(el)
  index > -1
  ? tempArray.splice(index, 1)
  : tempArray.push(el)
  return tempArray
}

// return all elements of arrayOne not in arrayTwo, uses accessFn to compare
// if provided
export function inFirstArrayNotSecond (arrayOne, arrayTwo, accessFn) {
  /* istanbul ignore next */
  accessFn = accessFn || (a => a)
  return arrayOne.filter(a => {
    return arrayTwo.map(accessFn).indexOf(accessFn(a)) === -1
  })
}

export function unique (array) {
  return Array.from(new Set(array))
}
