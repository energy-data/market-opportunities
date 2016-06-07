var classes = {
  'nodot': {},
  'base layer': '.base-layer',
  'base layer toggle': '.on-off',
  'group': '.group',
  'header': '.page__header',
  'indicator': '.indicator',
  'indicator toggle': '.indicator-main .on-off',
  'indicator edit': '.indicator-main .edit',
  'indicator cancel': '.indicator-editing .cancel',
  'indicator save': '.indicator-editing .accept',
  'map': '.map',
  'layer list wrapper': '.panel__body-inner',
  'panel footer': '.panel__footer',
  'panel': '.panel',
  'panel layer list': '.panel__body',
  'panel header': '.panel__header',
  'panel toggle': '.layers-menu a',
  'panel title': '.panel__title',
  'panel subtitle': '.panel__subtitle'
}

Object.keys(classes).forEach(function (key) {
  if (key !== 'nodot') {
    classes.nodot[key] = classes[key].slice(1)
  }
})

module.exports = classes
