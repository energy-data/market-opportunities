import test from 'ava'
import * as utils from '../app/assets/scripts/utils'
import { mockLayers } from './fixtures/constants'

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

test('indicatorFilterToMapFilter', t => {
  const filterObject = mockLayers[0].filter
  t.deepEqual(utils.indicatorFilterToMapFilter(filterObject), ['all',
    ['>=', filterObject.property, filterObject.range[0]],
    ['<=', filterObject.property, filterObject.range[1]]
  ])
})

test('prettifyString', t => {
  const string = 'the-way-that-dataset-names-get-stored'
  t.is(utils.prettifyString(string), 'The Way That Dataset Names Get Stored')
})

test('arrayToRangeObject', t => {
  const array = [2, 3]
  t.deepEqual(utils.arrayToRangeObject(array), { min: 2, max: 3 })
})

test('stopsToNoUiSliderRange', t => {
  const stops = [1, 2, 3, 4, 5, 6, 7]
  t.deepEqual(utils.stopsToNoUiSliderRange(stops), {
    'min': 1,
    '17%': 2,
    '33%': 3,
    '50%': 4,
    '67%': 5,
    '83%': 6,
    'max': 7
  })
})

test('createPaintObject', t => {
  const rangeLayer = mockLayers[0]
  t.deepEqual(utils.createPaintObject(rangeLayer), {
    'fill-color': {
      'property': 'test',
      'stops': [
        [ 0, '#ffffff' ],
        [ 1, '#ffffff' ],
        [ 2, '#ffffee' ],
        [ 3, '#ccccbc' ],
        [ 4, '#9b9b8c' ],
        [ 5, '#6d6d5e' ]
      ]
    }
  })
})
