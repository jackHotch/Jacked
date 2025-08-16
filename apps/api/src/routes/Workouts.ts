import express, { Request, Response } from 'express'
const router = express.Router()

import { getCurrentWorkoutNumber, getWorkout, insertWorkout } from '../database/Workouts'

router.get('/count', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const rows = await getCurrentWorkoutNumber(userId)
  res.json(rows[0])
})

router.post('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const workout = req.body.workout
  await insertWorkout(userId, workout)
  res.sendStatus(201)
})

router.get('/:workoutId', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const workoutId = req.params.workoutId
  const rows = await getWorkout(userId, workoutId)

  if (rows.length === 0) res.status(400).json({ error: 'No matching records' })
  else res.status(200).json(rows)
})

export default router
