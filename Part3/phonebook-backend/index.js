const express = require("express")
const axios = require("axios")
const morgan = require('morgan')
const cors = require("cors")

const app = express()

morgan.token('body',(req) => {
    if(req.method === "POST") return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const [person] = persons.filter((person) => person.id === id)
    if(!person){
        response.status(404).json({
            message: "not found",
            status : 404
        })
    }else{
        response.json(person)
    }
})

app.get('/info', (request, response) => {
    const now = new Date();
    response.send(
        `<div>phonebook has info for ${persons.length} people</div>
        <div>${now}</div>
        `)
})

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SERVER = "http://localhost:3001"
app.post("/api/persons", async (request, response) => {
    const body = request.body
    if (!body.name || !body["number"]){
        response.status(400).json({message: "request body must have the items name and number"})
        return;
    }
    if (persons.map(person => person.name).includes(body.name)){
        response.status(400).json({message: "name already taken"})
        return;
    }
    const newId = getRandomNumber(1, 20)
    const req = await axios.get(`${SERVER}/api/persons/${newId}`)
        .then(response => response.status)
        .catch(err => err)
    if (req === 200) {
        response.status(409).json({
            error: "Resource already exists",
            message: "The resource you are trying to create already exists on the server."
        })
    } else {
        const person = {id: newId, ...body}
        persons = persons.concat(person)
        response.json(person)
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter((person) => person.id !== id )
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})