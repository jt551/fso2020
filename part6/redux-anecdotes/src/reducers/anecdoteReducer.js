// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]

//const getId = () => (100000 * Math.random()).toFixed(0)

const sortByKey = (key) => (a, b) => (a[key] < b[key] ? 1 : -1)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

//const initialState = anecdotesAtStart.map(asObject).sort(sortByKey('votes'))

const anecdoteReducer = (state = [], action) => {
  console.log('anecdoteReducer state : ', state)
  console.log('anecdoteReducer action : ', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const votedAnecdote = state.find((a) => a.id === id)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      }
      return state
        .map((a) => (a.id !== id ? a : updatedAnecdote))
        .sort(sortByKey('votes'))

    case 'NEW':
      //const newAnecdoteObj = asObject(action.data.content)
      return state.concat(action.data).sort(sortByKey('votes'))
     
    case 'INIT_ANECDOTES':
      return action.data.sort(sortByKey('votes'))

    default:
      return state.sort(sortByKey('votes'))
  }
}

export const create = (data) => {
  return {
    type: 'NEW',
    data,
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default anecdoteReducer
