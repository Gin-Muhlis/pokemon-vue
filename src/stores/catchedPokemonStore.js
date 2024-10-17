import { defineStore } from "pinia"
import { ref } from "vue"

export const useCatchedPokemonStore = defineStore("catchedPokemonStore", () => {
    // inisiasi state
    const listCatched = ref([])
    const listHistory = ref([])
    const countCatched = ref(0)
    const isLoading = ref(false)
    const error = ref(false)
    const tab = ref('Catched')

    // get data list pokemon yang ditangkap dari local storage
    const setListCatchedPokemon = () => {
        isLoading.value = true

        try {
            let data = localStorage.getItem("data")

            if (data) {
                data = JSON.parse(data)

                listCatched.value = data.catched
                listHistory.value = data.history

            }
        } catch (error) {
            error.value = "Get data pokemon failed!"
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    // set jumlah bilangan pokemon yang telah ditangkap
    const setCountCatchedPokemon = () => {
        let data = localStorage.getItem("data")

        try {
            if (data) {
                data = JSON.parse(data)

                countCatched.value = data.catched.length

            }
        } catch (error) {
            error.value = "Get data pokemon failed!"
            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

    // ubah value tab
    const changeTab = (value) => {
        tab.value = value
    }

    // delete pokemon
    const deleteCatchedPokemon = (id) => {
        let data = localStorage.getItem("data")
        console.log('delete')
        if (data) {
            data = JSON.parse(data)

            data.catched = data.catched.filter((pokemon) => pokemon.id != id)

            localStorage.setItem("data", JSON.stringify(data))
            listCatched.value = listCatched.value.filter(pokemon => pokemon.id != id)
        }
    }

    // cek apakah pokemon telah ditangkap
    const isCatchedPokemon = (numberPokemon) => {
        let data = localStorage.getItem("data")
        try {
            if (data) {
                data = JSON.parse(data)

                const indexPokemon = data.catched.findIndex(pokemon => pokemon.number == numberPokemon)

                if (indexPokemon > -1) {
                    return true
                } else {
                    return false
                }
            }
            return false
        } catch (err) {
            console.error(err)
        } finally {
            isLoading.value = false
        }
    }

    return {
        listCatched,
        listHistory,
        countCatched,
        isLoading,
        error,
        setListCatchedPokemon,
        tab,
        changeTab,
        deleteCatchedPokemon,
        setCountCatchedPokemon,
        isCatchedPokemon
    }
})