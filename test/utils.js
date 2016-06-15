import test from 'ava'
import * as utils from '../app/assets/scripts/utils'

test('toggleArrayElement', t => {
  const array = [1, 2, 3]
  const smallerArray = utils.toggleArrayElement(array, 2)
  const biggerArray = utils.toggleArrayElement(array, 4)
  t.truthy(smallerArray.length < array.length)
  t.truthy(smallerArray.indexOf(2) === -1)
  t.truthy(biggerArray.length > array.length)
  t.truthy(biggerArray.indexOf(4) > -1)
})

test('inFirstArrayNotSecond', t => {
  const arrayOne = [{ id: 1 }, { id: 2 }, { id: 3 }]
  const arrayTwo = [{ id: 2 }, { id: 3 }, { id: 4 }]

  t.deepEqual(utils.inFirstArrayNotSecond(arrayOne, arrayTwo, a => a.id), [{id: 1}])
  t.deepEqual(utils.inFirstArrayNotSecond(arrayTwo, arrayOne, a => a.id), [{id: 4}])
})

test('unique', t => {
  const array = [1, 1, 2, 3]
  t.is(utils.unique(array).length, 3)
})
