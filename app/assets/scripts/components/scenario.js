import React from 'react'
import c from 'classnames'

const Scenario = React.createClass({

  propTypes: {
    info: React.PropTypes.object,
    selected: React.PropTypes.bool,
    updateSelectedScenario: React.PropTypes.func
  },

  render: function () {
    const { info, selected } = this.props
    return (
      <li className='options-list__item'>
        <article className={c('card', 'scenario--country', {'card--active': selected})}>
          <a href='#' className='card__contents' title='Select option' onClick={this._updateSelectedScenario}>
            <figure className='card__media'>
              <div className='card__thumbnail'>
                <img alt='Card thumb' width='768' height='384' src={info.thumbnail} />
              </div>
            </figure>
            <header className='card__header'>
              <h1 className='card__title'>{info.title}</h1>
            </header>
            <div className='card__body'>
              <dl className='card--scenario__details'>
                <dt>Key 1</dt>
                <dd>Value 1</dd>
                <dt>Key 2</dt>
                <dd>Value 2</dd>
                <dt>Key 3</dt>
                <dd>Value 3</dd>
                <dt>Key x</dt>
                <dd>Value x</dd>
              </dl>
            </div>
          </a>
        </article>
      </li>
    )
  },

  _updateSelectedScenario: function (e) {
    this.props.updateSelectedScenario(e, this.props.info.title)
  }
})

export default Scenario
