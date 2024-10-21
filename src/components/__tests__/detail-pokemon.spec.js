import { getDetailPokemon } from "@/api/pokemon.api"
import DetailPokemon from "@/views/DetailPokemon.vue"
import { mount, RouterLinkStub } from "@vue/test-utils"
import { setActivePinia, createPinia } from "pinia"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import Alert from "../alert.vue"
import Loading from "../loading.vue"
import { dummyPokemonData } from "./detail-pokemon.setup"
import Data from "../detail-pokemon/data.vue"
import Sprite from "../detail-pokemon/sprite.vue"
import About from "../detail-pokemon/about.vue"
import Stats from "../detail-pokemon/stats.vue"
import Moves from "../detail-pokemon/moves.vue"
import { generateRandNumber } from "@/helpers/pokemon"

vi.mock('vue-router', () => ({
    useRoute: () => ({
        params: { name: 'pikachu' }
    })
}))

vi.mock('@/api/pokemon.api.js', () => ({
    getDetailPokemon: vi.fn()
}))

vi.mock('@/helpers/pokemon.js', async () => {
    const actual = await vi.importActual('@/helpers/pokemon.js')
    return {
        ...actual,
        generateRandNumber: vi.fn()
    }
})

describe('DetailPokemon.vue', () => {
    const mockingData = dummyPokemonData

    beforeEach(() => {
        setActivePinia(createPinia())

        vi.useFakeTimers()

        HTMLDialogElement.prototype.showModal = vi.fn()
        HTMLDialogElement.prototype.close = vi.fn()
    })

    afterEach(() => {
        vi.resetAllMocks()
        vi.clearAllTimers()
        vi.useRealTimers()
    })

    // cek error
    it('renders error message when error is present', async () => {
        getDetailPokemon.mockRejectedValueOnce(new Error('API Error'))

        const wrapper = mount(DetailPokemon, {
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

    // cek loading
    it('renders loading while getting the data', async () => {
        getDetailPokemon.mockImplementation(() => new Promise(() => { }))

        const wrapper = mount(DetailPokemon, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });

        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent(Loading).exists()).toBe(true)
    })

    // cek data
    it('renders pokemon and detail data pokemon when it ready', async () => {
        getDetailPokemon.mockResolvedValueOnce(mockingData)

        const wrapper = mount(DetailPokemon, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });

        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent(Sprite).exists()).toBe(true)
        expect(wrapper.findComponent(Data).exists()).toBe(true)
    })

    // cek tab detail pokemon
    it('renders the right content based on tab', async () => {
        getDetailPokemon.mockResolvedValueOnce(mockingData)

        const wrapper = mount(DetailPokemon, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });

        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const dataPokemon = wrapper.findComponent(Data)
        expect(dataPokemon.exists()).toBe(true)

        const tabAbout = dataPokemon.find('.tab-About')

        await tabAbout.trigger('click')

        await wrapper.vm.$nextTick()

        const dataAbout = wrapper.findComponent(About)
        expect(dataAbout.exists()).toBe(true)

        const tabStats = dataPokemon.find('.tab-Stats')

        await tabStats.trigger('click')

        await wrapper.vm.$nextTick()

        const dataStats = wrapper.findComponent(Stats)
        expect(dataStats.exists()).toBe(true)

        const tabMoves = dataPokemon.find('.tab-Moves')

        await tabMoves.trigger('click')

        await wrapper.vm.$nextTick()

        const dataMoves = wrapper.findComponent(Moves)
        expect(dataMoves.exists()).toBe(true)
    })

    // cek pesan pokemon lari ketika melempar poke ball
    it('render message when pokemon is run', async () => {
        getDetailPokemon.mockResolvedValueOnce(mockingData)

        generateRandNumber.mockReturnValue(1)
        
        const wrapper = mount(DetailPokemon, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });

        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const sprite = wrapper.findComponent(Sprite)
        expect(sprite.exists()).toBe(true)

        const buttonPokeBall = sprite.find('.btn-poke-ball')

        await buttonPokeBall.trigger('click')
        
        vi.advanceTimersByTime(2000)

        await wrapper.vm.$nextTick();
        
        const runMessage = document.querySelector('.run-message')
        
        expect(runMessage).not.toBeNull()
    })

    // cek form tangkap pokemon ketika melempar poke ball dan berhasil
    it('renders form catch pokemon when pokemon is catched', async () => {
        getDetailPokemon.mockResolvedValueOnce(mockingData)

        generateRandNumber.mockReturnValue(2)
        
        const wrapper = mount(DetailPokemon, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });

        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        const sprite = wrapper.findComponent(Sprite)
        expect(sprite.exists()).toBe(true)

        const buttonPokeBall = sprite.find('.btn-poke-ball')

        await buttonPokeBall.trigger('click')
        vi.advanceTimersByTime(2000)

        await wrapper.vm.$nextTick();
        
        const runMessage = document.querySelector('.form-catch')
        
        expect(runMessage).not.toBeNull()
    })
})