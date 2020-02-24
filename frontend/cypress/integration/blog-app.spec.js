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

  it('User can login with correct credentials', function () {
    cy.get('#username').type('vmarttil')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Ville Marttila logged in')
  })

  it('Login with wrong credentials fails', function () {
    cy.get('#username').type('olematon')
    cy.get('#password').type('vaara')
    cy.get('#login-button').click()
    cy.contains('Wrong username or password.')
  })


})