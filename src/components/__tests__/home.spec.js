import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils'
import Home from '../../views/Home.vue'
import CardPokemon from '../CardPokemon.vue'
import SkeletonCard from '../SkeletonCard.vue'
import Alert from '../Alert.vue'
import { createPinia, setActivePinia } from 'pinia'
import { usePokemonStore } from '../../stores/pokemonStore'

describe('Home.vue', () => {
    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
    });

    // cek error message ketika terjadi error
    it('renders error message when error is present', async () => {
        const pokemonStore = usePokemonStore();
        pokemonStore.error = 'An error occurred';

        // moun komponen
        const wrapper = mount(Home, {
            global: {
                stubs: {
                    RouterLink: true,
                },
            },
        });

        // cek apakah error muncul
        expect(wrapper.findComponent(Alert).exists()).toBe(true);
        expect(wrapper.findComponent(Alert).props('message')).toBe('An error occurred');
    });

    // cek loading skeleton
    it('renders skeleton loading state when isSkeleton is true', async () => {
        const pokemonStore = usePokemonStore();
        pokemonStore.isSkeleton = true; 
        pokemonStore.skeletonCount = 3; 

        // mount komponen
        const wrapper = mount(Home, {
            global: {
                stubs: {
                    RouterLink: true,
                },
            },
        });

        // cek jumlah skeleon sesuai dengan state
        const skeletonCards = wrapper.findAllComponents(SkeletonCard);
        expect(skeletonCards.length).toBe(3);
    });

    // cek list skeleton
    it('renders list of pokemons when isSkeleton is false and no error', async () => {
        const pokemonStore = usePokemonStore();
        pokemonStore.isSkeleton = false; // Disable skeleton
        pokemonStore.pokemonList = [
            { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
            { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ];

        // mount
        const wrapper = mount(Home, {
            global: {
                stubs: {
                    RouterLink: true,
                },
            },
        });

        // Cek  komponen CardPokemon
        const cardPokemons = wrapper.findAllComponents(CardPokemon);
        expect(cardPokemons.length).toBe(2);
        expect(cardPokemons[0].props('name')).toBe('Pikachu');
        expect(cardPokemons[1].props('name')).toBe('Bulbasaur');
    });

    // cek button load more
    it('calls setMorePokemonList when "Load More" button is clicked', async () => {
        const store = usePokemonStore();
        const spy = vi.spyOn(store, "setMorePokemonList");

        // mount komponen
        const wrapper = mount(Home, {
            global: {
                stubs: {
                    RouterLink: true,
                },
            },
        });

        // cek button load more
        const loadMoreButton = wrapper.find('button');
        await loadMoreButton.trigger('click');
        expect(spy).toHaveBeenCalled();
    });
});
