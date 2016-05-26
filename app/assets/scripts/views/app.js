import React from 'react'

import Component from '../components/component'

const App = React.createClass({

  render: function () {
    return (
      <div className='full-app'>
        The App is Functioning
        <Component foo='bar' className='test' />
      </div>
    )
  },

  propTypes: {}
})

export default App
