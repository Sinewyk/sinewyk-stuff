describe('Homepage', function () {
	it('is as it should', function () {
		cy.visit('/');
		cy.get('.avatar');
		cy.get('.mx-auto').contains(`Serge 'Sinewyk' Havas`);
	});
});
