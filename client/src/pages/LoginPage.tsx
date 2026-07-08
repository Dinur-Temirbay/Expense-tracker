import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { login as loginApi } from '@api/auth'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'

export function LoginPage() {
	const { login } = useAuth()
	const [form, setForm] = useState({
		email: '',
		password: '',
	})

	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const response = await loginApi(form.email, form.password)
			login(response.data.user, response.data.token)
		} catch (err: any) {
			setError(err.response?.data?.message || 'Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-gray-900 flex items-center justify-center px-4'>
			<div className='bg-gray-800 rounded-xl p-8 w-full max-w-md'>
				<h1 className='text-white text-2xl font-bold mb-6'>Sign In</h1>
				{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
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
						id='password'
						type='password'
						label='Password'
						placeholder='••••••••'
						value={form.password}
						onChange={e => setForm({ ...form, password: e.target.value })}
					/>

					<Button
						type='submit'
						size='lg'
						loading={loading}
						className='w-full mt-2'
					>
						Sign In
					</Button>
				</form>
				<div className='flex justify-center items-center mt-4'>
					<p className='text-gray-400 text-sm mt-4 text-center'>
						No account?{' '}
						<Link to='/register' className='text-cyan-500 hover:underline'>
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
