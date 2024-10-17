<template>
    <div class="w-full px-5 lg:px-24 pt-12 pb-5">
        <!-- error -->
        <Alert v-if="error" :message="error" />

        <!-- loading -->
        <Loading v-else-if="isLoading" />

        <!-- data pokemon -->
        <div v-else-if="!isLoading && pokemonDetail"
            class="grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-16">
            <div class="flex flex-col items-center justify-center">
                <!-- number pokemon -->
                <p class="poke-number font-semibold mb-2">
                    #{{ String(pokemonDetail.id).padStart(4, "0") }}
                </p>

                <!-- nama pokemon -->
                <div class=" mb-5 flex items-center justify-center gap-2">
                    <div v-if="catchedPokemonStore.isCatchedPokemon(String(pokemonDetail.id).padStart(4, '0'))"
                        class="relative">
                        <!-- logo poke ball ketika pokemon sudah penah ditangkap -->
                        <img src="/images/pokeball1.png" alt="Poke ball catched" class="w-6 object-cover">

                        <!-- teks untuk menunjukkan bahwa pokemon sudah ditangkap -->
                        <div
                            class="bg-slate-700 text-white px-2 py-1 rounded absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs after:">
                            <span>Owned</span>
                            <!-- Segitiga -->
                            <div class="after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-top-2
                after:border-4 after:border-transparent after:border-b-slate-700">
                            </div>
                        </div>

                    </div>
                    <h1 class="text-2xl font-bold">
                        {{ handleNamePokemon(pokemonDetail.name) }}
                    </h1>
                </div>

                <!-- gambar pokemon -->
                <img :src="handleDetailImagePokemon(pokemonDetail.sprites)" alt="Pokemon"
                    class="pokemon-image w-56 object-cover z-20 mb-7">

                <!-- button tangkap pokemon -->
                <Throwing :pokemon="pokemonDetail" />

            </div>

            <!-- tab detail -->
            <div class="card bg-white w-full h-[420px]">
                <div role="tablist" class="tabs tabs-boxed border mx-10 mt-7 bg-white border-none">
                    <TabButton name="About" />
                    <TabButton name="Stats" />
                    <TabButton name="Moves" />
                </div>
                <div class="card-body flex-1 overflow-hidden">
                    <!-- about -->
                    <About v-if="tab === 'About'" :pokemon="pokemonDetail" />
                    <!-- stats -->
                    <Stats v-if="tab === 'Stats'" :pokemon="pokemonDetail" />
                    <!-- Moves -->
                    <Moves v-if="tab === 'Moves'" :pokemon="pokemonDetail" />
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
import Throwing from "../components/detailPokemon/Throwing.vue"
import Alert from "../components/Alert.vue"

import { useRoute } from "vue-router"
import { onMounted } from "vue"
import { usePokemon } from "../composables/usePokemon.js"
import { useDetailPokemonStore } from "../stores/detailPokemonStore.js"
import { useCatchedPokemonStore } from "@/stores/catchedPokemonStore"
import { storeToRefs } from "pinia"

const route = useRoute()

// inisiasi state
const detailPokemonStore = useDetailPokemonStore()
const catchedPokemonStore = useCatchedPokemonStore()

// destrukturing state
const { error, isLoading, pokemonDetail, tab } = storeToRefs(detailPokemonStore)

onMounted(() => {
    // get data detail pokemon 
    detailPokemonStore.setDetailPokemon(route.params.name)
    detailPokemonStore.tab = "About"
})

const { handleNamePokemon, handleDetailImagePokemon } = usePokemon()
</script>
