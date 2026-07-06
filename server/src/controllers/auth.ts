import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { AuthRequest } from '../middleware/auth'

export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body

		if (!name || !email || !password) {
			res.status(400).json({ message: 'All fields are required' })
			return
		}

		if (!email.includes('@')) {
			res.status(400).json({ message: 'Invalid email' })
			return
		}

		if (password.length < 8) {
			res
				.status(400)
				.json({ message: 'Password must be at least 8 characters' })
			return
		}

		const existingUser = await User.findOne({ email })
		if (existingUser) {
			res.status(400).json({ message: 'User already exists' })
			return
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const user = new User({ name, email, password: hashedPassword })
		await user.save()

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
			expiresIn: '7d',
		})

		res.status(201).json({
			token,
			user: { id: user._id.toString(), email: user.email, name: user.name },
		})
	} catch (err) {
		console.error('register error:', err)
		res.status(500).json({ message: 'Server error' })
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			res.status(400).json({ message: 'All fields are required' })
			return
		}

		const user = await User.findOne({ email })
		if (!user) {
			res.status(400).json({ message: 'Invalid credentials' })
			return
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			res.status(400).json({ message: 'Invalid credentials' })
			return
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
			expiresIn: '7d',
		})

		res.json({
			token,
			user: { id: user._id.toString(), email: user.email, name: user.name },
		})
	} catch (err) {
		console.error('login error:', err)
		res.status(500).json({ message: 'Server error' })
	}
}

export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { email, newPassword } = req.body

		if (!email || !newPassword) {
			res.status(400).json({ message: 'Email and new password are required' })
			return
		}

		if (newPassword.length < 8) {
			res
				.status(400)
				.json({ message: 'Password must be at least 8 characters' })
			return
		}

		const user = await User.findOne({ email })
		if (!user) {
			res.status(404).json({ message: 'User not found' })
			return
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10)
		user.password = hashedPassword
		await user.save()

		res.json({ message: 'Password updated successfully' })
	} catch (err) {
		console.error('resetPassword error:', err)
		res.status(500).json({ message: 'Server error' })
	}
}

export const getMe = async (req: AuthRequest, res: Response) => {
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user) {
			res.status(404).json({ message: 'User not found' })
			return
		}
		res.json(user)
	} catch (err) {
		console.error('getMe error:', err)
		res.status(500).json({ message: 'Server error' })
	}
}
