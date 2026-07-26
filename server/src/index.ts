import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth'
import transactionsRouter from './routes/transactions'

dotenv.config()

const app = express()

app.use(
	cors({
		origin: process.env.CLIENT_URL,
	}),
)
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/transactions', transactionsRouter)

mongoose
	.connect(process.env.MONGO_URI!)
	.then(() => {
		console.log('Connected to MongoDB')
		app.listen(process.env.PORT, () =>
			console.log(`Server running on port ${process.env.PORT}`),
		)
	})
	.catch(err => console.error('Error connecting to MongoDB:', err))
