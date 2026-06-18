import { Router } from 'express'
import {
	addTransaction,
	deleteTransaction,
	getTransactions,
} from '../controllers/transactions'
import { authMiddleware } from '@middleware/auth'

const router = Router()

router.use(authMiddleware)

router.get('/', getTransactions)
router.post('/', addTransaction)
router.delete('/:id', deleteTransaction)

export default router
