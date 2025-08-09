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
  const rows = await getAllWeight(userId)
  res.status(200).json(rows)
})

router.post('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const { weight, date } = req.body
  await createEntry(userId, weight, date)
  res.sendStatus(201)
})

router.get('/current', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const row = await getCurrentWeight(userId)
  res.status(200).json(row[0])
})

router.get('/:id', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const id = req.params.id
  const row = await getWeight(userId, id)

  if (row.length == 0) res.status(400).json({ error: 'No matching records' })
  else res.status(200).json(row)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const id = req.params.id
  await deleteEntry(userId, id)
  res.sendStatus(204)
})

export default router
