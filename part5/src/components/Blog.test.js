import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const testBlog = {
    user: 'testUser',
    likes: 77,
    author: 'testAuthor',
    title: 'testTitle',
    url: 'testurl.com',
  }

  const user = {
    id: '2133213',
    username: 'testuser',
    name: 'Test User'
  }

  const component = render(<Blog blog={testBlog} user={user}/>)

  expect(component.container).toHaveTextContent(
    'testAuthor'
  )
  expect(component.container).toHaveTextContent(
    'testTitle'
  )
})
