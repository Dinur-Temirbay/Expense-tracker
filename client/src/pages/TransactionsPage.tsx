import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useTransactions } from '@hooks/useTransactions'
import { TransactionList } from '@sections/TransactionList/TransactionList'

export function TransactionsPage() {
	const { user, logout } = useAuth()
	const { transactions, loading, error, deleteTransaction } = useTransactions()
	const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>(
		'all',
	)
	const [categoryFilter, setCategoryFilter] = useState('all')
	const [startDate, setStartDate] = useState('')
	const [endDate, setEndDate] = useState('')

	const categories = useMemo(() => {
		const predefined = [
			'Food',
			'Transport',
			'Entertainment',
			'Shopping',
			'Health',
		]
		const uniqueCategories = Array.from(
			new Set(transactions.map(transaction => transaction.category.trim())),
		).filter(Boolean)

		const standard = uniqueCategories.filter(category =>
			predefined.includes(category),
		)
		const custom = uniqueCategories.filter(
			category => !predefined.includes(category),
		)

		return [
			...standard.sort((a, b) => a.localeCompare(b)),
			...(custom.length ? ['Other'] : []),
		]
	}, [transactions])

	const filteredTransactions = useMemo(() => {
		return transactions.filter(transaction => {
			const matchesType =
				typeFilter === 'all' || transaction.type === typeFilter
			const normalizedCategory = [
				'Food',
				'Transport',
				'Entertainment',
				'Shopping',
				'Health',
			].includes(transaction.category.trim())
				? transaction.category.trim()
				: 'Other'
			const matchesCategory =
				categoryFilter === 'all' || normalizedCategory === categoryFilter

			const transactionDate = transaction.date
			const matchesStartDate = !startDate || transactionDate >= startDate
			const matchesEndDate = !endDate || transactionDate <= endDate

			return (
				matchesType && matchesCategory && matchesStartDate && matchesEndDate
			)
		})
	}, [transactions, typeFilter, categoryFilter, startDate, endDate])

	if (loading) return <p className='text-white text-center mt-20'>Loading...</p>
	if (error) return <p className='text-red-500 text-center mt-20'>{error}</p>

	return (
		<div className='min-h-screen bg-gray-900 text-white'>
			<div className='border-b border-gray-800 px-6 py-4 flex justify-between items-center'>
				<div className='flex items-center gap-4'>
					<Link to='/dashboard' className='text-cyan-500 hover:text-cyan-400'>
						← Back to dashboard
					</Link>
					<h1 className='text-xl font-bold text-cyan-500'>Transactions</h1>
				</div>
				<div className='flex items-center gap-4'>
					<span className='text-gray-400 text-sm'>Hi, {user?.name}</span>
					<button
						onClick={logout}
						className='text-sm text-gray-400 hover:text-white transition-colors'
					>
						Logout
					</button>
				</div>
			</div>

			<div className='max-w-5xl mx-auto px-6 py-10'>
				<div className='bg-gray-800 rounded-xl p-6'>
					<div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6'>
						<div>
							<p className='text-gray-400 text-sm'>Total transactions</p>
							<p className='text-white text-2xl font-bold'>
								{filteredTransactions.length}
							</p>
						</div>

						<div className='flex flex-col gap-3 md:flex-row md:flex-wrap'>
							<label className='flex flex-col text-sm text-gray-300'>
								<span className='mb-1'>Type</span>
								<select
									value={typeFilter}
									onChange={e =>
										setTypeFilter(
											e.target.value as 'all' | 'income' | 'expense',
										)
									}
									className='rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white'
								>
									<option value='all'>All</option>
									<option value='income'>Income</option>
									<option value='expense'>Expense</option>
								</select>
							</label>

							<label className='flex flex-col text-sm text-gray-300'>
								<span className='mb-1'>Category</span>
								<select
									value={categoryFilter}
									onChange={e => setCategoryFilter(e.target.value)}
									className='rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white'
								>
									<option value='all'>All</option>
									{categories.map(category => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</select>
							</label>

							<label className='flex flex-col text-sm text-gray-300'>
								<span className='mb-1'>From</span>
								<input
									type='date'
									value={startDate}
									onChange={e => setStartDate(e.target.value)}
									className='rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white'
								/>
							</label>

							<label className='flex flex-col text-sm text-gray-300'>
								<span className='mb-1'>To</span>
								<input
									type='date'
									value={endDate}
									onChange={e => setEndDate(e.target.value)}
									className='rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white'
								/>
							</label>
						</div>
					</div>
					<TransactionList
						transactions={filteredTransactions}
						onDelete={deleteTransaction}
					/>
				</div>
			</div>
		</div>
	)
}
