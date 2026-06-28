export type Category = string

export interface Transaction {
	_id: string
	title: string
	amount: number
	category: Category
	type: 'income' | 'expense'
	date: string
}

export interface TransactionForm {
	title: string
	amount: number
	category: Category
	type: 'income' | 'expense'
	date: string
}

export interface User {
	id: string
	email: string
	name: string
}
