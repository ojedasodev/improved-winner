const { test,describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const helper = require('../utils/test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app);

const Blog = require('../models/Blog')
const assert = require("assert");

describe('blogs ', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        const blogs = helper.initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogs.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('property id is present on blog post instead of _id', async () => {
        const exist = await Blog.findOne({})
        assert.strictEqual(typeof exist.id, 'string')
    })

    test('are successfully created and total number of blogs are increased by one', async () => {
      const blogsBefore = await helper.blogsInDb();
      await api.post('/api/blogs', {
          title: "postest",
          author: "test",
          url: "https://test.com/",
          likes: 1,
      }).set({ Authorization: token })
          .expect(201)


      const blogsAfter = await helper.blogsInDb()
      assert.deepStrictEqual(blogsAfter.length, blogsBefore.length + 1)
    })

    test('are missing like property', async () => {
        await api.post('/api/blogs', {
            title: "postest",
            author: "test",
            url: "https://test.com/"
        }).expect(400)

        const blogsAtTheEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtTheEnd.length, helper.initialBlogs.length)
    } )

    test('are missing title and url property', async () => {
        await api.post('/api/blogs', {
            author: "test",
            likes: 1
        }).expect(400)

        const blogsAtTheEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtTheEnd.length, helper.initialBlogs.length)
    })

    test('are deleted successfully', async () => {
        const beforeDelete = await helper.blogsInDb()
        const blogToDelete = beforeDelete[0]
        await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204)
        const afterDelete = await helper.blogsInDb()
        assert.deepStrictEqual(afterDelete.length, beforeDelete.length -1)
    })

    test('are updated successfully', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const updated = await api.put(`/api/blogs/:${blogToUpdate.id}`, {
            likes: 5
        }).expect(200)
        assert.deepStrictEqual(blogToUpdate.likes, updated.likes + 2)
    })
})

after(async () => {
    await mongoose.connection.close()
})
