import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: '5e4a93ec7abfc719d02658ae'
}

const user = {
  username: 'vmarttil',
  name: 'Ville Marttila',
  id: '5e4a93ec7abfc719d02658ae'
}

test('renders correct content', () => {
  const component = render(
    <Blog blog={blog} user={user} updateBlog={jest.fn()} deleteBlog={jest.fn()}/>
  )
  expect(component.container.textContent).toContain('React patterns')
  expect(component.container.textContent).toContain('Michael Chan')
  expect(component.container.textContent).not.toContain('https://reactpatterns.com/')
  expect(component.container.textContent).not.toContain('7')
})

test('clicking the view button allows the url and the likes to be rendered', async () => {
  const component = render(
    <Blog blog={blog} user={user} updateBlog={jest.fn()} deleteBlog={jest.fn()}/>
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container.textContent).toContain('React patterns')
  expect(component.container.textContent).toContain('Michael Chan')
  expect(component.container.textContent).toContain('https://reactpatterns.com/')
  expect(component.container.textContent).toContain('likes 7')
})


test('clicking the like button twice calls the updateBlog function twice', async () => {
  const mockUpdateBlog = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockUpdateBlog} deleteBlog={jest.fn()}/>
  )
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockUpdateBlog.mock.calls.length).toBe(2)
})

