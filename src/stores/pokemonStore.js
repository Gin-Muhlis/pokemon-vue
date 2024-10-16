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
        // memunculkan loading skeleton
        isSkeleton.value = true

        // mengambil data list pokemon
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
        // menambah jumlah limit pokemon yang ditampilkan
        limit.value += 21

        // memunculkan loading skeleton
        isSkeleton.value = true

        // mengambil data lebih banyak pokemon
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