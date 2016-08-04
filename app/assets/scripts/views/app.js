import React from 'react'

const App = React.createClass({

  propTypes: {
    children: React.PropTypes.object
  },

  render: function () {
    return this.props.children
  }
})

export default App
