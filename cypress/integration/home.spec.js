describe('Homepage', function () {
	it('is as it should', function () {
		cy.visit('/');
		cy.get('.components-Header__avatar');
		cy.get('.components-Header__name').contains(`Serge 'Sinewyk' Havas`);
	});
});
