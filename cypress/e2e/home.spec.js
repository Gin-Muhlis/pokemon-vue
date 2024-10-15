describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('displays pokemon list after loading', () => {
        // Tunggu skeleton cards hilang dan daftar Pokemon muncul
        cy.get('.grid').within(() => {
            cy.get('[class*="skeleton-card"]').should('not.exist')
        })

        // Memastikan daftar Pokemon ditampilkan
        cy.get('.grid').within(() => {
            cy.get('[class*="card"]').should('have.length.greaterThan', 0)
        })
    })

    it('displays load more button and can load more pokemons', () => {
        // Memastikan tombol "Load More" muncul
        cy.get('button').contains('Load More').should('exist')

        // Klik tombol "Load More" dan pastikan lebih banyak Pokemon ditambahkan
        cy.get('button').contains('Load More').click()

        // Periksa apakah daftar Pokemon bertambah
        cy.get('.grid').within(() => {
            cy.get('[class*="card"]').should('have.length.greaterThan', 21)
        })
    })

})
