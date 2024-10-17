describe('Catched Pokemon Page', () => {
    beforeEach(() => {
        // Mengunjungi halaman catched
        cy.visit('/mypokemon');
    });

    it('should load and display the list of caught Pokemon successfully', () => {
        // Pastikan tab "Catched" aktif secara default
        cy.get('.tab').contains('Catched').should('have.class', 'bg-sky-400');
    });

    it('should switch to History tab and display the history of caught Pokemon', () => {
        // Mengklik tab History
        cy.get('.tab').contains('History').click();

        // Memastikan tab History aktif
        cy.get('.tab').contains('History').should('have.class', 'bg-sky-400');
    });
});
