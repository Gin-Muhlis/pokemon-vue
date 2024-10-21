import Catched from "@/views/Catched.vue";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { describe, beforeEach, it, expect } from "vitest";
import CardPokemon from "../card-pokemon.vue";

describe('Catched.vue', () => {
    let dummyData;

    const tabs = [
        {title: 'Tab Catched', tabClass: '.tab-catched', targetClass: '.list-catched'},
        {title: 'Tab History', tabClass: '.tab-history', targetClass: '.list-history'}
    ]

    function mountComponent() {
        return mount(Catched, {
            global: {
                stubs: {
                    RouterLink: true
                }
            }
        })
    }

    beforeEach(() => {
        setActivePinia(createPinia())

        dummyData = [
            {
                id: '25-pika',
                image: 'pikachu.png',
                name: 'pikachu',
                nickname: 'pikapoke',
                number: '0025'
            },
            {
                id: '1-bul',
                image: 'bulbasaur.png',
                name: 'bulbasaur',
                nickname: 'bulbasaur',
                number: '0001'
            }
        ]

        localStorage.setItem('data', JSON.stringify({catched: dummyData, history: dummyData}))
    })

    // cek tab
    it('render tabs correctly with text Catched and History', () => {
        const wrapper = mountComponent()
        const tabs = wrapper.find('.tabs')

        const listTab = tabs.findAll('.tab')

        expectShowTabs(listTab)
    })

    
    // cek konten tab
    it.each(tabs)('render the right content when tab is clicked $title', async ({tabClass, targetClass}) => {
        const wrapper = mountComponent()

        const tab = wrapper.find(tabClass)

        await tab.trigger('click')

        expectShowTabContent(wrapper, targetClass)
    })

    // delete data catched
    it('should delete data catched when delete button is clicked', async () => {
        const wrapper = mountComponent()

        await wrapper.vm.$nextTick()

        const cardsPokemon = wrapper.findAllComponents(CardPokemon)

        let expectedLength = dummyData.length
        expectLengthPokemon(cardsPokemon, expectedLength)

        await cardsPokemon[0].find('.btn-delete').trigger('click')

        const newCardsPokemon = wrapper.findAllComponents(CardPokemon)

        expectedLength = dummyData.length - 1
        expectLengthPokemon(newCardsPokemon, expectedLength)
    })

    // expect
    function expectShowTabs(listTab) {
        expect(listTab[0].text()).contain('Catched')
        expect(listTab[1].text()).contain('History')
    }

    function expectShowTabContent(wrapper, targetClass) {
        const targetData = wrapper.find(targetClass)
        expect(targetData.exists()).toBe(true)

        const cardsPokemon = wrapper.findComponent(CardPokemon)
        expect(cardsPokemon.exists()).toBe(true)
    }

    function expectLengthPokemon(cardPokemons, length) {
        expect(cardPokemons.length).toBe(length)
    }
})