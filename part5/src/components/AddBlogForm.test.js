import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from './AddBlogForm'

describe('<AddBlogForm />', () => {
  let component
  const addBlogFormHandler = jest.fn()

  beforeEach(() => {
    component = render(<AddBlogForm addBlogHandler={addBlogFormHandler} />)
  })

  test('Form sends correct values on submit', () => {
    const authorInput = component.container.querySelector('#newBlogFormAuthor')
    const titleInput = component.container.querySelector('#newBlogFormTitle')
    const urlInput = component.container.querySelector('#newBlogFormUrl')
    const form = component.container.querySelector('#newBlogForm')

    fireEvent.change(authorInput, {
      target: { value: 'testAuthor' },
    })
    fireEvent.change(titleInput, {
      target: { value: 'testTitle' },
    })
    fireEvent.change(urlInput, {
      target: { value: 'testUrl' },
    })
    fireEvent.submit(form)
    expect(addBlogFormHandler.mock.calls).toHaveLength(1)
    expect(addBlogFormHandler.mock.calls[0][0].author).toBe('testAuthor')
    expect(addBlogFormHandler.mock.calls[0][0].title).toBe('testTitle')
    expect(addBlogFormHandler.mock.calls[0][0].url).toBe('testUrl')
  })
})
