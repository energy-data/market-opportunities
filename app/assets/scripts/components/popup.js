import React from 'react'
import { numberWithCommas } from '../utils'

export const Popup = React.createClass({

  propTypes: {
    values: React.PropTypes.array,
    mapProperty: React.PropTypes.string
  },

  render: function () {
    const { values, mapProperty } = this.props
    return <p><strong>{mapProperty}: </strong>{values.map(numberWithCommas).join(', ')}</p>
  }
})

export default Popup
