import '@testing-library/cypress/add-commands'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
  cy.intercept(
    {
      method: 'POST',
      url: '/api/login',
      hostname: 'localhost'
    },
    { fixture: 'successful_login.json' }
  ).as('login')

  cy.visit('http://localhost:8000/login')

  cy.findByLabelText('Username').type('username')
  cy.findByLabelText('Password').type('password')
  cy.findByRole('button', { name: 'Login' }).click()
  cy.wait('@login')
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })