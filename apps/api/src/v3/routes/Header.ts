import express, { Request, Response, Router } from 'express'
const router: Router = express.Router()

import { getHeaderData } from '../database/Header'

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  const { statusCode, ...response } = await getHeaderData(userId)
  res.status(statusCode).json({ ...response })
})

export default router
