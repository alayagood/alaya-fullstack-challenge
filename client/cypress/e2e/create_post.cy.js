describe('create post', () => {
  it('can create a post if logged in', () => {
    cy.login()

    cy.intercept(
      {
        method: 'GET',
        url: '/api/posts',
        hostname: 'localhost'
      },
      { fixture: 'posts_none.json' }
    ).as('getPosts')
    cy.intercept(
      {
        method: 'POST',
        url: '/api/posts',
        hostname: 'localhost'
      },
      { fixture: 'post.json' }
    ).as('createPost')

    // we're redirected to the home after login
    cy.wait('@getPosts')

    cy.findByLabelText('Post title').type('Post title 1')
    cy.findByLabelText('Post content').type('Post text 1')
    cy.findByRole('button', { name: 'Submit' }).click()
    cy.wait('@createPost')

    // clear the inputs to correctly find the post
    // this is another indicator that we probably need a better way to identify posts
    cy.findByLabelText('Post title').clear()
    cy.findByLabelText('Post content').clear()

    cy.findByText('Post title 1')
    cy.findByText('Post text 1')
  })

  it('cannot create a post if not logged in', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/posts',
        hostname: 'localhost'
      },
      { fixture: 'posts_none.json' }
    ).as('getPosts')

    cy.visit('http://localhost:8000/')
    cy.wait('@getPosts')

    cy.findByText('You need to login to create posts')
    cy.findByLabelText('Post title').should('not.exist')
    cy.findByLabelText('Post content').should('not.exist')
    cy.findByRole('button', { name: 'Submit' }).should('not.exist')
  })
})