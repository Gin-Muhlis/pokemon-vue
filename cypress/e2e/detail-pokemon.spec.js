describe('Pokemon Detail Page', () => {
    const pokemonName = 'pikachu'; // Ganti dengan nama Pokemon yang sesuai untuk test

    beforeEach(() => {
        // Mengunjungi halaman detail Pokemon
        cy.visit(`/pokemon/${pokemonName}`);
    });

    it('should load and display Pokemon details successfully', () => {
        // cek tidak ada error
        cy.get('Alert').should('not.exist');

        // cek data Pokemon ditampilkan
        cy.get('.poke-number').should('contain', '#0025');
        cy.get('h1').should('contain', 'Pikachu');

        // cek gambar Pokemon ditampilkan
        cy.get('.pokemon-image').should('have.attr', 'src').should('include', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');

        // cek tombol untuk menangkap Pokemon muncul
        cy.get('.btn-throwing').should('exist');

        // cek tab "About" muncul secara default
        cy.get('.tab').contains('About').should('have.class', 'bg-sky-400 shadow-lg');
    });
});
