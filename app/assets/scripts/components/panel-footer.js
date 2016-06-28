import React from 'react'
import Dropdown from './dropdown'

const PanelFooter = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <footer className='panel__footer'>
        <Dropdown
          className='drop__content'
          triggerElement='button'
          triggerClassName='button-export'
          triggerTitle='Export options'
          triggerText='Export'
          direction='up'
          aligment='center' >

          <ul className='drop__menu drop__menu--iconified export-menu' role='menu'>
            <li><a href='#' title='Export as image' className='drop__menu-item export-menu__item-image disabled'>Image</a></li>
            <li><a href='#' title='Export as PDF' className='drop__menu-item export-menu__item-pdf disabled'>PDF</a></li>
            <li><a href='#' title='Export as GeoJSON' className='drop__menu-item export-menu__item-geojson disabled'>GeoJSON</a></li>
          </ul>
        </Dropdown>

      </footer>
    )
  }
})

export default PanelFooter
