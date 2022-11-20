const express = require('express')
const responseTime = require('response-time')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(responseTime());
app.use(cors())
app.use(express.static('build'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

let people = [
    { 
      "id": 1,
      "name": "Iron man", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Thor", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Black Panther", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Harry Potter", 
      "number": "39-23-6423122"
    }
]

app.get('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = people.find(p => p.id === id)
    
    if (person) {
      response.json(person) //changes to json
    } else {
      response.status(404).end()
    }
})

app.get('/api/people', (request, response) => {
    response.json(people)
})
app.get('/info', (request, response) => {
    response.send(
        `Phonebook has info for ${people.length} people`,
        
        )
})
app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    
    people = people.filter(p => p.id !== id)
  
    response.status(204).end() //204 means no value sent back
})

app.post('/api/people', (request, response) => {
    const body = request.body //this gets the object 
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    if(people.find(person => person.name===body.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: Math.round(Math.random()*1000)
    }
  
    people = people.concat(person)
  
    response.json(person)
  })