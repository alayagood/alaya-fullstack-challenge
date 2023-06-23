describe('signup', () => {
  it('creates a user on successful sign up', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/signup',
        hostname: 'localhost'
      },
      { status: 200 }
    ).as('signup')

    cy.visit('http://localhost:8000/signup')

    cy.findByLabelText('Username').type('username')
    cy.findByLabelText('Password').type('password')
    cy.findByRole('button', { name: 'Sign up' }).click()
    cy.wait('@signup')

    cy.findByText('User created!')
  })
})