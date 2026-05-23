// import { AddTransaction } from '@sections/AddTransaction/AddTransaction.tsx'
// import { TransactionList } from '@sections/TransactionList/TransactionList.tsx'
// import { Dashboard } from '@sections/Dashboard/Dashboard'

export function DashboardPage() {
	return (
		<div className='min-h-screen bg-gray-900 text-white'>
			<div className='border-b border-gray-800 px-6 py-4 flex justify-between items-center'>
				<h1 className='text-xl font-bold text-cyan-500'>Expense Tracker</h1>
				<div className='flex items-center gap-4'>
					{/* <span className='text-gray-400 text-sm'>Hi, {user?.name}</span> */}
					<button
						// onClick={logout}
						className='text-sm text-gray-400 hover:text-white transition-colors'
					>
						Logout
					</button>
				</div>
			</div>

			<div className='max-w-6xl mx-auto px-6 py-10'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div className='md:col-span-1'>
						{/* <AddTransaction onAdd={addTransaction} /> */}
					</div>

					<div className='md:col-span-2 flex flex-col gap-8'>
						{/* <Dashboard transactions={transactions} /> */}
						{/* <TransactionList
							transactions={transactions}
							onDelete={deleteTransaction}
						/> */}
					</div>
				</div>
			</div>
		</div>
	)
}
