import React from 'react'
import { connect } from 'react-redux'

export const Loading = React.createClass({

  propTypes: {
    loading: React.PropTypes.bool
  },

  render: function () {
    const { loading } = this.props
    return (loading)
    ? <div className='loading-indicator'><p>Loading...</p></div>
    : <div className='empty-component'></div>
  }
})

function mapStateToProps (state) {
  return {
    // TODO: should this be an enum?
    loading: state.layers.status === 'loading'
  }
}

export default connect(mapStateToProps)(Loading)
