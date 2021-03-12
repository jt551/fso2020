const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR':
      return ""
    default:
      return state
  }
}
//ensimmäisenä parametrina on renderöitävä teksti ja toisena notifikaation näyttöaika sekunneissa.
export const setNotification = (notification, time) => {
  const delay = time*1000  
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        data: "",
      })
    }, delay)
  }
}

export default notificationReducer
