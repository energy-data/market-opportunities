import tocolor from 'to-color'
import chroma from 'chroma-js'
import intersect from 'turf-intersect'
import buffer from 'turf-buffer'
import { saveAs } from 'file-saver'
import PDFDocument from 'pdfkit'
import blobStream from 'blob-stream'

import { presetLayerColors } from './constants'

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

export function indicatorFilterToMapFilter (filterObject, iso) {
  switch (filterObject.type) {
    case 'range':
      return ['all',
        ['>=', filterObject.property, filterObject.range[0]],
        ['<=', filterObject.property, filterObject.range[1]],
        ['==', 'iso', iso]
      ]
    case 'categorical':
      return ['all',
        ['in', filterObject.property].concat(filterObject.values),
        ['==', 'iso', iso]
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

export function createDataPaintObject (layer) {
  const baseColor = getLayerColor(layer.datasetName)

  switch (layer.options.geometry.type) {
    case 'fill':
      if (layer.options.value.type === 'range') {
        return {
          'fill-color': {
            'property': layer.options.value.property,
            'stops': layer.options.value.stops.map((stop, j) => {
              return [stop, chroma(baseColor).darken(j - 2).hex()]
            })
          }
        }
      } else if (layer.options.value.type === 'categorical') {
        return {
          'fill-color': baseColor
        }
      }
      break
    default:
      console.warn('Unsupported layer type given')
  }
}

export function createOutlinePaintObject (layer) {
  return {
    'line-color': getLayerColor(layer.datasetName),
    'line-opacity': 1,
    'line-dasharray': [4, 2]
  }
}

export function getLayerColor (datasetName) {
  let returnColor
  if (presetLayerColors.hasOwnProperty(datasetName)) {
    returnColor = presetLayerColors[datasetName]
  } else {
    returnColor = tocolor(datasetName)
      .replace('rgba(', '').split(',').map(a => Number(a)).filter(Boolean)
  }
  return chroma(returnColor).hex()
}

export function intersectLayers (layers) {
  try {
    return layers.map(layer => layer.geojson).reduce((a, b) => buffer(intersect(a, b), 0))
  } catch (e) {
    console.warn(e)
    return null
  }
}

export function downloadGeoJSON (geojson) {
  const blob = new Blob([JSON.stringify(geojson)], {type: 'application/json;charset=utf-8'})
  saveAs(blob, 'intersect.geojson')
}

export function downloadMapImage (map) {
  map.getCanvas().toBlob(blob => {
    saveAs(blob, 'intersect.png')
  })
}

export function downloadMapPDF (map) {
  const doc = new PDFDocument()
  const stream = doc.pipe(blobStream())
  const canvas = map.getCanvas()
  const dataURL = canvas.toDataURL('image/png')
  const aspectRatio = canvas.height / canvas.width
  const pageWidth = 500

  doc.image(dataURL, 60, 30, { width: pageWidth })
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;\nMauris at ante tellus. Vestibulum a metus lectus. Praesent tempor purus a lacus blandit eget gravida ante hendrerit. Cras et eros metus. Sed commodo malesuada eros, vitae interdum augue semper quis. Fusce id magna nunc. Curabitur sollicitudin placerat semper. Cras et mi neque, a dignissim risus. Nulla venenatis porta lacus, vel rhoncus lectus tempor vitae. Duis sagittis venenatis rutrum. Curabitur tempor massa tortor.'

  doc.fontSize(12)
  doc.fillColor('#333333')
    .font('Helvetica')
    .text(lorem, 60, 60 + pageWidth * aspectRatio, {
      width: pageWidth,
      align: 'justify',
      indent: 30,
      columns: 2,
      height: 200,
      ellipsis: true
    })

  doc.end()
  stream.on('finish', () => {
    saveAs(stream.toBlob('application/pdf'), 'intersect.pdf')
  })
}

export function filterSummary (options, filter) {
  const formatter = (options.value.format === 'percentage')
  ? a => `${a * 100}%`
  : a => numberWithCommas(a.toFixed(0))
  switch (options.value.type) {
    case 'range':
      return filter.range.map(formatter).join(' - ')
    case 'categorical':
      return filter.values.join(', ')
    default:
      console.warn('Unsupported filter type')
      return null
  }
}

// nouislider requires formatters as objects with to and from methods
// http://refreshless.com/nouislider/slider-read-write/#section-formatting
export function pipFormatter (format) {
  return (format === 'percentage')
  ? { to: a => `${a * 100}%`, from: a => Number(a.replace('%', '')) / 100 }
  : { to: a => numberWithCommas(a), from: a => Number(a.replace(/,/g, '')) }
}

export function numberWithCommas (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
