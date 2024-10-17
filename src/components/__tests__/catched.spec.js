import { useCatchedPokemonStore } from '../../stores/catchedPokemonStore';
import Catched from '../../views/Catched.vue'
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CardPokemon from '../CardPokemon.vue'
import { createPinia, setActivePinia } from 'pinia';
import { useCatchedPokemonStore } from '@/stores/catchedPokemonStore.js';



describe('Catched', () => {
    let store;

    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
        
        // set state
        store = useCatchedPokemonStore(pinia);
        store.listCatched = [
            { id: "1", name: 'Pikachu', image: 'pikachu.png', nickname: 'Pika', number: "0025" },
            { id: "2", name: 'Charmander', image: 'charmander.png', nickname: 'Charmy', number: "0004" },
        ];
        store.listHistory = [
            { id: "3", name: 'Bulbasaur', image: 'bulbasaur.png', nickname: 'Bulby', number: "0001" },
        ];
        store.tab = 'Catched';
    });

    // cek tab yang muncul adalah 'Catched' dan list pokemon yang muncul sudah sesuai
    it('renders the Catched tab and displays the list of caught Pokemon', async () => {
        // mount komponen
        const wrapper = mount(Catched, {
            global: {
                stubs: {
                    RouterLink: true,
                },
            },
        });

        // Memeriksa apakah tab Catched ada dan dalam keadaan aktif
        const tabCatched = wrapper.find('.tab-catched')
        expect(tabCatched.exists()).toBe(true)

        // Memeriksa apakah daftar Pokemon yang ditangkap muncul
        const cardPokemons = wrapper.findAllComponents(CardPokemon);
        expect(cardPokemons.length).toBe(2);
        expect(cardPokemons[0].props('name')).toBe('Pikachu');
        expect(cardPokemons[1].props('name')).toBe('Charmander');
    });

    // cek tab yang muncul adalah 'History' dan list histori penangkapan muncul dengan benar
    it('renders the History tab and displays the list of history Pokemon', async () => {
        // mount komponen
        const wrapper = mount(Catched, {
            global: {
                stubs: {
                    RouterLink: true,
                },
            },
        });

        const tabHistory = wrapper.find('.tab-history');
        await tabHistory.trigger('click');

        // Memeriksa apakah tab History aktif
        expect(tabHistory.classes()).toContain('bg-sky-400')

        // Memeriksa apakah daftar Pokemon history muncul
        const cardPokemons = wrapper.findAllComponents(CardPokemon);
        expect(cardPokemons.length).toBe(1);
        expect(cardPokemons[0].props('name')).toBe('Bulbasaur');
    });
});
