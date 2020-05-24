describe('Routing', () => {
	it('from home to posts', () => {
		cy.visit('/');
		cy.get('a[href="/posts"]').click();
		cy.get('h2').contains('Posts');
		cy.location().should(($location) => {
			expect($location.pathname).to.equal('/posts');
		});
	});

	it('should handle 404', () => {
		cy.visit('/unknown');
		cy.get('.components-Container__container').contains(`Route not found :'(`);
	});
});
