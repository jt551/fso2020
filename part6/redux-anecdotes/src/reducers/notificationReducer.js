
const notificationReducer = (state = 'def_notification', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notificationReducer
        default:
            return state
    }
}

export const setNotification = notification => {
    return {
        type: 'SET_NOTIFICATION',
        notification,
    }
}

export default  notificationReducer