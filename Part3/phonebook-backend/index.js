require('dotenv').config()
const express = require("express")
const morgan = require('morgan')
const cors = require("cors")
const Persons = require("./models/person")

const app = express()

morgan.token('body',(req) => {
    if(req.method === "POST") return JSON.stringify(req.body)
})
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Persons.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Persons.findById(id).then(note => {
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    }).catch(error => {
        next(error)
    })
})

app.get("/info", (request, response, next) => {
    const now = new Date();
    Persons.countDocuments({}).then(count => {
        response.send(
            `<div>phonebook has info for ${count} people</div>
            <div>${now}</div>
        `)
    }).catch(err => {
        next(err)
    })
})

app.post("/api/persons", (request, response, next) => {
    const body = request.body
    const newPerson = new Persons({
        name: body.name,
        number: body.number
    })
    newPerson.save().then(result => {
        response.json(result)
    })
        .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const { name, number } = request.body
    Persons.findByIdAndUpdate(request.params.id,
        {name, number},
        { new: true, runValidators: true, context: 'query' })
        .then(updated => {
        response.json(updated)
    })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    Persons.deleteOne({ _id: id }).then(result => {
        response.json({
            message: result
        })
    }).catch(error => next(error))
})

app.use(errorHandler)
app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})