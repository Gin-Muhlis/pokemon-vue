import Api from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePokemonStore = defineStore("pokemonStore", () => {
    // inisiasi state
    const pokemonList = ref([])
    const isSkeleton = ref(false)
    const error = ref(false)
    const limit = ref(21)
    const skeletonCount = ref(21)

    // fetch api pokemon
    async function fetchData() {
        const response = await Api.get(`/v2/pokemon?limit=${limit.value}`)

        pokemonList.value = response.data.results

    }

    // set inisiasi list pokemon
    function setPokemonList() {
        isSkeleton.value = true
        try {
            fetchData()
        } catch (error) {
            error.value = "Get data pokemon failed!"
        } finally {
            isSkeleton.value = false
        }
    }

    // set pokemon lebih banyak
    const setMorePokemonList = () => {
        limit.value += 21

        isSkeleton.value = true

        try {
            fetchData()
        } catch (error) {
            error.value = "Get data pokemon failed!"
        } finally {
            isSkeleton.value = false
            skeletonCount.value += 21
        }
    }

    return {
        pokemonList,
        error,
        setPokemonList,
        setMorePokemonList,
        limit,
        skeletonCount,
        isSkeleton,
    }
})