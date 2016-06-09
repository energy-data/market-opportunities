export const baseLayers = [
  { id: 5, name: 'Satellite', group: 'a', type: 'base', visible: true },
  { id: 6, name: 'OSM', group: 'a', type: 'base' },
  { id: 7, name: 'Grid', group: 'a', type: 'base' }
]

// TODO: at some point we should copy options object over to filter object
export const mockLayers = [
  { id: 1, name: 'Population Density', group: 'Socioeconomics', type: 'red', options: { range: [0, 100] }, filter: { range: [0, 100] } },
  { id: 2, name: 'Mobile Penetration', group: 'Socioeconomics', type: 'blue', options: { range: [0, 100] }, filter: { range: [0, 100] } },
  { id: 3, name: 'Lorem ipsum', group: 'Socioeconomics', type: 'green', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } },
  { id: 4, name: 'Sit amet', group: 'Socioeconomics', type: 'yellow', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } },
  { id: 5, name: 'Yet Another Indicator', group: 'Financing & Payments', type: 'yellow', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } },
  { id: 6, name: 'Yet Another Indicator', group: 'Resouce Potential', type: 'yellow', options: { values: ['a', 'b', 'c'] }, filter: { values: ['a', 'b', 'c'] } }
]
