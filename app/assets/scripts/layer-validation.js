const Models = require('./models')

export const layerValidator = function (options) {
  const validationResults = []
  validationResults.push(primaryValidator(options))
  switch (options.value.type) {
    case 'categorical':
    case 'categorical-unique':
      validationResults.push(valuesValidator(options.value))
      validationResults.push(propertyValidator(options.value))
      break
    case 'range':
      validationResults.push(rangeValidator(options.value))
      validationResults.push(stopsValidator(options.value))
      validationResults.push(propertyValidator(options.value))
      break
    case 'buffer':
      validationResults.push(rangeValidator(options.value))
      break
  }
  if (options.value.hasOwnProperty('countries')) {
    validationResults.push(countriesValidator(options.value))
  }
  return validationResults.filter(result => result.length)
}

const primaryValidator = Models.create({
  'value.type': Models.validators().of(['range', 'categorical', 'categorical-unique', 'buffer']),
  'geometry.type': Models.validators().of(['fill', 'line', 'circle']),
  // optional parameters
  'value.range': Models.validators(true).array().len(2),
  'value.property': Models.validators(true).string(),
  'value.stops': Models.validators(true).array(),
  'value.format': Models.validators(true).string(),
  'value.countries': Models.validators(true).array()
})

const rangeValidator = Models.create({
  'range': Models.validators().array().len(2)
})

const propertyValidator = Models.create({
  'property': Models.validators().string()
})

const stopsValidator = Models.create({
  'stops': Models.validators().array()
})

const valuesValidator = Models.create({
  'values': Models.validators().array()
})

const countriesValidator = Models.create({
  'countries': Models.validators().array()
})

export function prettyValidatorErrors (validation) {
  return Object.keys(validation.errors).filter(key => {
    return validation.errors[key].length > 0
  })
  .map(key => {
    return validation.errors[key].map(e => e.message).join(', ')
  }).join('\n')
}
