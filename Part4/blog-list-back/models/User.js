const Schema = require('mongoose').Schema
const Model = require('mongoose').model

const userSchema = new Schema(
    {
        username: {
            type: String,
            minLength: 3,
            required: true,
            unique: true
        },
        name: String,
        passwordHash: {
            type: String,
            required: true
        },
        blogs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Blog"
            }
        ],
    }
)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = Model('User', userSchema)

module.exports = User