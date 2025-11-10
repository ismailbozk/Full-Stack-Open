require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Phonebook = require('./models/phonebook')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

function morganLogger(request, response, next) {
  morgan.token('body', function (req) {
    return JSON.stringify(req.body)
  })
  const logger = morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  )
  logger(request, response, next)
}
app.use(morganLogger)

app.get('/info', async (request, response, next) => {
  try {
    // This line gets the total count of documents in the Phonebook collection
    const count = await Phonebook.countDocuments({})

    response.send(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Phonebook info</title>
  </head>
  <body>
    <h1>Phonebook</h1>
    <p>Phonebook has info for ${count} people</p>
    <p>${new Date()}</p>
  </body>
</html>`)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons', async (request, response, next) => {
  try {
    const persons = await Phonebook.find({})
    response.json(persons)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phonebook.findById(id)
    .then((found) => {
      if (found) {
        response.json(found)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const result = await Phonebook.findByIdAndDelete(id)

    if (!result) {
      return response.status(404).json({ error: 'Person not found' })
    }

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing',
    })
  }

  const person = Phonebook({
    name: body.name,
    number: body.number,
  })

  try {
    await person.save()
    response.json(person)
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (request, response, next) => {
  console.log('PUT /api/persons called')
  const id = request.params.id
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing',
    })
  }

  try {
    const updatedPerson = await Phonebook.findByIdAndUpdate(
      id,
      { name: body.name, number: body.number },
      { new: true, runValidators: true }
    )

    if (!updatedPerson) {
      return response.status(404).json({ error: 'Person not found' })
    }

    response.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
