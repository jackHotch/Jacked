import express, { Request, Response, Router } from 'express'
const router: Router = express.Router()

import { getCurrentSplit, getAllSplits } from '../database/Splits'

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  const { statusCode, ...response } = await getAllSplits(userId)
  return res.status(statusCode).json({ ...response })
})

router.get('/current', async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  const { statusCode, ...response } = await getCurrentSplit(userId)
  return res.status(statusCode).json({ ...response })
})

export default router
