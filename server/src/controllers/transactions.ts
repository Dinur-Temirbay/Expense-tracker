import { Request, Response } from 'express'
import { Transaction } from '@models/Transaction'

export const getTransactions = async (req: Request, res: Response) => {
	const transactions = await Transaction.find().sort({ createdAt: -1 })
	res.json(transactions)
}
