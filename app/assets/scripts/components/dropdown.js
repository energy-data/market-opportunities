import React from 'react'
import classnames from 'classnames'
import outside from 'react-onclickoutside'

const Dropdown = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    triggerTitle: React.PropTypes.string,
    triggerClassName: React.PropTypes.string,
    triggerText: React.PropTypes.string,
    topDataTitle: React.PropTypes.string,
    innerDivClass: React.PropTypes.string,
    onClick: React.PropTypes.func,
    children: React.PropTypes.node
  },

  mixins: [outside],

  handleClickOutside: function (e) {
    this.setState({ open: false })
  },

  getInitialState: function () {
    return {
      open: false
    }
  },

  _toggleDropdown: function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (this.props.onClick) { this.props.onClick() }
    this.setState({ open: !this.state.open })
  },

  render: function () {
    const { open } = this.state
    const { className, triggerClassName, triggerTitle, triggerText, innerDivClass,
      topDataTitle } = this.props

    return (
      <div
        className={classnames('drop', {'drop--open': open}, className)}
        data-hook='dropdown'
        data-title={open ? '' : topDataTitle}
        >
        <a href='#'
          title={triggerTitle}
          className={classnames(triggerClassName, 'drop__toggle')}
          onClick={this._toggleDropdown} >
          <span>{triggerText}</span>
        </a>
        <div className={innerDivClass} onClick={() => this.setState({ open: false })}>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default Dropdown
