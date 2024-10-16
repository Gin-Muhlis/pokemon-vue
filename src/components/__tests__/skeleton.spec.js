import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SkeletonCard from '../SkeletonCard.vue'

describe('SkeletonCard.vue', () => {

    // cek apakah skeleton sudah benar
    it('renders the skeleton card layout correctly', () => {
        const wrapper = mount(SkeletonCard)

        // memastikan container utama memiliki class yang sesuai
        const containerDiv = wrapper.get('div.w-full.rounded-xl.bg-white.px-8.py-3.h-32.flex.relative.items-center.justify-between.gap-1')
        expect(containerDiv.exists()).toBe(true)

        // memastikan gambar pokeball yang diatas card muncul
        const firstImage = wrapper.get('.poke-ball-top')
        expect(firstImage.exists()).toBe(true)

        // memastikan dua elemen skeleton dengan animasi pulse
        const skeletonDivs = wrapper.findAll('div.animate-pulse')
        expect(skeletonDivs.length).toBe(2)

        // memastikan gambar pokeball spin muncul
        const secondImage = wrapper.get('.poke-ball-spin')
        expect(secondImage.exists()).toBe(true)
        expect(secondImage.classes()).toContain('animate-spin')
    })
})
