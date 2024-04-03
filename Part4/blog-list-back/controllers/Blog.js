const BlogsRouter = require('express').Router()
const Blog = require('../models/Blog');
const middleware = require('../utils/middlewares')

BlogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})
BlogsRouter.post('/',middleware.userExtractor,async (request, response) => {
    const { title, author, url, likes }= request.body
    const user = request.user
    const blog = new Blog({title, author, url, likes,
        user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

BlogsRouter.get('/:id', async (request, response) => {
    if(!request.params.id){
        response.status(400).end()
        return
    }
    const blog = await Blog.find({ _id: request.params.id })
    response.status(200).json(blog)
})

BlogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if(!blog){
        return response.status(404).json({ message: 'document not found' })
    } else if(blog.user.toString() === user.id){
        await Blog.findOneAndDelete({ _id: request.params.id})
    }
    response.status(204).end()
})

BlogsRouter.put('/:id', async (request, response) => {
    const { likes } = request.body
    if(likes){
        const updated = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, runValidators: true, context: 'query' })
        response.status(200).json(updated)
        return
    }
    response.status(400)
})

module.exports = BlogsRouter