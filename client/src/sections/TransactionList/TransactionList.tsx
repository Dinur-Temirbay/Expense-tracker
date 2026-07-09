import type { Transaction } from '../../types'
import { Button } from '@components/ui/Button'

interface Props {
	transactions: Transaction[]
	onDelete: (id: string) => void
}

const categoryColors: Record<string, string> = {
	Food: 'bg-orange-500/10 text-orange-400',
	Transport: 'bg-blue-500/10 text-blue-400',
	Entertainment: 'bg-purple-500/10 text-purple-400',
	Shopping: 'bg-pink-500/10 text-pink-400',
	Health: 'bg-green-500/10 text-green-400',
}

const CUSTOM_CATEGORY_STYLE = 'bg-cyan-500/10 text-cyan-400'

function getCategoryStyle(category: string) {
	return categoryColors[category] || CUSTOM_CATEGORY_STYLE
}

export function TransactionList({ transactions, onDelete }: Props) {
	if (!transactions.length) {
		return (
			<div className='bg-gray-800 rounded-xl p-6 text-center text-gray-500'>
				No transactions yet
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-3'>
			<h2 className='text-white text-xl font-bold'>Last transactions</h2>

			{transactions.map(t => (
				<div
					key={t._id}
					className='bg-gray-800 rounded-xl p-4 flex justify-between items-center'
				>
					<div className='flex flex-col gap-1'>
						<p className='text-white font-semibold'>{t.title}</p>
						<div className='flex items-center gap-2'>
							<span
								className={`text-xs px-2 py-0.5 rounded-full ${getCategoryStyle(t.category)}`}
							>
								{t.category}
							</span>
							<span className='text-gray-500 text-xs'>{t.date}</span>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<span
							className={`font-bold text-lg ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}
						>
							{t.type === 'income' ? '+' : '-'}${t.amount}
						</span>
						<Button variant='ghost' size='sm' onClick={() => onDelete(t._id)}>
							✕
						</Button>
					</div>
				</div>
			))}
		</div>
	)
}
