import express, { Request, Response, Router } from 'express'
import { getDevSettings, setDevSettings, resetWeights } from '../database/Development'
const router: Router = express.Router()

router.get('/settings', async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  const response = await getDevSettings(userId)
  return res.status(response.statusCode).json(response)
})

router.post('/weights/reset', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const weightData = req.body

  const response = await resetWeights(userId, weightData)
  return res.status(response.statusCode).json(response)
})

router.post('/settings', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const updatedSettings = req.body.settings

  const response = await setDevSettings(updatedSettings, userId)
  return res.status(response.statusCode).json(response)
})

export default router
