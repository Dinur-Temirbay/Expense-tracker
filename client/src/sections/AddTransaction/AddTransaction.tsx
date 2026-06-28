import { useState } from 'react'
import type { Category } from '../../types'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'

const DEFAULT_CATEGORIES: Category[] = [
	'Food',
	'Transport',
	'Entertainment',
	'Shopping',
	'Health',
	'Other',
]

export function AddTransaction({ onAdd }: Props) {
	const [title, setTitle] = useState('')
	const [amount, setAmount] = useState('')
	const [category, setCategory] = useState('Food')
	const [customCategory, setCustomCategory] = useState('')
	const [isCustom, setIsCustom] = useState(false)
	const [type, setType] = useState<'income' | 'expense'>('expense')
	const [date, setDate] = useState(new Date().toISOString().split('T')[0])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const finalCategory = isCustom ? customCategory : category

		if (!title || !amount || !finalCategory) return

		onAdd({
			title,
			amount: Number(amount),
			category: finalCategory,
			type,
			date,
		})

		setTitle('')
		setAmount('')
		setCustomCategory('')
		setIsCustom(false)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-gray-800 rounded-xl p-6 flex flex-col gap-4'
		>
			<h2 className='text-white text-xl font-bold'>Add Transaction</h2>

			<Input
				id='title'
				label='Title'
				placeholder='e.g. Groceries'
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>

			<Input
				id='amount'
				type='number'
				label='Amount'
				placeholder='0'
				value={amount}
				onChange={e => setAmount(e.target.value)}
			/>

			<div className='flex flex-col gap-1.5'>
				<label className='text-sm text-gray-400'>Category</label>

				<div className='flex gap-2 mb-1'>
					<button
						type='button'
						onClick={() => setIsCustom(false)}
						className={`text-xs px-3 py-1 rounded-full transition-colors ${!isCustom ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'}`}
					>
						Default
					</button>
					<button
						type='button'
						onClick={() => setIsCustom(true)}
						className={`text-xs px-3 py-1 rounded-full transition-colors ${isCustom ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400'}`}
					>
						Custom
					</button>
				</div>

				{isCustom ? (
					<Input
						id='customCategory'
						placeholder='e.g. Subscriptions'
						value={customCategory}
						onChange={e => setCustomCategory(e.target.value)}
					/>
				) : (
					<select
						value={category}
						onChange={e => setCategory(e.target.value)}
						className='bg-gray-700 text-white px-4 py-2.5 rounded-lg outline-none border border-transparent focus:border-cyan-600 transition-colors'
					>
						{DEFAULT_CATEGORIES.map(cat => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				)}
			</div>

			<div className='flex flex-col gap-1.5'>
				<label className='text-sm text-gray-400'>Type</label>
				<div className='flex gap-2'>
					<button
						type='button'
						onClick={() => setType('expense')}
						className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors ${type === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
					>
						Expense
					</button>
					<button
						type='button'
						onClick={() => setType('income')}
						className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors ${type === 'income' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
					>
						Income
					</button>
				</div>
			</div>

			<div className='flex flex-col gap-1.5'>
				<label className='text-sm text-gray-400'>Date</label>
				<input
					type='date'
					value={date}
					onChange={e => setDate(e.target.value)}
					className='bg-gray-700 text-white px-4 py-2.5 rounded-lg outline-none border border-transparent focus:border-cyan-600 transition-colors'
				/>
			</div>

			<Button type='submit' size='lg' className='w-full'>
				Add
			</Button>
		</form>
	)
}
