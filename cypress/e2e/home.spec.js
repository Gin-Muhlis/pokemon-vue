describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('displays pokemon list after loading', () => {
        // tunggu skeleton cards hilang dan daftar Pokemon muncul
        cy.get('.grid').within(() => {
            cy.get('[class*="skeleton-card"]').should('not.exist')
        })

        // memastikan daftar Pokemon ditampilkan
        cy.get('.grid').within(() => {
            cy.get('[class*="card"]').should('have.length.greaterThan', 0)
        })
    })

    it('displays load more button and can load more pokemons', () => {
        // memastikan tombol "Load More" muncul
        cy.get('button').contains('Load More').should('exist')

        // klik tombol "Load More" dan pastikan lebih banyak Pokemon ditambahkan
        cy.get('button').contains('Load More').click()

        // periksa apakah daftar Pokemon bertambah
        cy.get('.grid').within(() => {
            cy.get('[class*="card"]').should('have.length.greaterThan', 21)
        })
    })

})
