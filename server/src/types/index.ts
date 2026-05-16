export interface ITransaction {
	title: string
	amount: number
	category: string
	type: 'income' | 'expense'
	date: string
}
