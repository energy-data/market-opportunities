import config from './config'

export const baseLayers = [
  {
    id: 'a',
    name: 'Transmission Network',
    type: 'base',
    url: 'https://s3.amazonaws.com/test-offgrid-mvt/tiles/208de98c-f9b5-4a94-9a98-7fcd55734c01/index.tilejson',
    layerType: 'line',
    paint: {
      'line-color': '#1CBD9D',
      'line-opacity': 0.5,
      'line-width': 2
    }
  },
  { id: 'b', name: 'Satellite', group: 'a', type: 'base' },
  { id: 'c', name: 'OSM', group: 'a', type: 'base' },
  { id: 'd', name: 'Grid', group: 'a', type: 'base' }
]

export const countries = [
  { name: 'Tanzania', flagPath: `${config.basePath}assets/graphics/content/flags/4x3/tz.svg`, area: '947,303 km2', population: '51,820,000' },
  { name: 'Zambia', flagPath: `${config.basePath}assets/graphics/content/flags/4x3/zm.svg`, area: '752,618 km2', population: '15,721,000' },
  { name: 'Nigeria', flagPath: `${config.basePath}assets/graphics/content/flags/4x3/ng.svg`, area: '923,768 km2', population: '177,476,000' }
]

export const scenarios = [
  { title: 'Scenario 1', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 2', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 3', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 4', thumbnail: 'http://placehold.it/768x384' }
]

export const mapStyle = 'mapbox://styles/devseed/cip5i5wgd000rb8m9pce23cnk'

export const intersectPaint = {
  'fill-color': 'blue',
  'fill-opacity': 0.3
}
