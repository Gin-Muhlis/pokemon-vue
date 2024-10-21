describe('Pokemon Detail Page', () => {
    const pokemonName = 'pikachu';

    beforeEach(() => {
        cy.visit(`/pokemon/${pokemonName}`);
    });

    it('should load and display Pokemon details successfully', () => {
        
        cy.get('Alert').should('not.exist');

        cy.get('.poke-number').should('contain', '#0025');
        cy.get('h1').should('contain', 'pikachu');

        cy.get('.pokemon-image').should('have.attr', 'src').should('include', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');

        cy.get('.btn-throwing').should('exist');

        cy.get('.tab').contains('About').should('have.class', 'bg-sky-400 shadow-lg');
    });

    it('should load about when tab About is clicked', () => {
        cy.get('.tab').contains('About').click()

        cy.get('.about').should('exist')
        cy.get('.tab').contains('About').should('have.class', 'bg-sky-400 shadow-lg');
    })

    it('should load stats when tab Stats is clicked', () => {
        cy.get('.tab').contains('Stats').click()

        cy.get('.stats').should('exist')
        cy.get('.tab').contains('Stats').should('have.class', 'bg-sky-400 shadow-lg');
    })

    it('should load moves when tab Moves is clicked', () => {
        cy.get('.tab').contains('Moves').click()

        cy.get('.moves').should('exist')
        cy.get('.tab').contains('Moves').should('have.class', 'bg-sky-400 shadow-lg');
    })
});
