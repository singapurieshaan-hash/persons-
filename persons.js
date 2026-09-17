import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

import Phone from './models/phone.js'

const app = express()

app.use(express.json())
app.use(express.static('dist'))


app.get('/api/persons', (request, response, next) => {
  Phone.find({})
    .then(people => {
      response.json(people)
    })
    .catch(error => next(error))
})


app.get('/info', (request, response, next) => {
  Phone.countDocuments({})
    .then(count => {
      response.send(
        `Phonebook has info for ${count} people, ${new Date()}.`
      )
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Phone.findById(id)
    .then(phon => {
      if (phon) {
        response.json(phon)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Phone.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const indi = request.body

  if (!indi.number || !indi.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const phon = new Phone({
    number: indi.number,
    name: indi.name
  })

  phon.save()
    .then(savedPhone => {
      response.json(savedPhone)
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const indi = request.body

  const person = {
    name: indi.name,
    number: indi.number
  }

  Phone.findByIdAndUpdate(
    request.params.id,
    person,
    {
      new: true,
      runValidators: true
    }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})