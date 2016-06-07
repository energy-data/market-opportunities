export function toggleArrayElement (array, el) {
  const tempArray = array.slice(0)
  const index = tempArray.indexOf(el)
  index > -1
  ? tempArray.splice(index, 1)
  : tempArray.push(el)
  return tempArray
}
