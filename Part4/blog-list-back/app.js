const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middlewares = require('./utils/middlewares')
const mongoose = require('mongoose')
const BlogRouter = require('./controllers/Blog')
const UsersRouter = require('./controllers/Users')
const LoginRouter = require('./controllers/Login')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(middlewares.getTokenFromRequest)

app.use('/api/blogs',BlogRouter)
app.use('/api/users', UsersRouter)
app.use('/api/login', LoginRouter)

app.use(middlewares.errorHandler)
module.exports = app
