<template>
    <div class="w-full px-5 lg:px-24 pt-20 pb-5">
        <!-- error -->
        <Alert v-if="listPokemonStore.error" :message="listPokemonStore.error" />

        <!-- skeleton -->
        <div v-else-if="listPokemonStore.isSkeleton" class="skeletons grid grid-cols-auto-fit gap-16">
            <SkeletonCard v-for="count in listPokemonStore.skeletonCount" :key="count" />
        </div>

        <div v-else-if="!listPokemonStore.isSkeleton" class="w-full">
            <!-- daftar pokemon -->
            <div class="grid grid-cols-auto-fit gap-16 mb-16">
                <Card v-for="pokemon in listPokemonStore.pokemonList" :key="pokemon.name" :pokemon="pokemon" />
            </div>

            <!-- tombol Load More pokemon -->
            <div class="w-full flex items-center justify-center">
                <button
                    class="btn bg-white flex items-center justify-center gap-2 btn-sm lg:btn-md border-none transition-all duration-300 hover:bg-sky-400"
                    @click="listPokemonStore.setMorePokemonList()">
                    <p class="font-semibold text-sm">Load More</p>
                </button>
            </div>
        </div>

    </div>


</template>

<script setup>
import Card from "../components/Card.vue"
import SkeletonCard from "../components/SkeletonCard.vue"
import Alert from "../components/Alert.vue"
import { onMounted } from "vue"
import { usePokemonStore } from "../stores/pokemonStore.js"

const listPokemonStore = usePokemonStore()

// get data list pokemon
onMounted(() => {
    listPokemonStore.setPokemonList()
})


</script>
