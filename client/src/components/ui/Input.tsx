interface Props {
	label?: string
	error?: string
	id?: string
	type?: string
	placeholder?: string
	value?: string | number
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	disabled?: boolean
	className?: string
}

export function Input({
	label,
	error,
	id,
	type = 'text',
	placeholder,
	value,
	onChange,
	disabled = false,
	className = '',
}: Props) {
	return (
		<div className='flex flex-col gap-1.5'>
			{label && (
				<label htmlFor={id} className='text-sm text-gray-400'>
					{label}
				</label>
			)}

			<input
				id={id}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				disabled={disabled}
				className={`
          bg-gray-700 text-white placeholder-gray-500
          px-4 py-2.5 rounded-lg outline-none
          border border-transparent focus:border-cyan-600
          transition-colors disabled:opacity-50
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
			/>

			{error && <p className='text-red-500 text-xs'>{error}</p>}
		</div>
	)
}
