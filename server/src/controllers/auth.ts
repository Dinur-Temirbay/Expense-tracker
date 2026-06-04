import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '@models/User'
import { AuthRequest } from '@middleware/auth'

export const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body

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
		user: { id: user._id, email: user.email, name: user.name },
	})
}

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body

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
		user: { id: user._id, email: user.email, name: user.name },
	})
}

export const getMe = async (req: AuthRequest, res: Response) => {
	const user = await User.findById(req.userId).select('-password')
	res.json(user)
}
