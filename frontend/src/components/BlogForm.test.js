import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const title = 'React patterns'
const author = 'Michael Chan'
const url = 'https://reactpatterns.com/'

test('filling the blog creation form and submitting it calls the blog creation function with the correct data', async () => {
  const mockCreateBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={mockCreateBlog} />
  )
  const form = component.container.querySelector('form')
  const titleField = component.container.querySelector('#title')
  const authorField = component.container.querySelector('#author')
  const urlField = component.container.querySelector('#url')
  fireEvent.change(titleField, { 
    target: { value: title} 
  })
  fireEvent.change(authorField, { 
    target: { value: author} 
  })
  fireEvent.change(urlField, { 
    target: { value: url} 
  })
  fireEvent.submit(form)
  expect(mockCreateBlog.mock.calls.length).toBe(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('React patterns')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('Michael Chan')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('https://reactpatterns.com/')
})