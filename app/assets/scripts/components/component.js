import React from 'react'
import c from 'classnames'

const Component = React.createClass({

  render: function () {
    return (
      <div className={c('component', this.props.className)}>
        {this.props.foo}
      </div>
    )
  },

  propTypes: {
    foo: React.PropTypes.string,
    className: React.PropTypes.string
  }
})

export default Component
