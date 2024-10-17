import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CardPokemon from '../CardPokemon.vue';
import { useCatchedPokemonStore } from '../../stores/catchedPokemonStore.js';
import { createPinia, setActivePinia } from 'pinia';

// Mock store Pinia
vi.mock('../stores/catchedPokemonStore.js');

// Mock RouterLink
vi.mock('vue-router', () => ({
    RouterLink: {
        template: '<a><slot /></a>'
    }
}));

describe('CardPokemon.vue', () => {
    let store;

    const dataProps = {
        id: '1',
        name: 'Pikachu',
        image: '/images/pikachu.png',
        nickname: 'Sparky',
        number: '0001',
        isDelete: false,
    }

    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
    
        // Inisialisasi mock store sebelum setiap test
        store = useCatchedPokemonStore();
        store.isCatchedPokemon = vi.fn().mockReturnValue(false);
        store.deleteCatchedPokemon = vi.fn();
    
    });
    

    // cek card apakah merender props dengan benar
    it('renders Pokemon card with props', () => {
        const wrapper = mount(CardPokemon, {
            props: dataProps,  
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>', 
                    },
                },
            },
        });

        expect(wrapper.find('.pokemon-number').text()).toBe('0001');
        expect(wrapper.find('.pokemon-name').text()).toBe('Pikachu');
        expect(wrapper.find('img.pokemon-image').attributes('src')).toBe('/images/pikachu.png');
        expect(wrapper.find('.pokemon-nickname').text()).toContain('Sparky');
    });

    // cek delete button apakah merender dengan benar
    it('shows delete button when isDelete is true', () => {
        dataProps.isDelete = true
        const wrapper = mount(CardPokemon, {
            props: dataProps,
            global: {
                stubs: {
                    RouterLink: true, // Stub untuk RouterLink
                },
            },

        });
        const deleteButton = wrapper.find('button');
        expect(deleteButton.exists()).toBe(true);
    });

    // cek apakah function deleteCatchedPokemon dipanggil ketika delete button diklik
    it('calls deleteCatchedPokemon on delete button click', async () => {
        dataProps.isDelete = true
        const wrapper = mount(CardPokemon, {
            props: dataProps,
            global: {
                stubs: {
                    RouterLink: true, // Stub untuk RouterLink
                },
            },
        });

        const deleteButton = wrapper.find('button');
        await deleteButton.trigger('click');

        expect(store.deleteCatchedPokemon).toHaveBeenCalledWith('1');
    });

    // cek apakah pokeball image ditampilkan dengan benar ketika di pokemon yang sudah ditangkap
    it('shows PokeBall image when Pokemon is catched', () => {
        // Mocking isCatchedPokemon to return true
        store.isCatchedPokemon.mockReturnValue(true);

        const wrapper = mount(CardPokemon, {
            props: dataProps,
            global: {
                stubs: {
                    RouterLink: true, // Stub untuk RouterLink
                },
            },
        });

        const pokeBallImage = wrapper.find('.pokeball-catched');
        expect(pokeBallImage.exists()).toBe(true);
    });

    // cek apakah pokeball image tidak ditampilkan ketika di pokemon yang belum ditangkap
    it('does not show PokeBall image when Pokemon is not catched', () => {
        const wrapper = mount(CardPokemon, {
            props: {
                name: 'Pikachu',
                image: '/images/pikachu.png',
                number: '025',
                isDelete: false,
            },
            global: {
                stubs: {
                    RouterLink: true, // Stub untuk RouterLink
                },
            },
        });

        const pokeBallImage = wrapper.find('img[src="/images/pokeball1.png"]');
        expect(pokeBallImage.exists()).toBe(false);
    });
});
