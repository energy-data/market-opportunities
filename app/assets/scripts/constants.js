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
  { id: 'd', name: 'Grid', group: 'a', type: 'base' },
  { id: 'mb-road-layers', name: 'Roads', group: 'a', type: 'base' }
]

export const countries = [
  { name: 'Tanzania', flagPath: 'assets/graphics/content/flags/4x3/tz.svg', area: '947,303 km2', population: '51,820,000' },
  { name: 'Zambia', flagPath: 'assets/graphics/content/flags/4x3/zm.svg', area: '752,618 km2', population: '15,721,000' },
  { name: 'Nigeria', flagPath: 'assets/graphics/content/flags/4x3/ng.svg', area: '923,768 km2', population: '177,476,000' }
]

export const scenarios = [
  { title: 'Scenario 1', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 2', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 3', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 4', thumbnail: 'http://placehold.it/768x384' }
]

export const mapStyle = 'mapbox://styles/devseed/cip5i5wgd000rb8m9pce23cnk'

export const intersectPaint = {
  'fill-color': '#0da080',
  'fill-opacity': 0.3
}

// tocolor outputs as rgba(r, g, b, a)
// chroma accepts an array as a constructor
// colors
// liteblue '#8fcef9' (143, 206, 249)
// blue '#09749e'     (9, 116, 158)
// litegreen '#bde39a'(189, 227, 154)
// green '#2a904e'    (42, 144, 78)
// pink '#fcab90'     (252, 171, 144)
// red '#d02e2b'      (208, 46, 43)
// pale '#ffc990'     (255, 201, 144)
// orange '#f5861a'   (245, 134, 26)
// litepurp '#c3a1de' (195, 161, 222)
// purp '#7f3a95'     (127, 58, 149)
// liteyell '#f3ea9b' (243, 234, 155)
// hotpurp '#c274b3'  (194, 116, 179)
// gold '#f6c217'     (246, 194, 23)
// ygreen '#9db926'   (157, 185, 38)
// turqoise '#4fc3ac' (79, 195, 172)

export const presetLayerColors = {
  'healthcare-facilities': [9, 116, 158],
  'energy-access-ongrid': [42, 144, 78],
  'mining-locations-in-ssa': [34, 68, 200],
  'population-density': [200, 68, 34]
}

export const roadLayers = [
  'road-pedestrian-case',
  'road-street-low',
  'road-street_limited-low',
  'road-service-link-track-case',
  'road-street_limited-case',
  'road-street-case',
  'road-main-case',
  'road-primary-case',
  'road-motorway_link-case',
  'road-trunk_link-case',
  'road-trunk-case',
  'road-motorway-case',
  'road-construction',
  'road-sidewalks',
  'road-path',
  'road-steps',
  'road-trunk_link',
  'road-motorway_link',
  'road-pedestrian',
  'road-service-link-track',
  'road-street_limited'
]
