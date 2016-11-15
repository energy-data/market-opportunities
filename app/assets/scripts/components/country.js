import React from 'react'
import c from 'classnames'

import { mapStyle } from '../constants'

const Country = React.createClass({

  propTypes: {
    id: React.PropTypes.string,
    info: React.PropTypes.object,
    selected: React.PropTypes.bool,
    updateSelectedCountry: React.PropTypes.func
  },

  render: function () {
    const { info, selected } = this.props
    const token = 'pk.eyJ1IjoiZW5lcmd5ZGF0YSIsImEiOiJjaXU3Nmp3d2owajVuMnBsaGQ4NzF5dnlzIn0.ZdwXwwGt-7qdbHc2eM-HNQ'
    const center = [(info.bbox[0] + info.bbox[2]) / 2, (info.bbox[1] + info.bbox[3]) / 2]
    const mapSrc = 'https://api.mapbox.com/styles/v1/' +
    `${mapStyle.replace('mapbox://styles/', '')}` +
    '/static/' +
    `${center[0]},${center[1]},4,0,0/768x256?access_token=${token}&logo=false&attribution=false`
    return (
      <li className='options-list__item'>
        <article className={c('card', 'card--country', {'card--active': selected})}>
          <a href='#' className='card__contents' title='Select country' onClick={(e) => this.props.updateSelectedCountry(e, this.props.id)}>
            <figure className='card__media'>
              <div className='card__thumbnail'>
                <img alt='Card thumb' width='768' height='256' src={mapSrc} />
              </div>
              <div className='card--country__flag'>
                <img alt='Card flag' width='640' height='480' src={`assets/graphics/content/flags/4x3/${info.iso_a2.toLowerCase()}.svg`} />
              </div>
            </figure>
            <header className='card__header'>
              <h1 className='card__title'>{info.name}</h1>
            </header>
          </a>
        </article>
      </li>
    )
  }
})

export default Country
