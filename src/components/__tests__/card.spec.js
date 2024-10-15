import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"
import Card from "../Card.vue"
import { RouterLinkStub } from "@vue/test-utils"

// Mock fungsi dari usePokemon
vi.mock("../../composables/usePokemon.js", () => ({
    usePokemon: () => ({
        handleImagePokemon: vi.fn(() => "/images/test-pokemon.png"),
        showNumberPokemon: vi.fn(() => "#0001")
    })
}))

describe("Card.vue", () => {
    const pokemonMock = {
        name: "Bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
    }

    // cek nama dan nomor pokemon apakah ditampilkan sesuai
    it("renders pokemon name and number correctly", () => {
        const wrapper = mount(Card, {
            props: {
                pokemon: pokemonMock
            }
        })

        // Memastikan nama Pokémon ditampilkan dengan benar
        const nameElement = wrapper.find(".pokemon-name")
        expect(nameElement.text()).toContain(pokemonMock.name)

        // Memastikan nomor Pokémon ditampilkan dengan benar dari showNumberPokemon
        const numberElement = wrapper.find(".pokemon-number")
        expect(numberElement.text()).toContain("#0001")
    })

    // cek gambar pokemon apakah sesuai
    it("renders pokemon image correctly", () => {
        const wrapper = mount(Card, {
            props: {
                pokemon: pokemonMock
            }
        })

        // Memastikan gambar ditampilkan dengan class animate-spin
        const imgBall = wrapper.get(".poke-ball")
        expect(imgBall.exists()).toBe(true)

        // Memastikan handleImagePokemon memanggil gambar yang benar
        const imgPokemon = wrapper.get(".pokemon-image")
        expect(imgPokemon.attributes("src")).toBe("/images/test-pokemon.png")
    })

    // cek apakah button ke halaman detail pokemon sudah benar
    it("renders the RouterLink correctly", () => {
        const wrapper = mount(Card, {
            props: {
                pokemon: pokemonMock
            },
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        // Memastikan RouterLink mengarah ke halaman detail pokemon
        const routerLink = wrapper.getComponent(RouterLinkStub)
        expect(routerLink.props("to")).toBe(`/pokemon/${pokemonMock.name}`)
    })
})