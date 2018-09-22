describe('Posts', () => {
  it('from home to posts', () => {
    cy.visit('/posts');
    cy.get('li a').click();
    cy.get('h2').contains('Simpler times');
    cy.location().should($location => {
      expect($location.pathname).to.equal('/posts/simpler-times');
    });
  });
});
