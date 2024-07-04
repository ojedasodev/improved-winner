import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog.jsx'
import userEvent from '@testing-library/user-event'

let mockDelete
let mockUpdate
let blog

beforeEach(() => {
  blog = {
    'title': 'el mejor programador soi yio',
    'author': 'messi',
    'url': 'https://www.youtube.com/watch?v=7P-6GckyGRc',
    'likes': 84,
    'user': {
      'username': 'elboss',
      'name': 'santiago',
      'id': '660c26a0565221c8a3b1d402'
    },
    'id': '66104ddfdbd1f2f2f9dd3d1c'
  }
  mockDelete = vi.fn()
  mockUpdate = vi.fn()
})


test('renders content', () => {
  const { container } = render(<Blog deleteBlog={mockDelete} blog={blog} updateBlog={mockUpdate} username={''}/>)
  const element = container.querySelector('.blog')
  expect(element).toHaveTextContent('el mejor programador soi yio')
})

test('renders blogs title and author, but not renders its url or number of likes', () => {
  const { container } = render(<Blog deleteBlog={mockDelete} blog={blog} updateBlog={mockUpdate} username={''}/>)
  const div = container.querySelector('.blogDetails')
  const titleAndAuthor = screen.getByText('el mejor programador soi yio messi')
  expect(titleAndAuthor).toHaveTextContent('el mejor programador soi yio messi')
  expect(div).toHaveStyle('display: none')
})

test('checks that the blogs URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
  const { container } = render(<Blog deleteBlog={mockDelete} blog={blog} updateBlog={mockUpdate} username={''}/>)
  const user = userEvent.setup()
  const div = container.querySelector('.blogDetails')
  const button = screen.getByText('view')
  await user.click(button)
  expect(div).toHaveStyle('display: block')
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  render(<Blog deleteBlog={mockDelete} blog={blog} updateBlog={mockUpdate} username={''}/>)
  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockUpdate.mock.calls[0]).toHaveLength(2)
})

test('clicking the buttons calls event handler once', async () => {
  render(<Blog deleteBlog={mockDelete} blog={blog} updateBlog={mockUpdate} username={''}/>)
  const user = userEvent.setup()
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  expect(mockUpdate.mock.calls).toHaveLength(1)
})