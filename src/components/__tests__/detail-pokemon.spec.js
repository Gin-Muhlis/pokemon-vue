import { getDetailPokemon } from "@/api/pokemon.api"
import DetailPokemon from "@/views/DetailPokemon.vue"
import { flushPromises, mount, RouterLinkStub } from "@vue/test-utils"
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
import { usePokemonStore } from "@/stores/pokemon"
import Throwing from "../detail-pokemon/throwing.vue"
import { handleModal } from "@/helpers/modal"


vi.mock('vue-router', () => ({
    useRoute: () => ({
        params: { name: 'pikachu' }
    })
}))

vi.mock('@/api/pokemon.api.js', () => ({
    getDetailPokemon: vi.fn()
}))

vi.mock('@/helpers/time.js')
vi.mock('@/helpers/modal.js')

vi.mock('@/helpers/pokemon.js')

describe('DetailPokemon.vue', () => {
    const mockingData = dummyPokemonData

    const tabs = [
        { title: 'Tab About', className: '.tab-About', component: About },
        { title: 'Tab Stats', className: '.tab-Stats', component: Stats },
        { title: 'Tab Moves', className: '.tab-Moves', component: Moves },
    ]

    const listStatusCatch = [
        { title: 'Pokemon run', valueNumber: 1, className: '.run-message' },
        { title: 'Pokemon catched', valueNumber: 2, className: '.form-catch' }
    ]

    function mountComponent() {
        return mount(DetailPokemon, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                }
            },
        });
    }


    beforeEach(() => {
        setActivePinia(createPinia())

        getDetailPokemon.mockResolvedValue(mockingData)

        vi.clearAllMocks()
    })

    // cek error
    it('renders error message when error is present', async () => {
        getDetailPokemon.mockRejectedValueOnce(new Error('API Error'))

        const wrapper = mountComponent()

        await flushPromises()

        expectAlertMessageShow(wrapper)
    });

    // cek loading
    it('renders loading while getting the data', async () => {
        getDetailPokemon.mockImplementation(() => new Promise(() => { }))

        const wrapper = mountComponent()

        expectLoadingShow(wrapper)
    })

    // cek data
    it('renders pokemon and detail data pokemon when it ready', async () => {
        const wrapper = mountComponent()

        await flushPromises()

        expectPokemonDataShow(wrapper)
    })

    // cek tab detail pokemon
    it.each(tabs)('renders the right content based on tab $title', async ({ className, component }) => {
        const wrapper = mountComponent()

        await flushPromises()

        await clickTabButton(wrapper, className)

        expectTabContentShow(wrapper, component)
    })

    // cek ketika throw poke ball
    it.each(listStatusCatch)('render content when pokemon throw poke ball $title', async ({ valueNumber, className }) => {
        generateRandNumber.mockReturnValueOnce(valueNumber)

        const wrapper = mountComponent()

        await flushPromises()

        await throwPokeBall(wrapper)

        expectContentStatus(className)
    })

    // cek close modal
    it('close modal when releasing pokemon', async () => {
        const wrapper = await catchingPokemon()

        const modalComponent = wrapper.findComponent(Throwing)
        const btnRelease = modalComponent.find('.btn-release')

        await btnRelease.trigger('click')

        expectCloseFormCatch()
    })

    // cek error input
    it('show error message when the input is not filled in', async () => {
        const wrapper = await catchingPokemon()

        const modalComponent = wrapper.findComponent(Throwing)
        
        await clickCatchPokemon(modalComponent)
        
        const errorMessage = modalComponent.find('.error-nickname-message')
        
        expectShowErrorInputMessage(errorMessage)
    })

    // cek sukses message
    it('show success message when successfully catch a pokemon', async () => {
        const wrapper = await catchingPokemon()

        let modalComponent = wrapper.findComponent(Throwing)

        const inputNickname = modalComponent.find('.input-nickname')

        inputNickname.setValue('pikapoke')

        await clickCatchPokemon(modalComponent)

        const successMessage = modalComponent.find('.success-catch-message')
        
        expectShowSuccessMessage(successMessage)

    })

    // expect function
    function expectAlertMessageShow(wrapper) {
        expect(wrapper.findComponent(Alert).exists()).toBe(true);
        expect(wrapper.findComponent(Alert).props('message')).toBe('Get pokemon failed');
    }

    function expectLoadingShow(wrapper) {
        expect(wrapper.findComponent(Loading).exists()).toBe(true)
    }

    function expectPokemonDataShow(wrapper) {
        expect(wrapper.findComponent(Sprite).exists()).toBe(true)
        expect(wrapper.findComponent(Data).exists()).toBe(true)
    }

    async function expectTabContentShow(wrapper, component) {
        const data = wrapper.findComponent(component)
        expect(data.exists()).toBe(true)
    }


    function expectContentStatus(className) {
        const message = document.querySelector(className)

        expect(message).not.toBeNull()
    }

    function expectShowErrorInputMessage(componentError) {
        expect(componentError).not.toBe(null)
    }

    function expectShowSuccessMessage(componentSuccess) {
        
        expect(componentSuccess).not.toBe(null)
    }

    // aksi
    async function clickTabButton(wrapper, className) {
        const dataPokemon = wrapper.findComponent(Data)

        const tab = dataPokemon.find(className)

        await tab.trigger('click')

        await wrapper.vm.$nextTick()
    }

    async function throwPokeBall(wrapper) {
        const sprite = wrapper.findComponent(Sprite)
        const buttonPokeBall = sprite.find('.btn-poke-ball')

        await buttonPokeBall.trigger('click')
    }

    function expectCloseFormCatch() {
        expect(handleModal).toHaveBeenLastCalledWith('throwing-modal', 'close')
    }

    async function catchingPokemon() {
        generateRandNumber.mockReturnValueOnce(2)

        const wrapper = mountComponent()

        await flushPromises()

        await throwPokeBall(wrapper)

        return wrapper
    }

    async function clickCatchPokemon(modalComponent) {
        const catchButton = modalComponent.find('.btn-catch')

        await catchButton.trigger('click')
    }
})