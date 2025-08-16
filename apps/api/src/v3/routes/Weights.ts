import express, { Request, Response, Router } from 'express'
const router: Router = express.Router()

import {
  createEntry,
  getAllWeight,
  getWeight,
  deleteEntry,
  getCurrentWeight,
} from '../database/Weights'

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  const { statusCode, ...response } = await getAllWeight(userId)
  res.status(statusCode).json({ ...response })
})

router.post('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const { weight, date } = req.body

  const { statusCode, ...response } = await createEntry(userId, weight, date)
  res.status(statusCode).json({ ...response })
})

router.get('/current', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const { statusCode, ...response } = await getCurrentWeight(userId)
  res.status(statusCode).json({ ...response })
})

router.get('/:id', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const id = req.params.id

  const { statusCode, ...response } = await getWeight(userId, id)
  return res.status(statusCode).json({ ...response })
})

router.delete('/:id', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const id = req.params.id

  const { statusCode, ...response } = await deleteEntry(userId, id)
  return res.status(statusCode).json({ ...response })
})

export default router
