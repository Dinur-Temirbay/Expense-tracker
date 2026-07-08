import axios from 'axios'

const API = axios.create({
	baseURL: 'http://localhost:5000/api',
})

export const register = (name: string, email: string, password: string) => {
	return API.post('/auth/register', { name, email, password })
}

export const login = (email: string, password: string) => {
	return API.post('/auth/login', { email, password })
}
