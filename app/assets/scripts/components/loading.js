import React from 'react'
import { connect } from 'react-redux'

export const Loading = React.createClass({

  propTypes: {
    loading: React.PropTypes.bool
  },

  render: function () {
    const { loading } = this.props
    return (loading)
    ? <div className='loading-full-block'>
        <div className='loading-indicator'><p>Loading...</p></div>
      </div>
    : <div className='empty-component'></div>
  }
})

function mapStateToProps (state) {
  return {
    loading: state.layers.status === 'loading'
  }
}

export default connect(mapStateToProps)(Loading)
