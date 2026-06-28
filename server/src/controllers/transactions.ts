import { Request, Response } from 'express'
import { Transaction } from '../models/Transaction'
import { AuthRequest } from '../middleware/auth'

export const getTransactions = async (req: AuthRequest, res: Response) => {
	const transactions = await Transaction.find({ userId: req.userId }).sort({
		createdAt: -1,
	})
	res.json(transactions)
}

export const addTransaction = async (req: AuthRequest, res: Response) => {
	const transaction = new Transaction({ ...req.body, userId: req.userId })
	await transaction.save()
	res.status(201).json(transaction)
}

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
	await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.userId })
	res.json({ message: 'Deleted' })
}
