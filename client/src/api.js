import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:5000/'
})

export const createSession = async (email, password) => {
    const formdata = new FormData()
    formdata.append("email", email)
    formdata.append("password", password)

    return api.post("/loginUser", formdata)
}