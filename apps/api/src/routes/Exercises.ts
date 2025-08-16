import express, { Request, Response } from 'express'
const router = express.Router()

import { getExercises, insertExercise } from '../database/Exercises'

router.get('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const rows = await getExercises(userId)
  res.json(rows)
})

router.post('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const name = req.body.name
  await insertExercise(userId, name)
  res.sendStatus(201)
})

export default router
