import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders correct content', () => {
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

  const component = render(
    <Blog blog={blog} user={user} updateBlog={jest.fn()} deleteBlog={jest.fn()}/>
  )

    console.log(component.container.textContent)

  expect(component.container.textContent).toContain('React patterns')
  expect(component.container.textContent).toContain('Michael Chan')
  expect(component.container.textContent).not.toContain('https://reactpatterns.com/')
  expect(component.container.textContent).not.toContain('7')
})