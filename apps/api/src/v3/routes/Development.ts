import express, { Request, Response, Router } from 'express'
import { getDevSettings } from '../database/Development'
const router: Router = express.Router()

router.get('/settings', async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  const response = await getDevSettings(userId)
  return res.status(response.statusCode).json(response)
})

export default router
