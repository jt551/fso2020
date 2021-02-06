import React from 'react'

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

export default Notification