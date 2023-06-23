describe('delete post', () => {
  it('can delete a post', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/posts',
        hostname: 'localhost'
      },
      { fixture: 'posts.json' }
    ).as('getPosts')
    cy.intercept(
      {
        method: 'DELETE',
        url: '/api/posts/postId1',
        hostname: 'localhost'
      },
      { fixture: 'posts.json' }
    ).as('deletePost')

    cy.visit('http://localhost:8000/')
    cy.wait('@getPosts')

    cy.findAllByRole('button', { name: 'Delete post' }).eq(0).click()
    cy.wait('@deletePost')

    cy.findByText('Post title 1').should('not.exist')
  })
})