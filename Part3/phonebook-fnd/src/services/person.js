import axios from 'axios'

const baseUrl = ('/api/persons/')

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


export default {getData, createData, updateData, deleteData}