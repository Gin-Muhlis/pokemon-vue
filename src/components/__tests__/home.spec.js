import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { flushPromises, mount, RouterLinkStub } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import DetailPokemon from '@/views/DetailPokemon.vue'
import CardPokemon from '../card-pokemon.vue'
import SkeletonCard from '../home/skeleton-card.vue'
import Alert from '../alert.vue'
import { createPinia, setActivePinia } from 'pinia'
import { getPokemonList } from '@/api/pokemon.api.js';
import { createRouter, createWebHistory } from 'vue-router';

vi.mock('@/api/pokemon.api.js')

describe('Home.vue', () => {
    const pokemonMockData = {
        data: {
            results: [
                { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            ]
        }
    }

    function mountComponent() {
        return mount(Home, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });
    }

    beforeEach(() => {
        setActivePinia(createPinia())

        getPokemonList.mockResolvedValue(pokemonMockData)
    });

    afterEach(() => {
        vi.resetAllMocks()
    })

    // cek error message ketika terjadi error
    it('renders error message when error is present', async () => {
        getPokemonList.mockRejectedValueOnce(new Error('API Error'))

        const wrapper = mountComponent()

        await flushPromises()

        expectAlertMessageShow(wrapper)
    });

    // cek skeleton
    it('renders skeleton when when status is loading', async () => {
        getPokemonList.mockImplementation(() => new Promise(() => { }))

        const wrapper = mountComponent()

        expectSkeletonLoadingShow(wrapper)
    })

    // cek pokemon card
    it('renders pokemon card when loading is done', async () => {

        const wrapper = mountComponent()

        await flushPromises()

        expectListPokemonShow(wrapper)
    })

    // cek load more pokemon
    it('should renders more pokemon when button Load More is clicked', async () => {
        const wrapper = mountComponent()

        await flushPromises()

        expectLengthListPokemon(wrapper, pokemonMockData.data.results.length)

        let finalLengthCard = 4
        await wrapper.find('.btn-loadmore').trigger('click')

        expectLengthListPokemon(wrapper, finalLengthCard)
    })

    // navigate ketika card di klik ke detail pokemon
    it('should navigate to detail pokemon when card pokemon is clicked', async () => {

        const wrapper = mountComponent()

        await flushPromises()

        expectLinkToDetailPokemon(wrapper)
    })

    // expect function
    function expectAlertMessageShow(wrapper) {
        expect(wrapper.findComponent(Alert).exists()).toBe(true);
        expect(wrapper.findComponent(Alert).props('message')).toBe('Get pokemon failed');
    }

    function expectSkeletonLoadingShow(wrapper) {
        expect(wrapper.findComponent(SkeletonCard).exists()).toBe(true)
    }

    function expectListPokemonShow(wrapper) {
        expect(wrapper.findComponent(CardPokemon).exists()).toBe(true)
        expect(wrapper.findAllComponents(CardPokemon).length).toBe(pokemonMockData.data.results.length)
    }

    function expectLengthListPokemon(wrapper, length) {
        expect(wrapper.findAllComponents(CardPokemon).length).toBe(length)
    }

    function expectLinkToDetailPokemon(wrapper) {
        const cardPokemon = wrapper.findComponent(CardPokemon)

        const linkDetail = cardPokemon.findComponent(RouterLinkStub)

        expect(cardPokemon.exists()).toBe(true)
        expect(linkDetail.props().to).toBe('/pokemon/pikachu')
    }
});
