describe('Homepage', function() {
  it('is as it should', function() {
    cy.visit('/');
    cy.get('.components-_Header_avatar');
    cy.get('.components-_Header_name').contains(`Serge 'Sinewyk' Havas`);
  });
});
