<template>
    <div class="w-full px-5 lg:px-24 pt-12 pb-5">
        <!-- error -->
        <Alert v-if="statusGetDetailData == 'error'" message="Get pokemon failed" />

        <!-- loading -->
        <Loading v-else-if="statusGetDetailData == 'loading'" />

        <!-- data pokemon -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-16">
            <Sprite :pokemon="pokemonDetail" />
            <!-- tab detail -->
            <Data />
        </div>
    </div>
</template>

<script setup>

import Alert from "@/components/alert.vue"
import Data from "@/components/detail-pokemon/data.vue"
import Sprite from "@/components/detail-pokemon/sprite.vue"
import Loading from "@/components/loading.vue"
import { useRoute } from "vue-router"
import { onMounted, computed } from "vue"
import { usePokemonStore } from "@/stores/pokemon.js"
import { storeToRefs } from "pinia"

const route = useRoute()

// inisiasi state
const store = usePokemonStore()

// destrukturing state
const { statusGetDetailData, pokemonDetail, tabDetailPokemon } = storeToRefs(store)

onMounted(() => {
    // get data detail pokemon 
    store.setDetailPokemon(route.params.name)
    store.tabDetailPokemon = "About"
})

</script>
