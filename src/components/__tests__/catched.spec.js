import Catched from "@/views/Catched.vue";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { describe, beforeEach, it, expect } from "vitest";
import CardPokemon from "../card-pokemon.vue";

describe('Catched.vue', () => {
    let dummyData;

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
        const wrapper = mount(Catched, {
            global: {
                stubs: {
                    RouterLink: true
                }
            }
        })
        const tabs = wrapper.find('.tabs')
        expect(tabs.exists()).toBe(true)

        const listTab = tabs.findAll('.tab')
        expect(listTab[0].text()).contain('Catched')
        expect(listTab[1].text()).contain('History')
    })

    // cek konten tab
    it('render the right content when tab is clicked', async () => {
        const wrapper = mount(Catched, {
            global: {
                stubs: {
                    RouterLink: true
                }
            }
        })

        const tabCatched = wrapper.find('.tab-catched')

        await tabCatched.trigger('click')

        await wrapper.vm.$nextTick()
        

        const listCatched = wrapper.find('.list-catched')
        expect(listCatched.exists()).toBe(true)

        const tabHistory = wrapper.find('.tab-history')

        await tabHistory.trigger('click')

        await wrapper.vm.$nextTick()
        const listHistory = wrapper.find('.list-history')
        
        expect(listHistory.exists()).toBe(true)
    })

    // delete data catched
    it('should delete data catched when delete button is clicked', async () => {
        const wrapper = mount(Catched, {
            global: {
                stubs: {
                    RouterLink: true
                }
            }
        })

        await wrapper.vm.$nextTick()

        const cardsPokemon = wrapper.findAllComponents(CardPokemon)

        expect(cardsPokemon.length).toBe(dummyData.length)

        await cardsPokemon[0].find('.btn-delete').trigger('click')

        await wrapper.vm.$nextTick()

        expect(wrapper.findAllComponents(CardPokemon).length).toBe(dummyData.length - 1)
    })
})