import { useState } from 'react'
import { useAuth } from '@hooks/useAuth.ts'
import { register as registerApi } from '../api/auth.ts'
import { Link } from 'react-router-dom'
import { Button } from '@components/ui/Button.tsx'
import { Input } from '@components/ui/Input.tsx'

const passwordRegex =
	/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

export function RegisterPage() {
	const { login } = useAuth()

	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	})

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
	})

	const [loading, setLoading] = useState(false)
	const [serverError, setServerError] = useState('')

	const validate = () => {
		const newErrors = { name: '', email: '', password: '' }

		if (!form.name.trim()) {
			newErrors.name = 'Name is required'
		}

		if (!form.email.trim()) {
			newErrors.email = 'Email is required'
		} else if (!form.email.includes('@')) {
			newErrors.email = 'Enter a valid email'
		}

		if (!form.password) {
			newErrors.password = 'Password is required'
		} else if (!passwordRegex.test(form.password)) {
			newErrors.password =
				'Min 8 characters, uppercase, lowercase, number or special character'
		}

		setErrors(newErrors)

		return !newErrors.name && !newErrors.email && !newErrors.password
	}

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		setServerError('')

		if (!validate()) return

		setLoading(true)
		try {
			const res = await registerApi(form.name, form.email, form.password)
			login(res.data.user, res.data.token)
		} catch (err: any) {
			setServerError(err.response?.data?.message || 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-gray-900 flex items-center justify-center px-4'>
			<div className='bg-gray-800 rounded-xl p-8 w-full max-w-md'>
				<h1 className='text-white text-2xl font-bold mb-6'>Create Account</h1>

				{serverError && (
					<p className='text-red-500 text-sm mb-4'>{serverError}</p>
				)}

				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					<Input
						id='name'
						type='text'
						label='Name'
						placeholder='John Doe'
						value={form.name}
						onChange={e => setForm({ ...form, name: e.target.value })}
						error={errors.name}
					/>
					<Input
						id='email'
						type='email'
						label='Email'
						placeholder='you@example.com'
						value={form.email}
						onChange={e => setForm({ ...form, email: e.target.value })}
						error={errors.email}
					/>
					<Input
						id='password'
						type='password'
						label='Password'
						placeholder='••••••••'
						value={form.password}
						onChange={e => setForm({ ...form, password: e.target.value })}
						error={errors.password}
					/>

					{!errors.password && (
						<p className='text-gray-500 text-xs -mt-2'>
							Min 8 characters, uppercase, lowercase, number or special
							character
						</p>
					)}

					<Button
						type='submit'
						size='lg'
						loading={loading}
						className='w-full mt-2'
					>
						Create Account
					</Button>
				</form>

				<p className='text-gray-400 text-sm mt-4 text-center'>
					Already have an account?{' '}
					<Link to='/login' className='text-cyan-500 hover:underline'>
						Sign In
					</Link>
				</p>
			</div>
		</div>
	)
}
