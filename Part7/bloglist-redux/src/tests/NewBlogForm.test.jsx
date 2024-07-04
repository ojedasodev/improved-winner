import { render, screen } from '@testing-library/react'
import NewBlogForm from '../components/NewBlogForm.jsx'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm/> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<NewBlogForm handleNewBlog={createBlog}/>)
  const input = screen.getAllByRole('textbox')
  const sendButton = screen.getByRole('button')
  await user.type(input[0], 'testing a form1')
  await user.type(input[1], 'testing a form2')
  await user.type(input[2], 'testing a form3')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form1')
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form2')
  expect(createBlog.mock.calls[0][0].url).toBe('testing a form3')
})