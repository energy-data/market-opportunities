export const popLayer = {
  id: '0a8a56d1-4456-405d-b797-019432173e76',
  tilejson: 'https://test-offgrid-mvt.s3.amazonaws.com/tiles/0a8a56d1-4456-405d-b797-019432173e76-1740e55a-2054-4941-88a7-325f993d7f47/data.tilejson'
}

export const baseLayers = [
  { id: 'mb-satellite', name: 'Satellite', group: 'a', type: 'base' },
  { id: 'mb-road-layers', name: 'Roads', group: 'a', type: 'base' }
]

export const highlightedCountries = [ 'TZA', 'ZMB', 'NGA' ]

export const scenarios = [
  { title: 'Scenario 1', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 2', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 3', thumbnail: 'http://placehold.it/768x384' },
  { title: 'Scenario 4', thumbnail: 'http://placehold.it/768x384' }
]

export const mapStyle = 'mapbox://styles/devseed/cip5i5wgd000rb8m9pce23cnk'

export const intersectPaint = {
  'fill-pattern': 'selectionfill',
  'fill-opacity': 1
}

// tocolor outputs as rgba(r, g, b, a)
// chroma accepts an array as a constructor
// colors
// liteblue '#8fcef9' (143, 206, 249)
// blue '#09749e'     (9, 116, 158)
// litegreen '#bde39a'(189, 227, 154) used
// green '#2a904e'    (42, 144, 78)
// pink '#fcab90'     (252, 171, 144)
// red '#d02e2b'      (208, 46, 43)
// pale '#ffc990'     (255, 201, 144)
// orange '#f5861a'   (245, 134, 26) used
// litepurp '#c3a1de' (195, 161, 222)
// purp '#7f3a95'     (127, 58, 149)
// liteyell '#f3ea9b' (243, 234, 155)
// hotpurp '#c274b3'  (194, 116, 179)
// gold '#f6c217'     (246, 194, 23) used
// ygreen '#9db926'   (157, 185, 38)
// turqoise '#4fc3ac' (79, 195, 172) used

export const presetLayerColors = {
  'healthcare-facilities': [79, 195, 172],
  'energy-access-ongrid': [42, 144, 78],
  'mining-locations-in-ssa': [169, 145, 94],
  'population-density': [200, 68, 34],
  'protected-areas': [42, 144, 78],
  'solar-potential-ghi': [245, 134, 26],
  'education-facilities': [127, 58, 149],
  'electricity-grid-ssa': [246, 194, 23],
  'proximity-to-road': [143, 206, 249],
  'distance-to-grid': [189, 227, 154]
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
