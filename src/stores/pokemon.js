import { defineStore } from "pinia";
import { getPokemonList, getDetailPokemon } from "@/api/pokemon.api";
import { reactive, ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
export const usePokemonStore = defineStore('pokemon', () => {
    // inisiasi state
    const pokemonList = ref([])
    const filter = reactive({ limit: 21, offset: 0 })
    const statusGetListData = ref('loading')
    const statusGetDetailData = ref('loading')
    const isLoadMore = ref(false)
    const pokemonDetail = ref(false)
    const tabDetailPokemon = ref('About')
    const tabCatchPokemon = ref('Catched')
    const statusCatch = ref("throwing")
    const nickPokemon = ref("")
    const errorInputNickname = ref(false)
    const listCatched = ref([])
    const listHistory = ref([])
    const countCatched = ref(0)

    // set inisiasi list pokemon
    async function setPokemonList() {
        // memunculkan loading skeleton
        statusGetListData.value = 'loading'

        // mengambil data list pokemon
        try {
            const response = await getPokemonList(filter)

            pokemonList.value = response.data.results
            statusGetListData.value = "success"
        } catch (error) {
            statusGetListData.value = "error"
        }
    }

    // set pokemon lebih banyak
    async function setMorePokemonList() {
        // menambah jumlah limit pokemon yang ditampilkan
        filter.offset += 21

        // memunculkan loading skeleton
        isLoadMore.value = true

        // mengambil data lebih banyak pokemon
        try {
            const response = await getPokemonList(filter)

            pokemonList.value.push(...response.data.results.map(pokemon => ({ ...pokemon })));


        } catch (error) {
            alert('Get more data failed')
        } finally {
            isLoadMore.value = false
        }
    }



    // get detail pokemon
    async function setDetailPokemon(name) {
        statusGetDetailData.value = 'loading'

        // fetch data detail pokemon ke API
        try {
            const response = await getDetailPokemon(name)
            pokemonDetail.value = response.data
            console.log(response.data)
            statusGetDetailData.value = "success"
        } catch (error) {
            statusGetDetailData.value = "error"
        }
    }

    // tangkap pokemon
    function catchPokemon(pokemon) {
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
        } else { // ketika pertama kali menangkap pokemon
            data = {
                catched: [dataPokemon],
                history: [dataPokemon]
            }

        }
        localStorage.setItem("data", JSON.stringify(data))

        // ubah status menjadi tertangkap
        statusCatch.value = "catched"
        countCatched.value += 1
        nickPokemon.value = ''
    }


    // get data list pokemon yang ditangkap dari local storage
    function setListCatchedPokemon() {
        let data = localStorage.getItem("data")

        if (!data) return

        data = JSON.parse(data)

        listCatched.value = data.catched
        listHistory.value = data.history

    }

    // set jumlah bilangan pokemon yang telah ditangkap
    function setCountCatchedPokemon() {
        let data = localStorage.getItem("data")

        if (!data) return

        data = JSON.parse(data)

        countCatched.value = data.catched.length
    }

    // delete pokemon
    function deleteCatchedPokemon(id) {
        let data = localStorage.getItem("data")

        if (!data) return

        // menghapus data pokemon
        data = JSON.parse(data)

        data.catched = data.catched.filter((pokemon) => pokemon.id != id)

        localStorage.setItem("data", JSON.stringify(data))
        listCatched.value = listCatched.value.filter(pokemon => pokemon.id != id)
        countCatched.value -= 1

    }

    return {
        statusGetListData,
        pokemonList,
        setPokemonList,
        setMorePokemonList,
        isLoadMore,
        statusGetDetailData,
        pokemonDetail,
        setDetailPokemon,
        tabDetailPokemon,
        statusCatch,
        catchPokemon,
        errorInputNickname,
        nickPokemon,
        listCatched,
        listHistory,
        countCatched,
        setListCatchedPokemon,
        tabCatchPokemon,
        deleteCatchedPokemon,
        setCountCatchedPokemon,
        filter,
    }
})