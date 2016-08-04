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
  let filterObject = mockLayers[0].filter
  const iso = 'nga'
  t.deepEqual(utils.indicatorFilterToMapFilter(filterObject, iso), ['all',
    ['>=', filterObject.property, filterObject.range[0]],
    ['<=', filterObject.property, filterObject.range[1]],
    ['==', 'iso', iso]
  ])

  filterObject = mockLayers[1].filter
  t.deepEqual(utils.indicatorFilterToMapFilter(filterObject, iso), ['all',
    ['in', filterObject.property].concat(filterObject.values),
    ['==', 'iso', iso]
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

test('createDataPaintObject', t => {
  const rangeLayer = mockLayers[0]
  t.deepEqual(utils.createDataPaintObject(rangeLayer), {
    'fill-color': {
      'property': 'test',
      'stops': [
        [ 0, '#ffffff' ],
        [ 0.2, '#ffffff' ],
        [ 0.4, '#ffffee' ],
        [ 0.6, '#ccccbc' ],
        [ 0.8, '#9b9b8c' ],
        [ 1, '#6d6d5e' ]
      ]
    }
  })

  const categoricalLayer = mockLayers[1]
  t.deepEqual(utils.createDataPaintObject(categoricalLayer), {
    'fill-color': '#ffffee'
  })

  const badLayer = mockLayers[3]
  t.falsy(utils.createDataPaintObject(badLayer))
})

test('createOutlinePaintObject', t => {
  const rangeLayer = mockLayers[0]
  t.deepEqual(utils.createOutlinePaintObject(rangeLayer), {
    'line-color': '#ffffee',
    'line-opacity': 1,
    'line-dasharray': [4, 2]
  })
})

test('getLayerColor', t => {
  t.is(utils.getLayerColor('energy-access-underserved'), '#09749e')
})

test('filterSummary', t => {
  let options = mockLayers[0].options
  let filter = mockLayers[0].filter

  t.is(utils.filterSummary(options, filter), '0% - 100%')

  options.value = Object.assign({}, options.value, { format: 'not percentage' })
  t.is(utils.filterSummary(options, filter), '0 - 1')

  options = mockLayers[1].options
  filter = mockLayers[1].filter
  t.is(utils.filterSummary(options, filter), 'a, b, c')

  options.value = Object.assign({}, options.value, { type: 'not a type' })
  t.is(utils.filterSummary(options, filter), null)
})

test('pipFormatter', t => {
  let formatter = utils.pipFormatter('percentage')
  t.is(formatter.to(0.2), '20%')
  t.is(formatter.from('35%'), 0.35)

  formatter = utils.pipFormatter('something else')
  t.is(formatter.to(12345), '12,345')
  t.is(formatter.from('345,567,123'), 345567123)
})

test('numberWithCommas', t => {
  t.is(utils.numberWithCommas(87162534), '87,162,534')
})
