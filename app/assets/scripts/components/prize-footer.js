import React from 'react'

import Dropdown from './dropdown'
import { downloadGeoJSON, downloadMapImage, downloadMapPDF } from '../utils'

const PrizeFooter = React.createClass({

  propTypes: {
    geojson: React.PropTypes.object,
    getMapReference: React.PropTypes.func,
    population: React.PropTypes.number,
    revenuePerHousehold: React.PropTypes.number,
    marketCapture: React.PropTypes.number,
    country: React.PropTypes.string,
    layers: React.PropTypes.object
  },

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
            <li><a onClick={this._exportAsImage} href='#' title='Export as image' className='drop__menu-item export-menu__item-image'>Image</a></li>
            <li><a onClick={this._exportAsPDF} href='#' title='Export as PDF' className='drop__menu-item export-menu__item-pdf'>PDF</a></li>
            <li><a onClick={this._exportAsGeoJSON} href='#' title='Export as GeoJSON' className='drop__menu-item export-menu__item-geojson'>GeoJSON</a></li>
          </ul>
        </Dropdown>

      </footer>
    )
  },

  _exportAsGeoJSON: function (e) {
    e.preventDefault()
    downloadGeoJSON(this.props.geojson)
  },

  _exportAsImage: function (e) {
    e.preventDefault()
    downloadMapImage(this.props.getMapReference())
  },

  _exportAsPDF: function (e) {
    e.preventDefault()
    downloadMapPDF(this.props)
  }
})

export default PrizeFooter
