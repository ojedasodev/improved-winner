
async function loginWith (page, username, password){
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox').first().fill(username)
    await page.getByRole('textbox').last().fill(password)
    await page.getByRole('button', {name: 'login' }).click()
}

async function createBlog(page, title, author, url) {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
}

export {
    loginWith,
    createBlog
}