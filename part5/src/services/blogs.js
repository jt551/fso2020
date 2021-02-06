import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlogObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlogObject,config)
  return response.data
}

const update = async (id, BlogObject ) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${ baseUrl } /${id}`, BlogObject, config)
  return response.data
}

export default { getAll,setToken, create, update }