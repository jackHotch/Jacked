import express, { Request, Response, Router } from 'express'
const router: Router = express.Router()

import { getExercises, insertExercise } from '../database/Exercises'

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  const response = await getExercises(userId)
  return res.status(response.statusCode).json(response)
})

router.post('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const name = req.body.name

  const response = await insertExercise(userId, name)
  return res.status(response.statusCode).json(response)
})

export default router
