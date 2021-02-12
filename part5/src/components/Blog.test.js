import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

//import BlogService from 'services/blogs'

//jest.mock('BlogService')

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()
  let testBlog = {
    user: 'testUser',
    likes: 77,
    author: 'testAuthor',
    title: 'testTitle',
    url: 'testurl.com',
  }
  beforeEach(() => {
    const user = {
      id: '2133213',
      username: 'testuser',
      name: 'Test User',
    }

    component = render(<Blog blog={testBlog} user={user} likeButtonHandler={mockHandler}/>)
  })

  test('renders simple content correctly', () => {
    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).toHaveTextContent('testTitle')
  })

  test('renders full content correctly', () => {
    const button = component.container.querySelector('.showButton')
    //const button = component.getByText('Show')
    if (button) fireEvent.click(button)
    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('77')
    expect(component.container).toHaveTextContent('testurl.com')
  })

  test('Two clicks of like button causes two calls to Blogservice update()', async () => {

    const showButton = component.container.querySelector('.showButton')
    if (showButton) fireEvent.click(showButton)
    const likeButton = component.container.querySelector('.likeButton')
    if (likeButton) fireEvent.click(likeButton)
    if (likeButton) fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
