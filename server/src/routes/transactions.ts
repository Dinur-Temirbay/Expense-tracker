import { Router } from 'express'
import { getTransactions } from '../controllers/transactions'

const router = Router()

router.get('/', getTransactions)
// router.post('/')
// router.delete('/:id')

export default router
