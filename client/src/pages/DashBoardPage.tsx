import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useTransactions } from '@hooks/useTransactions'
import { AddTransaction } from '@sections/AddTransaction/AddTransaction'
import { TransactionList } from '@sections/TransactionList/TransactionList'
import { Dashboard } from '@sections/Dashboard/Dashboard'

export function DashboardPage() {
	const { user, logout } = useAuth()
	const { transactions, loading, error, addTransaction, deleteTransaction } =
		useTransactions()

	if (loading) return <p className='text-white text-center mt-20'>Loading...</p>
	if (error) return <p className='text-red-500 text-center mt-20'>{error}</p>

	return (
		<div className='min-h-screen bg-gray-900 text-white'>
			<div className='border-b border-gray-800 px-6 py-4 flex justify-between items-center'>
				<h1 className='text-xl font-bold text-cyan-500'>Spendly</h1>
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

			<div className='max-w-6xl mx-auto px-6 py-10'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div className='md:col-span-1'>
						<AddTransaction onAdd={addTransaction} />
					</div>
					<div className='md:col-span-2 flex flex-col gap-8'>
						<Dashboard transactions={transactions} />
						<div className='flex justify-end'>
							<Link
								to='/transactions'
								className='text-cyan-500 hover:text-cyan-400 text-sm font-medium'
							>
								View all transactions →
							</Link>
						</div>
						<TransactionList
							transactions={transactions.slice(0, 3)}
							onDelete={deleteTransaction}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
