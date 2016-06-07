import React from 'react'

const PanelFooter = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <footer className='panel__footer'>
        <button className='button button--achromic-unbounded'><span className='collecticon-download'></span>Export</button>
      </footer>
    )
  }
})

export default PanelFooter
