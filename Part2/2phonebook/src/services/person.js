import axios from 'axios'

const baseUrl = ('http://localhost:3001/persons/')

const getData = () => {
    return axios.get(baseUrl);
}

const createData = nObj => {
    return axios.post(baseUrl, nObj)
}

const updateData = (item) => {
    return axios.put(`${baseUrl}${item.id}`, item)
}

const deleteData = (item) => {
    return axios.delete(`${baseUrl}${item}`)
}

//axios.put(`http://localhost:3001/persons/${obj.id}`, obj)

export default {getData, createData, updateData, deleteData}