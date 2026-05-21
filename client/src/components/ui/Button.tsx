interface Props {
	children: React.ReactNode
	onClick?: () => void
	type?: 'button' | 'submit'
	variant?: 'primary' | 'danger' | 'secondary' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	loading?: boolean
	disabled?: boolean
	className?: string
}

export function Button({
	children,
	onClick,
	type = 'button',
	variant = 'primary',
	size = 'md',
	loading = false,
	disabled = false,
	className = '',
}: Props) {
	const variants = {
		primary: 'bg-cyan-600 hover:bg-cyan-700 text-white',
		danger: 'bg-red-600 hover:bg-red-700 text-white',
		secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
		ghost: 'bg-transparent hover:bg-gray-700 text-gray-400 hover:text-white',
	}

	const sizes = {
		sm: 'py-1.5 px-3 text-sm',
		md: 'py-2.5 px-4 text-sm',
		lg: 'py-3 px-6 text-base',
	}

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || loading}
			className={`
        font-semibold rounded-lg transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
		>
			{loading ? 'Loading...' : children}
		</button>
	)
}
