describe('login', () => {
  it('returns a JWT and redirects to homepage on successful login', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/login',
        hostname: 'localhost'
      },
      { fixture: 'successful_login.json' }
    ).as('login')
    cy.intercept(
      {
        method: 'GET',
        url: '/api/posts',
        hostname: 'localhost'
      },
      { fixture: 'posts.json' }
    ).as('getPosts')

    cy.visit('http://localhost:8000/login')

    cy.findByLabelText('Username').type('username')
    cy.findByLabelText('Password').type('password')
    cy.findByRole('button', { name: 'Login' }).click()
    cy.wait('@login')

    cy.url().should('eq', 'http://localhost:8000/')
    cy.findByText('username')
  })

  it('returns an error message on failed login', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/login',
        hostname: 'localhost'
      },
      { statusCode: 500 }
    ).as('failedLogin')

    cy.visit('http://localhost:8000/login')

    cy.findByLabelText('Username').type('wrong username')
    cy.findByLabelText('Password').type('wrong password')
    cy.findByRole('button', { name: 'Login' }).click()
    cy.wait('@failedLogin')

    cy.findByText('Invalid credentials')
  })
})