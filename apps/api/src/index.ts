import express, { Express } from 'express'
import cors from 'cors'
import { cronjob } from './database/Splits'
import { userIdMiddleware } from './v3/middleware/middleware'

const app: Express = express()
const PORT = 8080
const VERSION = process.env.VERSION

app.use(express.json())
app.use(userIdMiddleware)
app.use(
  cors({
    origin: [
      'https://jackhotchkiss-jacked.vercel.app',
      'https://jackhotchkiss-gym-app.vercel.app',
    ],
  })
)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.json({ message: 'jacked/api' })
})

app.get('/cronjob', async (req, res) => {
  const rows = await cronjob()
  res.json(rows)
})

import exercisesRouter from './routes/Exercises'
app.use(`/${VERSION}/exercises`, exercisesRouter)

import splitsRouter from './routes/Splits'
app.use(`/${VERSION}/splits`, splitsRouter)

import weightsRouter from './routes/Weights'
app.use(`/${VERSION}/weights`, weightsRouter)

import workoutsRouter from './routes/Workouts'
app.use(`/${VERSION}/workouts`, workoutsRouter)

import exercises from './v3/routes/Exercises'
app.use(`/v3/exercises`, exercises)

import splits from './v3/routes/Splits'
app.use(`/v3/splits`, splits)

import weights from './v3/routes/Weights'
app.use(`/v3/weights`, weights)

import workouts from './v3/routes/Workouts'
app.use(`/v3/workouts`, workouts)

import header from './v3/routes/Header'
app.use(`/v3/header`, header)

export default app
