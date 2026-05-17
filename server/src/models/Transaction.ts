import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		amount: { type: Number, required: true },
		category: { type: String, required: true },
		type: { type: String, enum: ['income', 'expense'], required: true },
		date: { type: String, required: true },
	},
	{ timestamps: true },
)

export const Transaction = mongoose.model('Transaction', TransactionSchema)
