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
  { id: 'b', name: 'Satellite', group: 'a', type: 'base', visible: true },
  { id: 'c', name: 'OSM', group: 'a', type: 'base' },
  { id: 'd', name: 'Grid', group: 'a', type: 'base' }
]

// TODO: at some point we should copy options object over to filter object
export const mockLayers = [
  {
    id: '1',
    name: 'Population Density',
    group: 'Socioeconomics',
    type: 'red',
    layerType: 'fill',
    options: {
      range: {
        'min': [ 0, 100 ],
        '25%': [ 100, 1000 ],
        '50%': [ 1000, 10000 ],
        '75%': [ 10000, 100000 ],
        'max': [ 100000, 0 ]
      }
    },
    filter: { range: [0, 100000] },
    mapKey: 'pop100km2',
    url: 'https://s3.amazonaws.com/test-offgrid-mvt/tiles/eb838cff-401d-4acd-97b6-5666dd0d160c-57a2afbe-37f0-11e6-9c37-0242ac110005/data.tilejson',
    paint: {
      'fill-color': {
        'property': 'pop100km2',
        'stops': [
             [0, '#15a52f'],
             [100, '#b0c93f'],
             [1000, '#74cf8a'],
             [10000, '#49250c'],
             [100000, '#dc6f5c']
        ]
      }
    }
  },
  { id: '2', name: 'Mobile Penetration', group: 'Socioeconomics', type: 'blue', options: { range: { min: 0, max: 100 } }, filter: { range: [0, 100] } },
  { id: '3', name: 'Lorem ipsum', group: 'Socioeconomics', type: 'green', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] }, visible: true },
  { id: '4', name: 'Sit amet', group: 'Socioeconomics', type: 'yellow', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } },
  { id: '5', name: 'Yet Another Indicator', group: 'Financing & Payments', type: 'yellow', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } },
  { id: '6', name: 'Yet Another Indicator', group: 'Resouce Potential', type: 'yellow', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } }
]

export const countries = [
  { name: 'Tanzania', flagPath: '/assets/graphics/content/flags/4x3/tz.svg', area: '947,303 km2', population: '51,820,000' },
  { name: 'Zambia', flagPath: '/assets/graphics/content/flags/4x3/zm.svg', area: '752,618 km2', population: '15,721,000' },
  { name: 'Nigeria', flagPath: '/assets/graphics/content/flags/4x3/ng.svg', area: '923,768 km2', population: '177,476,000' }
]

export const scenarios = [
  { title: 'Scenario 1', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 2', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 3', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 4', thumbnail: 'http://placehold.it/768x384' }
]

export const mapStyle = 'mapbox://styles/devseed/cip5i5wgd000rb8m9pce23cnk'
