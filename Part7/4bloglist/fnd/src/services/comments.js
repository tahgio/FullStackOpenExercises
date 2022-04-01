import axios from "axios"
const baseUrl = '/api/blogs'

const getComments = (id) => {
  let req = axios.get(`${baseUrl}/${id}/comments`)
  return req.then(res => res.data)
}

const createComment = async (id, obj) => {
  let res = await axios.post(`${baseUrl}/${id}/comments`, obj)
  return res.data
} 

export default { getComments, createComment }