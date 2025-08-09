import express, { Request, Response, Router } from 'express'
const router: Router = express.Router()

import { getHeaderData } from '../database/Header'

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const headerdata = await getHeaderData(userId)
})
