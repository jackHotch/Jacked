import express, { Request, Response, Router } from 'express'
const router: Router = express.Router()

import { getCurrentSplitName, getAllSplits, getCurrentSplitId } from '../database/Splits'

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  const { statusCode, ...response } = await getAllSplits(userId)
  return res.status(statusCode).json({ ...response })
})

router.get('/current/name', async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  const { statusCode, ...response } = await getCurrentSplitName(userId)
  return res.status(statusCode).json({ ...response })
})

router.get('/current/id', async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  const { statusCode, ...response} = await getCurrentSplitId(userId)
  return res.status(statusCode).json({...response})
})

export default router
