var classes = {
  'nodot': {},
  'base layer': '.layer-list__layer-wrapper',
  'base layer toggle': '.form__option--switch input',
  'checkbox': '.form__option--custom-checkbox',
  'checkbox group': '.form__fieldset',
  'group': '.layer-group',
  'group toggle': '.layer-group__toggle',
  'header': '.page__header',
  'indicator': '.layer-list__layer-wrapper',
  'indicator toggle': '.form__option--switch input',
  'indicator edit': '.button-edit-layer',
  'indicator cancel': '.button-cancel-edit',
  'indicator save': '.button-save-edit',
  'map': '.map',
  'layer list wrapper': '.panel__body-inner',
  'panel footer': '.panel__footer',
  'panel': '.panel',
  'panel layer list': '.panel__body',
  'panel header': '.panel__header',
  'panel toggle': '.layers-menu a',
  'panel title': '.panel__title',
  'panel subtitle': '.panel__subtitle',
  'results fold': '.fold'
}

Object.keys(classes).forEach(function (key) {
  if (key !== 'nodot') {
    classes.nodot[key] = classes[key].slice(1)
  }
})

module.exports = classes
