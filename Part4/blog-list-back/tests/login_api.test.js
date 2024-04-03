const { test,describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const helper = require('../utils/test_helper')
const supertest = require('supertest')
const app = require('../app')
const assert = require("assert");

const bcrypt = require('bcrypt')
const User = require('../models/User')

const api = supertest(app);


describe('when users log in', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })
    test('and incorrect password', async () => {
        const response = await api.post('/api/login/').send(
            {
                username: 'root',
                password: 'secret'
            }
        )
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(response.body, {error: 'invalid username or password'})
    })

    test('and successfully logged in', async () => {
        const user = {
            username: 'root',
            password: 'sekret'
        }
        const response = await api.post('/api/login/').send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(response.body.username, user.username)
    })

    after(async () => {
        await mongoose.connection.close()
    })
})