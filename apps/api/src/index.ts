import express, { Express } from 'express'

const app: Express = express()
const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.json({ message: 'jacked/api' })
})

import v2Routes from './v2/index'
app.use('/v2', v2Routes)

import v3Routes from './v3/index'
app.use('/v3', v3Routes)

export default app
