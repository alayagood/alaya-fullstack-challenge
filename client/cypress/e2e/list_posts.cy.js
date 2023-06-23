describe('lists posts', () => {
  it('lists all existing posts', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/posts',
        hostname: 'localhost'
      },
      { fixture: 'posts.json' }
    ).as('getPosts')

    cy.visit('http://localhost:8000/')
    cy.wait('@getPosts')

    // findByText is a bit generic, and probably not really accessible
    // maybe something like a list or an ARIA equivalent?
    cy.findByText('Post title 1')
    cy.findByText('Post text 1')

    cy.findByText('Post title 2')
    cy.findByText('Post text 2')
  })
})