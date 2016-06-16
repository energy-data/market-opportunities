import React from 'react'
import c from 'classnames'

const Country = React.createClass({

  propTypes: {
    info: React.PropTypes.object,
    selected: React.PropTypes.bool,
    updateSelectedCountry: React.PropTypes.func
  },

  render: function () {
    const { info, selected } = this.props
    return (
      <li className='options-list__item' onClick={this._updateSelectedCountry}>
        <article className={c('card', 'card--country', {'card--active': selected})}>
          <a href='#' className='card__contents' title='Select option'>
            <figure className='card__media'>
              <div className='card__thumbnail'>
                <img alt='Card thumb' width='768' height='384' src={info.mapPath} />
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

  _updateSelectedCountry: function () {
    this.props.updateSelectedCountry(this.props.info.name)
  }
})

export default Country
