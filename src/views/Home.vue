<template>
    <div class="w-full px-5 lg:px-24 pt-20 pb-5">
        <!-- error -->
        <Alert v-if="statusGetListData == 'error'" message="Get pokemon failed" />

        <!-- skeleton -->
        <div v-else-if="statusGetListData == 'loading'" class="skeletons grid grid-cols-auto-fit gap-16">
            <SkeletonCard />
        </div>

        <div v-else class="w-full">
            <!-- daftar pokemon -->
            <div class="grid grid-cols-auto-fit gap-16 mb-16">
                <CardPokemon v-for="pokemon in pokemonList" :key="pokemon.name" :name="pokemon.name"
                    :image="handleImagePokemon(pokemon.url)" :number="handleNumberPokemon(pokemon.url)" />
            </div>

            <!-- tombol Load More pokemon -->
            <div class="w-full flex items-center justify-center">
                <Loading v-if="isLoadMore" />
                <button v-else
                    class="btn btn-loadmore bg-white flex items-center justify-center gap-2 btn-sm lg:btn-md border-none transition-all duration-300 hover:bg-sky-400"
                    @click="store.setMorePokemonList()">
                    <p class="font-semibold text-sm">Load More</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import CardPokemon from "@/components/card-pokemon.vue"
import SkeletonCard from "@/components/home/skeleton-card.vue"
import Alert from "@/components/alert.vue"
import Loading from "@/components/TempLoading.vue"
import { onMounted } from "vue"
import { usePokemonStore } from "@/stores/pokemon.js"
import { storeToRefs } from "pinia"
import { handleImagePokemon, handleNumberPokemon } from "@/helpers/pokemon.js"

// inisiasi state dan destrukturing state
const store = usePokemonStore()
const { statusGetListData, skeletonCount, pokemonList, isLoadMore } = storeToRefs(store)

// get data list pokemon
onMounted(() => {
    store.filter.offset = 0
    store.setPokemonList()
})


</script>
