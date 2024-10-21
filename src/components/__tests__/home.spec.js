import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import DetailPokemon from '@/views/DetailPokemon.vue'
import CardPokemon from '../card-pokemon.vue'
import SkeletonCard from '../home/skeleton-card.vue'
import Alert from '../alert.vue'
import { createPinia, setActivePinia } from 'pinia'
import { usePokemonStore } from '@/stores/pokemon.js'
import { getPokemonList } from '@/api/pokemon.api.js';
import { createRouter, createWebHistory } from 'vue-router';

// const routes = [
//     { path: '/pokemon/:name', component: DetailPokemon }
// ]

// const router = createRouter({
//     history: createWebHistory(),
//     routes
// })

vi.mock('@/api/pokemon.api.js', () => ({
    getPokemonList: vi.fn()
}))

describe('Home.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    });

    afterEach(() => {
        vi.resetAllMocks()
    })


    // cek error message ketika terjadi error
    it('renders error message when error is present', async () => {
        getPokemonList.mockRejectedValueOnce(new Error('API Error'))

        const wrapper = mount(Home, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });

        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent(Alert).exists()).toBe(true);
        expect(wrapper.findComponent(Alert).props('message')).toBe('Get pokemon failed');
    });

    // cek skeleton
    it('renders skeleton when when status is loading', async () => {
        getPokemonList.mockImplementation(() => new Promise(() => { }))

        const wrapper = mount(Home, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });

        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent(SkeletonCard).exists()).toBe(true)
    })

    // cek pokemon card
    it('renders pokemon card when loading is done', async () => {
        const pokemonMockData = {
            data: {
                results: [
                    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
                    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                ]
            }
        }

        getPokemonList.mockResolvedValueOnce(pokemonMockData)

        const wrapper = mount(Home, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });

        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent(CardPokemon).exists()).toBe(true)
        expect(wrapper.findAllComponents(CardPokemon).length).toBe(pokemonMockData.data.results.length)
    })

    // cek load more pokemon
    it('should renders more pokemon when button Load More is clicked', async () => {
        const initialPokemonMockData = {
            data: {
                results: [
                    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
                    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
                ]
            }
        }

        const morePokemonMockData = {
            data: {
                results: [
                    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
                    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
                ]
            }
        }

        getPokemonList.mockResolvedValueOnce(initialPokemonMockData)

        const wrapper = mount(Home, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });

        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        expect(wrapper.findAllComponents(CardPokemon).length).toBe(initialPokemonMockData.data.results.length)

        getPokemonList.mockResolvedValueOnce(morePokemonMockData)

        let finalLengthCard = initialPokemonMockData.data.results.length + morePokemonMockData.data.results.length
        await wrapper.find('.btn-loadmore').trigger('click')

        expect(wrapper.findAllComponents(CardPokemon).length).toBe(finalLengthCard)
    })

    // navigate ketika card di klik ke detail pokemon
    it('should navigate to detail pokemon when card pokemon is clicked', async () => {
        const initialPokemonMockData = {
            data: {
                results: [
                    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
                ]
            }
        }

        getPokemonList.mockResolvedValueOnce(initialPokemonMockData)

        const wrapper = mount(Home, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });

        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const cardPokemon = wrapper.findComponent(CardPokemon)
        expect(cardPokemon.exists()).toBe(true)

        const linkDetail = cardPokemon.findComponent(RouterLinkStub)
        expect(linkDetail.props().to).toBe('/pokemon/pikachu')
        


        // await linkDetail.trigger('click')

        // await router.isReady()
        // await wrapper.vm.$nextTick()

        // expect(wrapper.vm.$router.currentRoute.value.fullPath).toBe('/pokemon/pikachu')
    })
});
