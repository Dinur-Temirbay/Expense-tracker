export type Category =
	| 'Food'
	| 'Transport'
	| 'Entertainment'
	| 'Shopping'
	| 'Health'
	| 'Other'

export interface Transaction {
	id: string
	title: string
	amount: number
	category: Category
	date: string
	type: 'income' | 'expense'
}

export interface Filter {
	category: Category | 'All'
	dateFrom: string
	dateTo: string
}
