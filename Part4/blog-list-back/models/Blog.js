const Schema = require('mongoose').Schema
const Model = require('mongoose').model

const blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = Model('Blog', blogSchema)

module.exports = Blog