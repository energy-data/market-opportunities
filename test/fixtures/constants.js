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
    {
      'id': '015887e7-84b7-4c1c-a1c9-1b2505d4b',
      'name': 'Demo Transmission network',
      'description': '',
      'license_id': 'cc-by',
      'license_title': 'Creative Commons Attribution',
      'license_url': 'http://www.opendefinition.org/licenses/cc-by',
      'source': 'source attribution!',
      'url': 'http://ec2-23-20-208-183.compute-1.amazonaws.com/dataset/90c8744d-a565-4eea-a109-8b4b521b671b/resource/015887e7-84b7-4c1c-a1c9-1b2516105d4b/download/demo-transmission.geosjon',
      'tilejson': 'https://test-offgrid-mvt.s3.amazonaws.com/tiles/015887e7-84b7-4c1c-a1c9-1b2516105d4b-34fb30f8-38e0-11e6-952a-0242ac110005/data.tilejson',
      'datasetName': 'transmission-network',
      'options': {
        'value': {
          'property': 'test',
          'type': 'range',
          'values': [
            'a',
            'b',
            'c'
          ],
          'format': 'percentage',
          'range': [0, 1],
          'stops': [0, 0.2, 0.4, 0.6, 0.8, 1]
        },
        'geometry': {
          'type': 'fill'
        }
      },
      'filter': {
        'property': 'test',
        'type': 'range',
        'values': [
          'a',
          'b',
          'c'
        ],
        'range': [0, 1],
        'stops': [0, 0.2, 0.4, 0.6, 0.8, 1]
      },
      'type': 'base',
      'group': 'Resource Potential'
    },
    {
      'id': '015887e7-84b7-4c1c-a1c9-1b2516105d4b',
      'name': 'Demo Transmission network',
      'description': '',
      'license_id': 'cc-by',
      'license_title': 'Creative Commons Attribution',
      'license_url': 'http://www.opendefinition.org/licenses/cc-by',
      'source': 'source attribution!',
      'url': 'http://ec2-23-20-208-183.compute-1.amazonaws.com/dataset/90c8744d-a565-4eea-a109-8b4b521b671b/resource/015887e7-84b7-4c1c-a1c9-1b2516105d4b/download/demo-transmission.geosjon',
      'tilejson': 'https://test-offgrid-mvt.s3.amazonaws.com/tiles/015887e7-84b7-4c1c-a1c9-1b2516105d4b-34fb30f8-38e0-11e6-952a-0242ac110005/data.tilejson',
      'datasetName': 'transmission-network',
      'options': {
        'value': {
          'property': 'test',
          'type': 'categorical',
          'values': [
            'a',
            'b',
            'c'
          ]
        },
        'geometry': {
          'type': 'fill'
        }
      },
      'filter': {
        'property': 'test',
        'type': 'categorical',
        'values': [
          'a',
          'b',
          'c'
        ]
      },
      'editing': true,
      'type': 'indicator',
      'group': 'Resource Potential'
    },
    {
      'id': '0158a1c9-1b2516105d4b',
      'name': 'Demo Transmission network',
      'description': '',
      'license_id': 'cc-by',
      'license_title': 'Creative Commons Attribution',
      'license_url': 'http://www.opendefinition.org/licenses/cc-by',
      'source': 'source attribution!',
      'url': 'http://ec2-23-20-208-183.compute-1.amazonaws.com/dataset/90c8744d-a565-4eea-a109-8b4b521b671b/resource/015887e7-84b7-4c1c-a1c9-1b2516105d4b/download/demo-transmission.geosjon',
      'tilejson': 'https://test-offgrid-mvt.s3.amazonaws.com/tiles/015887e7-84b7-4c1c-a1c9-1b2516105d4b-34fb30f8-38e0-11e6-952a-0242ac110005/data.tilejson',
      'datasetName': 'transmission-network',
      'options': {
        'value': {
          'property': 'test',
          'type': 'categorical',
          'values': [
            'a',
            'b',
            'c'
          ]
        },
        'geometry': {
          'type': 'line'
        }
      },
      'filter': {
        'property': 'test',
        'type': 'categorical',
        'values': [
          'a',
          'b',
          'c'
        ]
      },
      'geojson': true,
      'type': 'indicator',
      'group': 'Resource Potential'
    },
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
