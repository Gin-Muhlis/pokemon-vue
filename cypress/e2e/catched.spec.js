describe('Catched Pokemon Page', () => {
    beforeEach(() => {
        cy.visit('/mypokemon');
    });

    it('should load and display the list of caught Pokemon successfully', () => {
        cy.get('.tab').contains('Catched').should('have.class', 'bg-sky-400');
    });

    it('should switch to History tab and display the history of caught Pokemon', () => {
        cy.get('.tab').contains('History').click();

        cy.get('.tab').contains('History').should('have.class', 'bg-sky-400');
    });
});
