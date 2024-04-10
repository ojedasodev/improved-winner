const { test, expect, describe, beforeEach } = require('@playwright/test')
const helpers = require('./helpers')
const request = require('axios')
const exp = require("node:constants");

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        })

        await page.goto('http://localhost:5173')
    })
    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Log in to application')).toBeVisible()
    })

    test('login form is shown', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByRole('textbox').first()).toBeVisible()
        await expect(page.getByRole('textbox').last()).toBeVisible()
    })
    describe('login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await helpers.loginWith(page, 'mluukkai',  'salainen')
            await expect(page.getByText('is logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await helpers.loginWith(page, 'santaigo', 'ospina')
            await expect(page.getByTestId('messagebox')).toBeVisible({ timeout: 1000 })
        })
    })
    describe('when logged in', () => {
        beforeEach( async ({ page }) => {
            await helpers.loginWith(page,'mluukkai', 'salainen')
            await expect(page.getByText('is logged in')).toBeVisible()
        })

        test('a new blog can be created', async ({ page }) => {
            await helpers.createBlog(page, 'a blog created by playwrigth', 'playwrigth', 'playwrigth.com')
            await expect(page.getByText('a blog created by playwrigth')).toBeHidden()
        })

        test('a blog can be deleted by user', async ({ page }) => {
            await helpers.createBlog(page, 'a blog created by playwrigth', 'playwrigth', 'playwrigth.com')
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'remove' }).click()
            await page.on('dialog', dialog => {
                dialog.accept()
            })

        })

        test('a blog can be edited', async ({ page }) => {
            await helpers.createBlog(page, 'a blog created by playwrigth', 'playwrigth', 'playwrigth.com')
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('likes: 1')).toBeVisible()
        })
    })

    /*no hice la 5.22 ni la 5.23*/

})

