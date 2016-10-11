/* global fetch */
require('es6-promise').polyfill()
require('isomorphic-fetch')

import tocolor from 'to-color'
import chroma from 'chroma-js'
import intersect from 'turf-intersect'
import buffer from 'turf-buffer'
import area from 'turf-area'
import { saveAs } from 'file-saver'
import PDFDocument from 'pdfkit'
import blobStream from 'blob-stream'

import { presetLayerColors, popLayer } from './constants'
import { countries } from '../data/countries'

// fetch fonts & images on init for use in PDF
let MSLight, MSSemiBold, Logo
fetch('assets/fonts/Montserrat-Light.ttf')
  .then(response => response.arrayBuffer())
  .then(font => {
    MSLight = font
  })

fetch('assets/fonts/Montserrat-SemiBold.ttf')
  .then(response => response.arrayBuffer())
  .then(font => {
    MSSemiBold = font
  })

fetch('assets/graphics/content/ifc-logo.png')
  .then(response => response.arrayBuffer())
  .then(logo => {
    Logo = logo
  })

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
    case 'categorical-unique':
      return ['all',
        ['in', filterObject.property].concat(filterObject.values),
        ['==', 'iso', iso]
      ]
    case 'buffer':
      return ['==', 'iso', iso]
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
 * creates a 'range' object to be used in the Nouislider options
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
  const baseColor = getLayerColor(layer.name)
  if (layer.options.value.type === 'range') {
    return {
      'fill-color': {
        'property': layer.options.value.property,
        'stops': layer.options.value.stops.map((stop, j) => {
          return [stop, chroma(baseColor).darken(j - Math.floor(layer.options.value.stops.length / 2)).hex()]
        })
      }
    }
  } else if (['buffer', 'categorical', 'categorical-unique'].indexOf(layer.options.value.type) > -1) {
    return {
      'fill-color': baseColor
    }
  } else {
    console.warn('Unsupported layer type given')
  }
}

export function createOutlinePaintObject (layer) {
  return {
    'line-color': getLayerColor(layer.name),
    'line-width': 1,
    'line-opacity': 1
  }
}

export function createTempPaintStyle (layer) {
  switch (layer.options.geometry.type) {
    case 'line':
      return {
        'line-color': getLayerColor(layer.name),
        'line-opacity': 1
      }
    case 'circle':
      return {
        'circle-color': getLayerColor(layer.name),
        'circle-opacity': 1
      }
    default:
      console.warn(`Not a valid geometry type: ${layer.options.geometry.type}`)
  }
}

export function getLayerColor (name) {
  let returnColor
  if (presetLayerColors.hasOwnProperty(name)) {
    returnColor = presetLayerColors[name]
  } else {
    returnColor = tocolor(name)
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

export function downloadMapPDF (props) {
  const doc = new PDFDocument()
  const stream = doc.pipe(blobStream())
  const canvas = props.getMapReference().getCanvas()
  const dataURL = canvas.toDataURL('image/png')
  const aspectRatio = canvas.height / canvas.width
  const pageWidth = 612 // Letter; http://www.a4papersize.org/a4-paper-size-in-pixels.php
  const pageHeight = 792

  const baseFontColor = '#47595d'
  const secondaryFontColor = '#919b9e'
  const primaryColor = '#0da081'

  const column = 252
  const gutter = 28
  const margin = 40

  // Limit map height to 344px. Which is roughly 16:9 with a 612 pageWidth
  const mapHeight = pageWidth * aspectRatio > 344 ? 344 : pageWidth * aspectRatio
  const mapWidth = mapHeight / aspectRatio
  const mapMargin = mapWidth === pageWidth ? 0 : (pageWidth - mapWidth) / 2

  // Title
  doc.fontSize(20)
  doc.fillColor(baseFontColor)
    .font(MSSemiBold)
    .text(countries[props.country].name, margin, margin)

  // Subtitle
  doc.fontSize(8)
  doc.fillColor(secondaryFontColor)
    .font(MSSemiBold)
    .text('SELECTED AREA LOREM IPSUM', margin, margin + 24)

  // Right Title
  doc.fontSize(12)
  doc.fillColor(baseFontColor)
    .font(MSSemiBold)
    .text('Off-Grid Market Opportunities', pageWidth - column - margin, margin, {
      width: column,
      align: 'right'
    })

  // Right Subtitle
  doc.fontSize(8)
  doc.fillColor(secondaryFontColor)
    .font(MSSemiBold)
    .text('POWERED BY ENERGY PLATFORM', pageWidth - column - margin, margin + 16, {
      width: column,
      align: 'right'
    })

  // Map Body Base
  doc.rect(0, 96, pageWidth, mapHeight)
     .fillColor('#E1E1E1')
     .fill()

  // Map
  doc.image(dataURL, mapMargin, 96, {fit: [pageWidth, mapHeight]})

  // Map outline
  doc.rect(0, 96, pageWidth, 1)
     .fillColor('#192F35', 0.08)
     .fill()

  doc.rect(0, 96 + mapHeight - 1, pageWidth, 1)
     .fillColor('#192F35', 0.08)
     .fill()

  // Secondary Body Base
  doc.rect(0, 96 + mapHeight, pageWidth, pageHeight - (96 + mapHeight) - margin * 2)
     .fill('#f6f7f7')

  doc.rect(0, pageHeight - margin * 2 - 1, pageWidth, 1)
     .fillColor('#192F35', 0.08)
     .fill()

  // Indicator Headers
  doc.fontSize(12)
  doc.fillColor(baseFontColor)
    .font(MSSemiBold)
    .text('Selected Indicators', margin, 96 + mapHeight + 20)

  doc.rect(margin, 96 + mapHeight + 38, 28, 2)
     .fill(primaryColor)

  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat ante sagittis lacus vulputate suscipit. Donec sodales elementum blandit. Integer vel lectus id sapien euismod faucibus.'
  doc.fontSize(8)
  doc.fillColor(baseFontColor)
    .font(MSLight)
    .text(lorem, margin, 96 + mapHeight + 52, {
      width: column,
      align: 'left'
    })

  // Analysis Headers
  doc.fontSize(12)
  doc.fillColor(baseFontColor)
    .font(MSSemiBold)
    .text('Analysis', margin + column + gutter, 96 + mapHeight + 20)

  doc.rect(margin + column + gutter, 96 + mapHeight + 38, 28, 2)
     .fill(primaryColor)

  const loremTwo = 'Donec sodales elementum blandit. Integer vel lectus id sapien euismod faucibus.'
  doc.fontSize(8)
  doc.fillColor(baseFontColor)
    .font(MSLight)
    .text(loremTwo, margin + column + gutter, 96 + mapHeight + 52, {
      width: column,
      align: 'left'
    })

  // Indicators
  const indicators = props.layers.indicators.filter(a => a.visible)
  indicators.forEach((layer, index) => {
    doc.circle(margin + 3, 96 + mapHeight + 112 + 3 + (index * 24), 3)
       .fill(getLayerColor(layer.name))

    doc.fontSize(8)
    doc.fillColor(secondaryFontColor)
       .font(MSLight)
       .text(prettifyString(layer.name).toUpperCase(), margin + 10, 96 + mapHeight + 112 - 2 + (index * 24))

    doc.fontSize(8)
    doc.fillColor(baseFontColor)
       .font(MSSemiBold)
       .text((filterSummary(layer.options, layer.filter) + (layer.id === popLayer.id ? '  ppl/km2' : '')), margin, 96 + mapHeight + 112 - 2 + (index * 24), {
         width: column,
         align: 'right'
       })

    if (index !== indicators.length - 1) {
      doc.rect(margin, 96 + mapHeight + 126 + (index * 24), column, 1)
         .fillColor('#192F35', 0.08)
         .fill()
    }
  })

  // Analysis
  const { population, revenuePerHousehold, marketCapture, geojson } = props
  const hhCount = population / countries[props.country].avg_hh_size
  const outputs = [
    { name: 'Area', value: numberWithCommas(Math.round(area(geojson) / 1000000)) + ' KM2' },
    { name: 'Population', value: shortenNumber(Math.round(population), 2) },
    { name: 'Households', value: shortenNumber(hhCount, 2) },
    { name: 'Market Captured', value: Math.round(marketCapture * 100) + '%' },
    { name: 'Avg. revenue per HH', value: '$' + revenuePerHousehold },
    { name: 'Size of the Prize', value: shortenNumber(hhCount * revenuePerHousehold * marketCapture, 2) }
  ]
  outputs.forEach((output, index) => {
    doc.fontSize(8)
    doc.fillColor(secondaryFontColor)
       .font(MSLight)
       .text(output.name.toUpperCase(), margin + column + gutter, 96 + mapHeight + 112 - 2 + (index * 24))

    doc.fontSize(8)
    doc.fillColor(baseFontColor)
       .font(MSSemiBold)
       .text(output.value, pageWidth - column - margin, 96 + mapHeight + 112 - 2 + (index * 24), {
         width: column,
         align: 'right'
       })

    if (index !== outputs.length - 1) {
      doc.rect(margin + column + gutter, 96 + mapHeight + 126 + (index * 24), column, 1)
         .fillColor('#192F35', 0.08)
         .fill()
    }
  })

  // Footer
  doc.image(Logo, margin, pageHeight - (margin * 1.5), { height: 16 })

  doc.fontSize(8)
  doc.fillColor(secondaryFontColor)
    .font(MSLight)
    .text('offgrid.energydata.info', pageWidth - column - margin, pageHeight - (margin * 1.5), {
      width: column,
      height: 16,
      align: 'right',
      link: 'offgrid.energydata.info'
    })

  doc.fontSize(8)
  doc.fillColor(secondaryFontColor)
    .font(MSLight)
    .text('© ' + new Date().getFullYear(), pageWidth - column - margin, pageHeight - margin * 1.5 + 12, {
      width: column,
      height: 16,
      align: 'right'
    })

  doc.end()
  stream.on('finish', () => {
    saveAs(stream.toBlob('application/pdf'), 'intersect.pdf')
  })
}

export function filterSummary (options, filter) {
  let formatter
  switch (options.value.format) {
    case 'percentage':
      formatter = a => `${a * 100}%`
      break
    case 'pop':
      formatter = a => numberWithCommas(Math.pow(10, a + 0.5) / 100)
      break
    case 'shorten':
      formatter = a => numberWithCommas(a)
      break
    default:
      formatter = a => numberWithCommas(a.toFixed(0))
  }
  switch (options.value.type) {
    case 'range':
      return filter.range.map(formatter).join(' - ')
    case 'categorical':
    case 'categorical-unique':
      return filter.values.join(', ') || 'No options selected'
    case 'buffer':
      return `${formatter(filter.value)} km buffer`
    default:
      console.warn('Unsupported filter type')
      return null
  }
}

// nouislider requires formatters as objects with to and from methods
// http://refreshless.com/nouislider/slider-read-write/#section-formatting
export function pipFormatter (format) {
  switch (format) {
    case 'percentage':
      return { to: a => `${a * 100}%`, from: a => Number(a.replace('%', '')) / 100 }
    // NOTE: this from function does not do a proper reversal but that's okay
    case 'pop':
      return { to: a => shortenNumber(Math.pow(10, a + 0.5) / 100, 0), from: a => Math.log10(a * 100) - 0.5 }
    case 'shorten':
      return { to: a => shortenNumber(a, 1), from: a => a }
    default:
      return { to: a => numberWithCommas(a), from: a => Number(a.replace(/,/g, '')) }
  }
}

function numberWithCommas (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
module.exports.numberWithCommas = numberWithCommas

export function shortenNumber (number, decimals) {
  decimals = (decimals === undefined) ? 0 : decimals
  if (number >= 1000000000) {
    return `${(number / 1000000000).toFixed(decimals)} B`
  } else if (number >= 1000000) {
    return `${(number / 1000000).toFixed(decimals)} M`
  } else if (number >= 1000) {
    return `${(number / 1000).toFixed(decimals)} K`
  } else {
    return number
  }
}
