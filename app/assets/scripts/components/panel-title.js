import React from 'react'
import c from 'classnames'

const PanelTitle = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    visible: React.PropTypes.string,
    updateVisibleLayers: React.PropTypes.func,
    openSelection: React.PropTypes.func
  },

  render: function () {
    const { title, subtitle, visible, openSelection } = this.props

    return (
      <header className='panel__header'>
        <div className='panel__headline'>
          <h1 className='panel__title'>{title}</h1>
          <div className='panel__subtitle'>{subtitle}</div>
        </div>
        <div className='panel__meta-actions'>
          <button onClick={openSelection} className='panel__button-edit' title='Change country and scenario'><span>Edit</span></button>
        </div>
        <div className='panel__tab-nav'>
          <ul className='layers-menu' role='menu'>
            <li><a onClick={this._handleIndicatorToggle} href='#' title='View indicators' className={c('layers-menu-item', {'layers-menu-item--active': visible === 'indicators'})} >Indicators</a></li>
            <li><a onClick={this._handleBaseToggle} href='#' title='View base layers' className={c('layers-menu-item', {'layers-menu-item--active': visible === 'base'})}>Background</a></li>
          </ul>
        </div>
      </header>
    )
  },

  _handleIndicatorToggle: function (e) {
    this.props.updateVisibleLayers(e, 'indicators')
  },

  _handleBaseToggle: function (e) {
    this.props.updateVisibleLayers(e, 'base')
  }
})

export default PanelTitle
