import { Response } from 'express'
import { Transaction } from '../models/Transaction'
import { AuthRequest } from '../middleware/auth'

const VALID_TYPES = ['income', 'expense']

export const getTransactions = async (req: AuthRequest, res: Response) => {
	try {
		const transactions = await Transaction.find({ userId: req.userId }).sort({
			createdAt: -1,
		})
		res.json(transactions)
	} catch (err) {
		console.error('getTransactions error:', err)
		res.status(500).json({ message: 'Server error' })
	}
}

export const addTransaction = async (req: AuthRequest, res: Response) => {
	try {
		const { title, amount, category, type, date } = req.body

		if (!title || !amount || !category || !type || !date) {
			res.status(400).json({ message: 'All fields are required' })
			return
		}

		if (typeof amount !== 'number' || amount <= 0) {
			res.status(400).json({ message: 'Amount must be a positive number' })
			return
		}

		if (!title || !amount || !category || !type || !date) {
			res.status(400).json({ message: 'All fields are required' })
			return
		}

		if (!VALID_TYPES.includes(type)) {
			res.status(400).json({ message: 'Type must be income or expense' })
			return
		}

		const transaction = new Transaction({
			title,
			amount,
			category,
			type,
			date,
			userId: req.userId,
		})
		await transaction.save()

		res.status(201).json(transaction)
	} catch (err) {
		console.error('addTransaction error:', err)
		res.status(500).json({ message: 'Server error' })
	}
}

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
	try {
		if (!req.params.id) {
			res.status(400).json({ message: 'Transaction id is required' })
			return
		}

		const transaction = await Transaction.findOneAndDelete({
			_id: req.params.id,
			userId: req.userId,
		})

		if (!transaction) {
			res.status(404).json({ message: 'Transaction not found' })
			return
		}

		res.json({ message: 'Deleted' })
	} catch (err) {
		console.error('deleteTransaction error:', err)
		res.status(500).json({ message: 'Server error' })
	}
}
