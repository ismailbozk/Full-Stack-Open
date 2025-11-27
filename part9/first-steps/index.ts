import express from 'express'
import bmiCalculator from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res): void => {
  if (!req.query.height || !req.query.weight) {
    res.status(400).send({ error: 'malformatted parameters' })
    return
  }

  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' })
    return
  }

  const bmi = bmiCalculator(height, weight)
  res.send({ height, weight, bmi })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
