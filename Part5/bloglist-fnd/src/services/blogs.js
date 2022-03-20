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

const create = async newObject => {
  const cfg = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl, newObject, cfg)
  return res.data
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res.data)
}

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}


export default { getAll, create, setToken, update, del }