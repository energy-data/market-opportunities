module.exports = {
  baseLayers: [
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
  ],
  mockLayers: [
    { id: '1', name: 'Population Density', group: 'Socioeconomics', type: 'red', options: { range: [0, 100] }, filter: { range: [0, 100] } },
    { id: '2', name: 'Mobile Penetration', group: 'Socioeconomics', type: 'blue', options: { range: [0, 100] }, filter: { range: [0, 100] }, editing: true },
    { id: '3', name: 'Lorem ipsum', group: 'Socioeconomics', type: 'green', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] }, visible: true },
    { id: '4', name: 'Sit amet', group: 'Socioeconomics', type: 'yellow', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } },
    { id: '5', name: 'Yet Another Indicator', group: 'Financing & Payments', type: 'yellow', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } },
    { id: '6', name: 'Yet Another Indicator', group: 'Resouce Potential', type: 'yellow', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } }
  ],
  countries: [
    { name: 'Tanzania', flagPath: '/assets/graphics/content/flags/4x3/tz.svg', mapPath: 'http://placehold.it/768x384', area: '947,303 km2', population: '51,820,000' },
    { name: 'Zambia', flagPath: '/assets/graphics/content/flags/4x3/zm.svg', mapPath: 'http://placehold.it/768x384', area: '947,303 km2', population: '51,820,000' },
    { name: 'Lorem', flagPath: 'http://placehold.it/640x480', mapPath: 'http://placehold.it/768x384', area: '947,303 km2', population: '51,820,000' },
    { name: 'Ipsum', flagPath: 'http://placehold.it/640x480', mapPath: 'http://placehold.it/768x384', area: '947,303 km2', population: '51,820,000' }
  ],
  scenarios: [
    { title: 'Scenario 1', thumbnail: 'http://placehold.it/768x384' },
    { title: 'Scenario 2', thumbnail: 'http://placehold.it/768x384' },
    { title: 'Scenario 3', thumbnail: 'http://placehold.it/768x384' },
    { title: 'Scenario 4', thumbnail: 'http://placehold.it/768x384' }
  ]
}
