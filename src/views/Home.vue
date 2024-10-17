<template>
    <div class="w-full px-5 lg:px-24 pt-20 pb-5">
        <!-- error -->
        <Alert v-if="error" :message="error" />

        <!-- skeleton -->
        <div v-else-if="isSkeleton" class="skeletons grid grid-cols-auto-fit gap-16">
            <SkeletonCard v-for="count in skeletonCount" :key="count" />
        </div>

        <div v-else-if="!isSkeleton" class="w-full">
            <!-- daftar pokemon -->
            <div class="grid grid-cols-auto-fit gap-16 mb-16">
                <CardPokemon v-for="pokemon in pokemonList" :key="pokemon.name" :name="pokemon.name" :image="handleImagePokemon(pokemon.url)" :number="handleNumberPokemon(pokemon.url)" />
            </div>

            <!-- tombol Load More pokemon -->
            <div class="w-full flex items-center justify-center">
                <button
                    class="btn bg-white flex items-center justify-center gap-2 btn-sm lg:btn-md border-none transition-all duration-300 hover:bg-sky-400"
                    @click="store.setMorePokemonList()">
                    <p class="font-semibold text-sm">Load More</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import CardPokemon from "../components/CardPokemon.vue"
import SkeletonCard from "../components/SkeletonCard.vue"
import Alert from "../components/Alert.vue"
import { onMounted } from "vue"
import { usePokemonStore } from "../stores/pokemonStore.js"
import { storeToRefs } from "pinia"
import { usePokemon } from "@/composables/usePokemon"

// inisiasi state dan destrukturing state
const store = usePokemonStore()
const { error, isSkeleton, skeletonCount, pokemonList } = storeToRefs(store)

// get helper function
const { handleImagePokemon, handleNumberPokemon } = usePokemon()

// get data list pokemon
onMounted(() => {
    store.setPokemonList()
})


</script>
