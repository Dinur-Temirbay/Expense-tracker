import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import type { Transaction } from '../../types/index'
import { formatAmount } from '../../utils/format'
import { useMemo } from 'react'

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
)

const PIE_COLORS = [
	'#06b6d4',
	'#f97316',
	'#a855f7',
	'#22c55e',
	'#ef4444',
	'#eab308',
]

interface Props {
	transactions: Transaction[]
}

export function Dashboard({ transactions }: Props) {
	const income = useMemo(
		() =>
			transactions
				.filter(t => t.type === 'income')
				.reduce((sum, t) => sum + t.amount, 0),
		[transactions],
	)
	const expense = useMemo(
		() =>
			transactions
				.filter(t => t.type === 'expense')
				.reduce((sum, t) => sum + t.amount, 0),
		[transactions],
	)
	const categoryData = useMemo(
		() =>
			transactions.reduce(
				(acc, t) => {
					const existing = acc.find(item => item.name === t.category)
					if (existing) {
						existing.value += t.amount
					} else {
						acc.push({ name: t.category, value: t.amount })
					}
					return acc
				},
				[] as { name: string; value: number }[],
			),
		[transactions],
	)

	const monthData = useMemo(
		() =>
			transactions.reduce(
				(acc, t) => {
					const month = t.date.slice(0, 7)
					const existing = acc.find(item => item.month === month)
					if (existing) {
						if (t.type === 'income') existing.income += t.amount
						else existing.expense += t.amount
					} else {
						acc.push({
							month,
							income: t.type === 'income' ? t.amount : 0,
							expense: t.type === 'expense' ? t.amount : 0,
						})
					}
					return acc
				},
				[] as { month: string; income: number; expense: number }[],
			),
		[transactions],
	)

	const pieData = {
		labels: categoryData.map(item => item.name),
		datasets: [
			{
				data: categoryData.map(item => item.value),
				backgroundColor: PIE_COLORS,
				borderWidth: 0,
			},
		],
	}

	const barData = {
		labels: monthData.map(item => item.month),
		datasets: [
			{
				label: 'Income',
				data: monthData.map(item => item.income),
				backgroundColor: '#22c55e',
				borderRadius: 4,
			},
			{
				label: 'Expense',
				data: monthData.map(item => item.expense),
				backgroundColor: '#ef4444',
				borderRadius: 4,
			},
		],
	}

	const chartOptions = {
		plugins: {
			legend: {
				labels: {
					color: '#9ca3af',
				},
			},
		},
	}

	const barOptions = {
		...chartOptions,
		scales: {
			x: {
				ticks: { color: '#6b7280' },
				grid: { color: '#374151' },
			},
			y: {
				ticks: { color: '#6b7280' },
				grid: { color: '#374151' },
			},
		},
	}

	return (
		<div className='flex flex-col gap-4'>
			<div className='grid grid-cols-3 gap-4'>
				<div className='bg-gray-800 rounded-xl p-4'>
					<p className='text-gray-400 text-sm mb-1'>Income</p>
					<p className='text-green-500 text-2xl font-bold'>
						+{formatAmount(income)} KZT
					</p>
				</div>
				<div className='bg-gray-800 rounded-xl p-4'>
					<p className='text-gray-400 text-sm mb-1'>Expense</p>
					<p className='text-red-500 text-2xl font-bold'>
						-{formatAmount(expense)} KZT
					</p>
				</div>
				<div className='bg-gray-800 rounded-xl p-4'>
					<p className='text-gray-400 text-sm mb-1'>Balance</p>
					<p
						className={`text-2xl font-bold ${income - expense >= 0 ? 'text-white' : 'text-red-500'}`}
					>
						{formatAmount(income - expense)} KZT
					</p>
				</div>
			</div>

			{transactions.length > 0 && (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='bg-gray-800 rounded-xl p-4'>
						<h3 className='text-white font-semibold mb-4'>By Category</h3>
						<Pie data={pieData} options={chartOptions} />
					</div>

					<div className='bg-gray-800 rounded-xl p-4'>
						<h3 className='text-white font-semibold mb-4'>By Month</h3>
						<Bar data={barData} options={barOptions} />
					</div>
				</div>
			)}
		</div>
	)
}
