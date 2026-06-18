import axios from 'axios'
import type { TransactionForm } from '../types/index'

const API = axios.create({
	baseURL: 'http://localhost:5000/api',
})

API.interceptors.request.use(config => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export const getTransactions = () => {
	return API.get('/transactions')
}

export const addTransaction = (data: TransactionForm) => {
	return API.post('/transactions', data)
}

export const deleteTransaction = (id: string) => {
	return API.delete(`/transactions/${id}`)
}
