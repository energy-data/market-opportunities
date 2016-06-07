module.exports = {
  baseLayers: [
    { id: 5, name: 'Satellite', group: 'a', type: 'base', visible: true },
    { id: 6, name: 'OSM', group: 'a', type: 'base' },
    { id: 7, name: 'Grid', group: 'a', type: 'base' }
  ],
  mockLayers: [
    { id: 1, name: 'Population Density', group: 'a', type: 'red', options: { range: [0, 100] }, filter: { range: [0, 100] } },
    { id: 2, name: 'Mobile Penetration', group: 'a', type: 'blue', options: { range: [0, 100] }, filter: { range: [0, 100] } },
    { id: 3, name: 'Another Indicator', group: 'b', type: 'green', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } },
    { id: 4, name: 'Yet Another Indicator', group: 'b', type: 'yellow', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } }
  ]
}
