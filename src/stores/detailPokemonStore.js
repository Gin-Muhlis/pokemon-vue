import Api from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';

export const useDetailPokemonStore = defineStore("detailPokemonStore", () => {
    // inisiasi state
    const pokemonDetail = ref(false)
    const isLoading = ref(false)
    const error = ref(false)
    const tab = ref('About')
    const statusCatch = ref("throwing")
    const nickPokemon = ref("")
    const errorInputNickname = ref(false)

    // get detail pokemon
    const setDetailPokemon = async (name) => {
        isLoading.value = true

        // fetch data detail pokemon ke API
        try {
            const response = await Api.get(`/v2/pokemon/${name}`)
            pokemonDetail.value = response.data
        } catch (error) {
            error.value = "Get data pokemon failed!"
        } finally {
            isLoading.value = false
        }
    }

    // ubah value tab
    const changeTab = (value) => {
        tab.value = value
    }

    // generate is catching pokemon
    const isCatchingPokemon = (modalThrowing) => {
        // random number antara 1 dan 2
        const randomNumber = Math.floor(Math.random() * 2) + 1

        // cek apakah pokemon tertangkap
        if (randomNumber == 2) { // jika randomNumber = 1, maka pokemon tidak tertangkap dan ubah status menjading 'run'
            statusCatch.value = "catching"
        } else {  // jika randomNumber = 1, maka pokemon tertangkap dan ubah status menjading 'catching'
            statusCatch.value = "run"
            setTimeout(() => {
                modalThrowing.value.close()
            }, 2000);
        }
    }

    // tangkap pokemon
    const catchingPokemon = (pokemon) => {
        // cek jika nickname pokemon tidak diisi
        if (nickPokemon.value.trim() == "") {
            errorInputNickname.value = "Your pokemon needs a nickname!"
            return
        }

        // ambil data di local storage
        let data = localStorage.getItem("data")
        data = JSON.parse(data)

        // generate data pokemon yang ditangkap
        const dataPokemon = {
            id: uuidv4(),
            number: String(pokemon.id).padStart(4, "0"),
            name: pokemon.name,
            nickname: nickPokemon.value,
            image: pokemon.sprites.other['official-artwork'].front_default
        }

        // simpan data pokemon ke local storage
        if (data) { // ketika sudah menangkap pokemon sebelumnya
            data.catched.push(dataPokemon)
            data.history.push(dataPokemon)

            localStorage.setItem("data", JSON.stringify(data))
        } else { // ketika pertama kali menangkap pokemon
            const dataCatched = [dataPokemon]
            const dataHistory = [dataPokemon]

            data = {
                catched: dataCatched,
                history: dataHistory
            }

            localStorage.setItem("data", JSON.stringify(data))
        }

        // ubah status menjadi tertangkap
        statusCatch.value = "catched"

        // redirect ke halaman my pokemon   
        setTimeout(() => {
            window.location.href = "/mypokemon"
        }, 1000)
    }

    return {
        pokemonDetail,
        isLoading,
        error,
        setDetailPokemon,
        changeTab,
        tab,
        statusCatch,
        isCatchingPokemon,
        catchingPokemon,
        errorInputNickname,
        nickPokemon
    }
})