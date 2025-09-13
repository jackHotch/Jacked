import express from 'express'
import cors from 'cors'
import { cronjob } from './database/Splits'
import { userIdMiddleware } from './middleware/middleware'

const v3Router = express.Router()

v3Router.use(express.json())
v3Router.use(userIdMiddleware)
v3Router.use(
  cors({
    origin: [
      'https://jackhotchkiss-jacked.vercel.app',
      'https://jackhotchkiss-gym-app.vercel.app',
    ],
  })
)

v3Router.get('/cronjob', async (req, res) => {
  const rows = await cronjob()
  res.json(rows)
})

import exercisesRouter from './routes/Exercises'
v3Router.use(`/exercises`, exercisesRouter)

import splitsRouter from './routes/Splits'
v3Router.use(`/splits`, splitsRouter)

import weightsRouter from './routes/Weights'
v3Router.use(`/weights`, weightsRouter)

import workoutsRouter from './routes/Workouts'
v3Router.use(`/workouts`, workoutsRouter)

export default v3Router