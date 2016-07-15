import React from 'react'

const Nocando = React.createClass({
  render: function () {
    return (
      <section className='nocando'>
        <div className='inner prose prose--responsive'>
          <h2 className='nocando__title'>We're sorry.</h2>
          <p>This tool is optimized for desktop and tablets in landscape mode. If your device is smaller than 1024x768 pixels, please try exploring the tool on your desktop or tablet in landscape mode.</p>
        </div>
      </section>
    )
  }
})

export default Nocando
