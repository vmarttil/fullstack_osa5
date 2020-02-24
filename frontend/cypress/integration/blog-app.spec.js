describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Ville Marttila',
      username: 'vmarttil',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('login')

  })

  describe('Login',function() {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('vmarttil')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Ville Marttila logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('olematon')
      cy.get('#password').type('vaara')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password.')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('vmarttil')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#newblog-button').click()
      cy.get('#title').type('React patterns')
      cy.get('#author').type('Michael Chan')
      cy.get('#url').type('https://reactpatterns.com/')
      cy.get('#create-button').click()
      cy.contains('‘React patterns’')
    })
  })

})