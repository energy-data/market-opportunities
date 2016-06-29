import tocolor from 'to-color'
import chroma from 'chroma-js'

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

export function indicatorFilterToMapFilter (filterObject) {
  switch (filterObject.type) {
    case 'range':
      return ['all',
        ['>=', filterObject.property, filterObject.range[0]],
        ['<=', filterObject.property, filterObject.range[1]]
      ]
  }
}

export function pick (object, properties) {
  var result = {}
  properties.forEach(function (key) { result[key] = object[key] })
  return result
}

export function prettifyString (string) {
  return string.split('-').map(m => capitalize(m)).join(' ')
}

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function arrayToRangeObject (array) {
  return { min: array[0], max: array[1] }
}

/*
 * creates a "range" object to be used in the Nouislider options
 * sending more that two elements in the stop array allows for the creation
 * of non-linear sliders (http://refreshless.com/nouislider/slider-values/#section-non-linear)
 * @param {Array<number>} stops breakpoint values in the data
 * @returns {Object} range nouislider range object to specify creation of the slider and pips
 */

export function stopsToNoUiSliderRange (stops) {
  let range = {}
  stops.forEach((stop, i) => {
    if (i === 0) {
      range['min'] = stop
    } else if (i === stops.length - 1) {
      range['max'] = stop
    } else {
      range[(i / (stops.length - 1) * 100).toFixed(0) + '%'] = stop
    }
  })
  return range
}

export function createPaintObject (layer) {
  // tocolor outputs as rgba(r, g, b, a)
  // chroma accepts an array as a constructor
  const baseColorArray = tocolor(layer.datasetName)
    .replace('rgba(', '').split(',').map(a => Number(a)).filter(Boolean)

  switch (layer.options.geometry.type) {
    case 'fill':
      if (layer.options.value.type === 'range') {
        return {
          'fill-color': {
            'property': layer.options.value.property,
            'stops': layer.options.value.stops.map((stop, i) => {
              // TODO: maybe have a better color scale
              return [stop, chroma(baseColorArray).darken(i - 2).hex()]
            })
          }
        }
      } else if (layer.options.value.type === 'categorical') {
        return {
          'fill-color': chroma(baseColorArray).hex()
        }
      }
      break
    default:
      console.warn('Unsupported layer type given')
  }
}
