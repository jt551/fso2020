import anecdoteService from '../services/anecdotes'

const sortByKey = (key) => (a, b) => (a[key] < b[key] ? 1 : -1)

const anecdoteReducer = (state = [], action) => {
  console.log('anecdoteReducer state : ', state)
  console.log('anecdoteReducer action : ', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      
      return state
        .map((a) => (a.id !== id ? a : action.data))
        .sort(sortByKey('votes'))

    case 'NEW':
      return state.concat(action.data).sort(sortByKey('votes'))

    case 'INIT_ANECDOTES':
      return action.data.sort(sortByKey('votes'))

    default:
      return state.sort(sortByKey('votes'))
  }
}

export const create = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(data)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    const updatedObject = await anecdoteService.addVote(id)

    dispatch({
      type: 'VOTE',
      data: updatedObject,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
