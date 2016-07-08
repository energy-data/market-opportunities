import React from 'react'

const Footer = React.createClass({

  propTypes: {},

  render: function () {
    return (
      <footer className='page__footer' role='contentinfo'>
        <div className='inner'>
          <p>Made with love by <a href='https://developmentseed.org' title='Visit Development Seed website'>Development Seed</a></p>
        </div>
      </footer>
    )
  }
})

export default Footer
