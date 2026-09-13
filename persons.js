import express from 'express'
import cors from 'cors'

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let phone = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get('/api/persons', (request, response) => {
    response.json(phone)
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${phone.length} people, ${new Date()}.`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id 
    phon = phone.find(phon => phon.id === id)
    response.json(phon)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id 
    phone = phone.filter(phon => phon.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = phone.length > 0 
    ? Math.max(...phone.map(n => Number(n.id)))
    : 0 
    return (String(maxId + 1))
}

app.post('/api/persons', (request, response) => {
    
    const indi = request.body 

    if (!indi.number || !indi.name || phone.find(phon =>
  phon.name.toLowerCase() === indi.name.toLowerCase())) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    
    const phon = {
      number: indi.number,
      name: indi.name, 
      id: generateId()
    }

    phone = phone.concat(phon)

    response.json(phon)
})

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



