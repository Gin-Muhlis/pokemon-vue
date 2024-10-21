describe('Home Page Tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display a list of Pokemon cards', () => {
        cy.get('.card-pokemon').should('have.length.greaterThan', 0);
    });

    it('should display the Load More button', () => {
        cy.get('button').contains('Load More').should('be.visible');
    });

    it('should load more Pokemon when Load More button is clicked', () => {
        cy.get('.card-pokemon').should('have.length.greaterThan', 0);

        cy.get('.card-pokemon').its('length').then((initialLength) => {
            
            cy.get('button').contains('Load More').click();

            cy.get('.card-pokemon').should('have.length.greaterThan', initialLength);
        });
    });

    it('should go to detail pokemon when card pokemon is clicked', () => {
        cy.get('.card-pokemon').contains('bulbasaur').click()

        cy.url().should('include', '/pokemon/bulbasaur')
    })

});
