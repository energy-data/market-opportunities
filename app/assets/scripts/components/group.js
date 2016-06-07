import React from 'react'

const Group = React.createClass({

  propTypes: {
    name: React.PropTypes.string
  },

  render: function () {
    return (
      <li className='group'>{'Group: ' + this.props.name}</li>
    )
  }
})

export default Group
