import React from 'react'
import c from 'classnames'

import { countryBounds } from '../../data/bounds'
import { mapStyle } from '../constants'

const Country = React.createClass({

  propTypes: {
    info: React.PropTypes.object,
    selected: React.PropTypes.bool,
    updateSelectedCountry: React.PropTypes.func
  },

  render: function () {
    const { info, selected } = this.props
    const token = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q'
    const countryBbox = countryBounds.find(c => c.properties.name === info.name).bbox
    const center = [(countryBbox[0] + countryBbox[2]) / 2, (countryBbox[1] + countryBbox[3]) / 2]
    const mapSrc = 'https://api.mapbox.com/styles/v1/' +
    `${mapStyle.replace('mapbox://styles/', '')}` +
    '/static/' +
    `${center[0]},${center[1]},4,0,0/768x384?access_token=${token}&logo=false&attribution=false`
    return (
      <li className='options-list__item'>
        <article className={c('card', 'card--country', {'card--active': selected})}>
          <a href='#' className='card__contents' title='Select option' onClick={this._updateSelectedCountry}>
            <figure className='card__media'>
              <div className='card__thumbnail'>
                <img alt='Card thumb' width='768' height='384' src={mapSrc} />
              </div>
              <div className='card--country__flag'>
                <img alt='Card flag' width='640' height='480' src={info.flagPath} />
              </div>
            </figure>
            <header className='card__header'>
              <h1 className='card__title'>{info.name}</h1>
            </header>
            <div className='card__body'>
              <dl className='card--country__details'>
                <dt>Area</dt>
                <dd>{info.area}</dd>
                <dt>Population</dt>
                <dd>{info.population}</dd>
              </dl>
            </div>
          </a>
        </article>
      </li>
    )
  },

  _updateSelectedCountry: function (e) {
    this.props.updateSelectedCountry(e, this.props.info.name)
  }
})

export default Country
