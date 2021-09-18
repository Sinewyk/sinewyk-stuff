describe('target="_blank" bug', () => {
	it('is fixed', () => {
		cy.visit('/');
		cy.get('a').first().click();
		cy.get('footer a').first().should('not.have.attr', 'target', '_blank');
	});
});
