const jwt = require('jsonwebtoken')
const {SECRET} = require("./config");
const User = require('../models/User')
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })

    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(400).json({ error: 'token missing or invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    } else if (error.name === 'DocumentNotFoundError') {
        return response.status(404).json({
            message: 'document not found'
        })
    }
    next(error)
}

const getTokenFromRequest = (request, response, next) => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if(!request.token) return response.status(401).end()
    const decodedToken = jwt.decode(request.token, SECRET)
    if( !decodedToken && !decodedToken.id){
        return response.status(401).json({ message: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if(!user) return response.status(404).json({ message: 'user not found' })
    request.user = user
    next()
}

module.exports = {
    errorHandler,
    getTokenFromRequest,
    userExtractor
}