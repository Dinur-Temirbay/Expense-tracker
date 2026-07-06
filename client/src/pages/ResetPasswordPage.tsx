import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword as resetPasswordApi } from '@api/auth'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'

export function ResetPasswordPage() {
	const navigate = useNavigate()
	const [form, setForm] = useState({
		email: '',
		newPassword: '',
		confirmPassword: '',
	})
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		setSuccess('')

		if (form.newPassword.length < 8) {
			setError('Password must be at least 8 characters')
			return
		}

		if (form.newPassword !== form.confirmPassword) {
			setError('Passwords do not match')
			return
		}

		setLoading(true)

		try {
			await resetPasswordApi(form.email, form.newPassword)
			setSuccess('Password updated successfully. You can sign in now.')
			setTimeout(() => navigate('/login'), 1200)
		} catch (err: any) {
			setError(err.response?.data?.message || 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-gray-900 flex items-center justify-center px-4'>
			<div className='bg-gray-800 rounded-xl p-8 w-full max-w-md'>
				<h1 className='text-white text-2xl font-bold mb-6'>Reset Password</h1>
				{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
				{success && <p className='text-green-500 text-sm mb-4'>{success}</p>}

				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					<Input
						id='email'
						type='email'
						label='Email'
						placeholder='you@example.com'
						value={form.email}
						onChange={e => setForm({ ...form, email: e.target.value })}
					/>
					<Input
						id='newPassword'
						type='password'
						label='New Password'
						placeholder='••••••••'
						value={form.newPassword}
						onChange={e => setForm({ ...form, newPassword: e.target.value })}
					/>
					<Input
						id='confirmPassword'
						type='password'
						label='Confirm Password'
						placeholder='••••••••'
						value={form.confirmPassword}
						onChange={e =>
							setForm({ ...form, confirmPassword: e.target.value })
						}
					/>

					<Button
						type='submit'
						size='lg'
						loading={loading}
						className='w-full mt-2'
					>
						Reset Password
					</Button>
				</form>

				<p className='text-gray-400 text-sm mt-4 text-center'>
					Back to{' '}
					<Link to='/login' className='text-cyan-500 hover:underline'>
						Sign In
					</Link>
				</p>
			</div>
		</div>
	)
}
