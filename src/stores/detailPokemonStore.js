import Api from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDetailPokemonStore = defineStore("detailPokemonStore", () => {
    // inisiasi state
    const pokemonDetail = ref(false)
    const isLoading = ref(false)
    const error = ref(false)
    const tab = ref('About')

    // get detail pokemon
    const setDetailPokemon = async (name) => {
        isLoading.value = true

        try {
            const response = await Api.get(`/v2/pokemon/${name}`)
            pokemonDetail.value = response.data
        } catch (error) {
            error.value = "Get data pokemon failed!"
        } finally {
            isLoading.value = false
        }
    }

    // ubah tab
    const changeTab = (value) => {
        tab.value = value
    }

    return {
        pokemonDetail,
        isLoading,
        error,
        setDetailPokemon,
        changeTab,
        tab
    }
})