import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newContact => {
    return axios.post(baseUrl, newContact)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newContact) => {
    return axios.put(`${baseUrl}/${id}`, newContact)
}

export default {
    getAll,
    create,
    remove,
    update,
}