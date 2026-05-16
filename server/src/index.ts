import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import transactionsRouter from './routes/transactions'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/transactions', transactionsRouter)

mongoose
	.connect(process.env.MONGO_URI!)
	.then(() => {
		console.log('Connected to MongoDB')
		app.listen(5000, () => console.log('Server running on port 5000'))
	})
	.catch(err => console.error('Error connecting to MongoDB:', err))
