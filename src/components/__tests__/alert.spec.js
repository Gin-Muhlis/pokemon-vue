import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Alert from "../Alert.vue";

describe("Alert.vue", () => {
    // cek apakah pesan error ditampilkan dengan benar
    it ("renders message prop correctly", () => {
        const message = "Something went wrong"
        const wrapper = mount(Alert, {
            props: {
                message
            }
        })

        expect(wrapper.text()).toBe(message)
    })

    // cek struktur alert apakah sudah benar
    it('renders the alert structure correctly', () => {
        const message = 'Error occurred'
        const wrapper = mount(Alert, {
          props: {
            message
          }
        })
    
        // Memastikan elemen role alert ada
        const alertDiv = wrapper.get('div[role="alert"]')
        expect(alertDiv.exists()).toBe(true)
    
        // Memastikan ada svg dengan class yang tepat
        const svg = wrapper.get('svg.h-6.w-6.shrink-0.stroke-current')
        expect(svg.exists()).toBe(true)
    
        // Memastikan teks pesan ada di dalam span
        const span = wrapper.get('span')
        expect(span.text()).toBe(message)
      })
})