import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Loading from '../Loading.vue'

describe('Loading.vue', () => {

    // cek apakah loading sudah tampil dengan benar
    it('renders loading spinner and text correctly', () => {
        const wrapper = mount(Loading)

        // Memastikan div container dengan class yang benar
        const containerDiv = wrapper.get('.loading-com')
        expect(containerDiv.exists()).toBe(true)

        // Memastikan gambar ditampilkan dengan class animate-spin
        const img = wrapper.get('.poke-ball')
        expect(img.exists()).toBe(true)
        expect(img.classes()).toContain('animate-spin')

        // Memastikan teks "Loading" ditampilkan
        const span = wrapper.get('span')
        expect(span.text()).toBe('Loading')
    })
})
