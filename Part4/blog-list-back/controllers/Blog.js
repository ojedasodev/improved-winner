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
    const blog = new Blog({title, author, url, likes: likes | 0,
        user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const blogPopulated = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1})
    response.status(201).json(blogPopulated)
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
    const newBlog = request.body
    if(!newBlog){
        return response.status(400).end()
    }
    const updated = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true, context: 'query' })
    if (updated){
        const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        return response.status(200).json(allBlogs)
    }
    return response.status(404).end()
})

module.exports = BlogsRouter