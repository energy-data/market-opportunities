import test from 'ava'
import * as utils from '../app/assets/scripts/utils'

test('utils tests', t => {
  const array = [1, 2, 3]
  const smallerArray = utils.toggleArrayElement(array, 2)
  const biggerArray = utils.toggleArrayElement(array, 4)
  t.truthy(smallerArray.length < array.length)
  t.truthy(smallerArray.indexOf(2) === -1)
  t.truthy(biggerArray.length > array.length)
  t.truthy(biggerArray.indexOf(4) > -1)
})
