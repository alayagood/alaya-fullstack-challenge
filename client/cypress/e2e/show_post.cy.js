describe('show post', () => {
    it('shows a specific post', () => {
      cy.intercept(
        {
          method: 'GET',
          url: '/api/posts/postId1',
          hostname: 'localhost'
        },
        { fixture: 'post.json' }
      ).as('showPost')
  
      // interesting how the post slug (post-title-1) seems to play no role at all
      cy.visit('http://localhost:8000/posts/postId1/post-title-1')
      cy.wait('@showPost')
  
      cy.findByText('Post title 1')
      cy.findByText('By Author')
      cy.findByText('Post text 1')
    })
  })