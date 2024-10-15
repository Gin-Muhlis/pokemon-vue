import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Navbar from "../Navbar.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("Navbar.vue", () => {
    // cek apakah merender logo dan link ke halaman home
    it("should render the logo image and link to home page", () => {
        const wrapper = mount(Navbar, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        });

        // cek apakah properti src sesuai
        const pokeIconImage = wrapper.find(".icon-poke")
        expect(pokeIconImage.exists()).toBe(true)
        expect(pokeIconImage.attributes("src")).toBe("/images/poke.png")

        // cek apakah router link mengarah ke home page '/'
        const routerLink = wrapper.findComponent(RouterLinkStub)
        expect(routerLink.props().to).toBe("/")
    })

    // cek apakah button ke halaman catch sudah benar
    it("Should render the catch button with correct text and image", () => {
        const wrapper = mount(Navbar)

        // cek apakah teks button sudah benar
        const button = wrapper.find("button")
        expect(button.exists()).toBe(true)
        expect(button.text()).toContain("0 Catch")

        // cek apakah gambar pokeball sudah benar
        const pokeballIconImage = wrapper.find(".icon-pokeball")
        expect(pokeballIconImage.exists()).toBe(true)
        expect(pokeballIconImage.attributes("src")).toBe("/images/pokeball2.png")
    })
})