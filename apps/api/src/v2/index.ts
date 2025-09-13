import express from 'express'
import cors from 'cors'
import { cronjob } from './database/Splits'

const v2Router = express.Router()

v2Router.use(express.json())
v2Router.use(
  cors({
    origin: [
      'https://jackhotchkiss-jacked.vercel.app',
      'https://jackhotchkiss-gym-app.vercel.app',
    ],
  })
)

v2Router.get('/cronjob', async (req, res) => {
  const rows = await cronjob()
  res.json(rows)
})

import exercisesRouter from './routes/Exercises'
v2Router.use(`/exercises`, exercisesRouter)

import splitsRouter from './routes/Splits'
v2Router.use(`/splits`, splitsRouter)

import weightsRouter from './routes/Weights'
v2Router.use(`/weights`, weightsRouter)

import workoutsRouter from './routes/Workouts'
v2Router.use(`/workouts`, workoutsRouter)

export default v2Router