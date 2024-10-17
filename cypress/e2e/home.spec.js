describe('Home Page Tests', () => {
    beforeEach(() => {
        // Mengunjungi halaman home
        cy.visit('/');
    });

    // cek list pokemon sudah muncul dengan benar
    it('should display a list of Pokemon cards', () => {
        cy.get('.card-pokemon').should('have.length.greaterThan', 0);
    });

    // cek tombol 'Load More' muncul
    it('should display the Load More button', () => {
        // Cek apakah tombol 'Load More' ada di halaman
        cy.get('button').contains('Load More').should('be.visible');
    });

    // cek tombol apakah list pokemon bertambah atau tidak ketika button 'Load More' diklik
    it.only('should load more Pokemon when Load More button is clicked', () => {
        // Tunggu hingga Pokemon pertama kali muncul
        cy.get('.card-pokemon').should('have.length.greaterThan', 0);

        // Dapatkan jumlah Pokemon yang ada sebelum tombol 'Load More' diklik
        cy.get('.card-pokemon').its('length').then((initialLength) => {
            // Klik tombol 'Load More'
            cy.get('button').contains('Load More').click();

            // Cek apakah lebih banyak Pokemon ditambahkan setelah klik tombol 'Load More'
            cy.get('.card-pokemon').should('have.length.greaterThan', initialLength);
        });
    });

});
