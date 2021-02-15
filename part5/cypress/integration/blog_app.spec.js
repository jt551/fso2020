describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const testUser = {
      name : 'Test User',
      username: 'testuser',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', testUser)
    cy.visit('http://localhost:3000')
  })
  it('Initially the Login form is shown', function () {    
    cy.contains('Login Form')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-form-username').type('testuser')
      cy.get('#login-form-password').type('secret')
      cy.get('#login-form-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#login-form-username').type('testuser')
      cy.get('#login-form-password').type('public')
      cy.get('#login-form-button').click()

      cy.contains('Incorrect username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'secret'})
    })

    it('A blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#newBlogFormAuthor').type('cypressAuthor')
      cy.get('#newBlogFormTitle').type('cypressTitle')
      cy.get('#newBlogFormUrl').type('cypressUrl')
      cy.get('#newBlogFormButton').click()
      // Check
      cy.get('#showBlogButton').click()
      cy.contains('cypressAuthor')
      cy.contains('cypressTitle')
      cy.contains('cypressUrl')
    })
  })

})
