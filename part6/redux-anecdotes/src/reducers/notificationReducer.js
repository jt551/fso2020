const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeId){
        console.log('SET_NOTIFICATION IF timeId BLOCK, ',state.timeId)
        clearTimeout(state.timeId)
      } 
      return {
        notification: action.data.notification,
        timeId: action.data.timeId,
      }
    case 'CLEAR':
      return {}
    default:
      return state
  }
}
//ensimmäisenä parametrina on renderöitävä teksti ja toisena notifikaation näyttöaika sekunneissa.
export const setNotification = (notification, time) => {
  const delay = time * 1000

  return async (dispatch) => {
    const timeId = setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        data: '',
      })
    }, delay)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        notification,
        timeId,
      },
    })
  }
}

export default notificationReducer
