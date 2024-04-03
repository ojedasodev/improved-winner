const { test,describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const helper = require('../utils/test_helper')
const supertest = require('supertest')
const app = require('../app')
const assert = require("assert");

const bcrypt = require('bcrypt')
const User = require('../models/User')

const api = supertest(app);

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
    test('when password is less than 3 characters long', async () => {
        const usersBefore = await helper.usersInDb()
        const newUser = {
            username: "santiago",
            password: "12"
        }
        await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        const usersAfter = await helper.usersInDb()
        assert.strictEqual(usersBefore.length, usersAfter.length)
    })

    test('when username is less than 3 characters long', async () => {
        const usersBefore = await helper.usersInDb()
        const newUser = {
            username: "sa",
            password: "lpepiniopro"
        }
        await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        const usersAfter = await helper.usersInDb()
        assert.strictEqual(usersBefore.length, usersAfter.length)
    })

    test('when username exist on db', async () => {
        const usersBefore = await helper.usersInDb()
        const newUser = {
            username: "root",
            password: "lpepiniopro"
        }
        await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        const usersAfter = await helper.usersInDb()
        assert.strictEqual(usersBefore.length, usersAfter.length)
    })
})


after(async () => {
    await mongoose.connection.close()
})