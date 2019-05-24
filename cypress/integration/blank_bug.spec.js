describe('target="_blank" bug', () => {
  it('shows it', () => {
    cy.visit('/');
    cy.get('a')
      .first()
      .click();
    cy.get('footer a')
      .first()
      .should('not.have.attr', 'target', '_blank');
  });
});
