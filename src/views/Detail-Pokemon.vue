<template>
    <div class="w-full px-5 lg:px-24 pt-12 pb-5">
        <!-- error -->
        <Alert v-if="store.error" :message="store.error" />

        <!-- loading -->
        <Loading v-else-if="store.isLoading" />

        <!-- data pokemon -->
        <div v-else-if="!store.isLoading && store.pokemonDetail"
            class="grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-16">
            <div class="flex flex-col items-center justify-center">
                <!-- number pokemon -->
                <p class="poke-number font-semibold mb-2">
                    #{{ String(store.pokemonDetail.id).padStart(4, "0") }}
                </p>

                <!-- nama pokemon -->
                <h1 class="text-2xl font-bold mb-5">{{ handleNamePokemon(store.pokemonDetail.name) }}</h1>

                <!-- gambar pokemon -->
                <img :src="handleDetailImagePokemon(store.pokemonDetail.sprites)" alt="Pokemon"
                    class="pokemon-image w-56 object-cover z-20 mb-7">

                <!-- button tangkap pokemon -->
                <Throwing :pokemon="store.pokemonDetail" />

            </div>

            <!-- tab detail -->
            <div class="card bg-white w-full h-[420px]">
                <div role="tablist" class="tabs tabs-boxed border mx-10 mt-7 bg-white border-none">
                    <TabButton name="About" />
                    <TabButton name="Stats" />
                    <TabButton name="Moves" />
                </div>
                <div class="card-body flex-1 overflow-hidden">
                    <About v-if="store.tab === 'About'" :pokemon="store.pokemonDetail" />
                    <Stats v-if="store.tab === 'Stats'" :pokemon="store.pokemonDetail" />
                    <Moves v-if="store.tab === 'Moves'" :pokemon="store.pokemonDetail" />
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import About from "../components/detailPokemon/About.vue"
import Stats from "../components/detailPokemon/Stats.vue"
import Moves from "../components/detailPokemon/Moves.vue"
import Loading from "../components/Loading.vue"
import TabButton from "../components/detailPokemon/TabButton.vue"
import Throwing from "../components/detailPokemon/modal/Throwing.vue"
import Alert from "../components/Alert.vue"
import { useDetailPokemonStore } from "../stores/detailPokemonStore.js"
import { useRoute } from "vue-router"
import { onMounted } from "vue"
import { usePokemon } from "../composables/usePokemon.js"

const route = useRoute()
const store = useDetailPokemonStore()

const { handleNamePokemon, handleDetailImagePokemon } = usePokemon()

// get data detail pokemon
onMounted(() => {
    store.setDetailPokemon(route.params.name)
    store.tab = "About"
})


</script>
