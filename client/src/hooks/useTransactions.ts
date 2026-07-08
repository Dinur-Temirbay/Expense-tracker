import { useState, useEffect } from 'react'
import type { Transaction, TransactionForm } from '../types'
import * as transactionsApi from '@api/transactions'
import { useAuth } from '@hooks/useAuth'

export function useTransactions() {
	const { user } = useAuth()
	const [transactions, setTransactions] = useState<Transaction[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		if (!user) {
			setTransactions([])
			setError('')
			setLoading(false)
			return
		}

		let isCancelled = false

		const loadTransactions = async () => {
			setLoading(true)
			setError('')

			try {
				const response = await transactionsApi.getTransactions()
				if (!isCancelled) setTransactions(response.data)
			} catch (err: any) {
				if (!isCancelled) {
					setError(err.response?.data?.message || 'Failed to load transactions')
				}
			} finally {
				if (!isCancelled) {
					setLoading(false)
				}
			}
		}

		loadTransactions()

		return () => {
			isCancelled = true
		}
	}, [user])

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

	return {
		transactions,
		loading,
		error,
		addTransaction,
		deleteTransaction,
	}
}
