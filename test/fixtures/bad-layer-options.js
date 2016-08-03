module.exports.badLayerOptions = [
  {
    'value': {
      'property': 'test',
      'type': 'not a value type',
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
  {
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
      'type': 'not a geometry type'
    }
  }
]
