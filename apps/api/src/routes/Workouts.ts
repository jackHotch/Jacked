import express, { Request, Response, Router } from 'express'
const router: Router = express.Router()

import { getCurrentWorkoutCount, getWorkout, insertWorkout } from '../database/Workouts'

router.get('/count', async (req: Request, res: Response) => {
  const userId = req.query.userId as string

  const { statusCode, ...response } = await getCurrentWorkoutCount(userId)
  res.status(statusCode).json({ ...response })
})

router.post('/', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const workout = req.body.workout

  const { statusCode, ...response } = await insertWorkout(userId, workout)
  res.status(statusCode).json({ ...response })
})

router.get('/:workoutId', async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const workoutId = req.params.workoutId

  const { statusCode, ...response } = await getWorkout(userId, workoutId)
  res.status(statusCode).json({ ...response })
})

export default router
