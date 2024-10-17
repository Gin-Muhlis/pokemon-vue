// Navbar.spec.js
import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Navbar from "../../components/Navbar.vue";
import { createTestingPinia } from '@pinia/testing';
import { useCatchedPokemonStore } from "../../stores/catchedPokemonStore.js";
import { RouterLinkStub } from "@vue/test-utils";

describe("Navbar.vue", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Navbar, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn, // Tambahkan createSpy di sini
                    })
                ],
                stubs: {
                    RouterLink: RouterLinkStub // Stub RouterLink for testing purposes
                }
            }
        });
    });

    // cek apakah icon logo ditampilkan dengan benar   
    it("renders Pokemon icon logo with correct src", () => {
        const logo = wrapper.find("img.icon-poke");
        expect(logo.exists()).toBe(true);
        expect(logo.attributes("src")).toBe("/images/poke.png");
    });

    // cek apakah button catch ditampilkan dengan benar
    it("renders catch button with correct text", () => {
        const store = useCatchedPokemonStore();
        store.countCatched = 10; // Set initial value for testing

        wrapper.vm.$nextTick(() => {
            const catchButton = wrapper.find("button");
            expect(catchButton.exists()).toBe(true);
            expect(catchButton.text()).toContain("10 Catch");
        });
    });

    // cek apakah route benar
    it("navigates to the correct route when catch button is clicked", () => {
        const routerLinks = wrapper.findAllComponents(RouterLinkStub);
        const myPokemonLink = routerLinks.find(link => link.props().to === "/mypokemon");

        // cek link
        expect(myPokemonLink).toBeTruthy();
        expect(myPokemonLink.props().to).toBe("/mypokemon");
    });

    it("calls setCountCatchedPokemon when mounted", async () => {
        localStorage.setItem("data", JSON.stringify({
            catched: [{ id: 1, name: 'Pikachu', number: 1 }],
            history: []
        }));

        const store = useCatchedPokemonStore();
        const setCountSpy = vi.spyOn(store, "setCountCatchedPokemon");

        // Mount komponen
        const wrapper = mount(Navbar, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        });

        // Tunggu hingga promise dalam mounted selesai
        await wrapper.vm.$nextTick();

        // Pastikan spy dipanggil
        expect(setCountSpy).toHaveBeenCalled();

    });
});
