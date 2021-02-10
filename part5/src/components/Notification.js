import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (message === null || '') {
    return null
  }
  if(type === 'error'){
    return (
      <div className="notification_error">
        {message}
      </div>
    )
  }else if( type === 'success'){
    return (
      <div className="notification_success">
        {message}
      </div>
    )
  }else{
    return (
      <div className="notification_info">
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Notification