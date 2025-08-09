import express, { Request, Response, Router } from 'express'
const router: Router = express.Router()

import { getCurrentSplit, getAllSplits } from '../database/Splits'

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const rows = await getAllSplits(userId)
  res.status(200).json(rows)
})

router.get('/current', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const rows = await getCurrentSplit(userId)
  res.json(rows[0])
})

export default router
