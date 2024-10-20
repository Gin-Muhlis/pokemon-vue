<template>
    <div class="card bg-white w-full h-[420px]">
        <div role="tablist" class="tabs tabs-boxed border mx-10 mt-7 bg-white border-none">
            <a v-for="tabName in tabs" :key="tabName" role="tab"
                class="tab transition-all duration-200 hover:bg-sky-400 hover:shadow-lg"
                :class="[`tab-${tabName}`, { 'bg-sky-400 shadow-lg': tabDetailPokemon == tabName }]"
                @click="changeTab(tabName)">{{ tabName }}</a>
        </div>
        <div class="card-body flex-1 overflow-hidden">
            <!-- about -->
            <About v-if="tabDetailPokemon === 'About'" :pokemon="pokemonDetail" />
            <!-- stats -->
            <Stats v-if="tabDetailPokemon === 'Stats'" :pokemon="pokemonDetail" />
            <!-- Moves -->
            <Moves v-if="tabDetailPokemon === 'Moves'" :pokemon="pokemonDetail" />

        </div>
    </div>
</template>

<script setup>
import About from "./about.vue"
import Stats from "./stats.vue"
import Moves from "./moves.vue"
import { usePokemonStore } from "../../stores/pokemon.js"
import { storeToRefs } from "pinia"

const store = usePokemonStore()

// destrukturing state
const { pokemonDetail, tabDetailPokemon } = storeToRefs(store)

const tabs = ["About", "Stats", "Moves"]

function changeTab (value) {
    store.tabDetailPokemon = value
}

</script>
