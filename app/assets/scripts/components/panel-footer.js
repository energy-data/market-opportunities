import React from 'react'

const PanelFooter = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <footer className='panel__footer'>
        <button className='button-export'><span></span>Export</button>
      </footer>
    )
  }
})

export default PanelFooter
