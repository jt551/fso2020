import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders simple content correctly', () => {
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
      name: 'Test User',
    }

    const component = render(<Blog blog={testBlog} user={user} />)

    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).toHaveTextContent('testTitle')
  })

  test('renders full content correctly', () => {
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
      name: 'Test User',
    }

    const component = render(<Blog blog={testBlog} user={user} />)
    const button = component.container.querySelector('.showButton')
    //const button = component.getByText('Show')
    if(button) fireEvent.click(button)
    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('77')
    expect(component.container).toHaveTextContent('testurl.com')
  })
})
