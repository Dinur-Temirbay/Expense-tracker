import { useState, useEffect } from 'react'
import type { Transaction, TransactionForm } from '@types/index'
import * as transactionsApi from '@api/transactions'

export function useTransactions() {
	const [transactions, setTransactions] = useState<Transaction[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		const load = async () => {
			setTransactions([])
			setLoading(true)
			setError('')

			try {
				const response = await transactionsApi.getTransactions()
				setTransactions(response.data)
			} catch (err: any) {
				setError(err.response?.data?.message || 'Failed to load transactions')
			} finally {
				setLoading(false)
			}
		}

		load()
	}, [])

	const addTransaction = async (form: TransactionForm) => {
		try {
			const response = await transactionsApi.addTransaction(form)
			setTransactions(prev => [response.data, ...prev])
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to add transaction')
		}
	}

	const deleteTransaction = async (id: string) => {
		try {
			await transactionsApi.deleteTransaction(id)
			setTransactions(prev => prev.filter(t => t._id !== id))
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to delete transaction')
		}
	}

	return { transactions, loading, error, addTransaction, deleteTransaction }
}
