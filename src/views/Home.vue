<template>
    <div class="w-full px-5 lg:px-24 pt-20 pb-5">

        <!-- error -->
         <Alert v-if="store.error" :message="store.error" />

        <!-- Skeleton -->
        <div v-else-if="store.isSkeleton" class="grid grid-cols-auto-fit gap-16">
            <SkelotonCard v-for="count in store.skeletonCount" :key="count" />
        </div>

        <div v-else-if="!store.isSkeleton" class="w-full">
            <!-- Daftar pokemon -->
            <div class="grid grid-cols-auto-fit gap-16 mb-16">
                <Card v-for="pokemon in store.pokemonList" :key="pokemon.name" :pokemon="pokemon" />
            </div>

            <!-- Tombol Load More pokemon -->
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
import Card from "../components/Card.vue"
import Loading from "../components/Loading.vue"
import SkelotonCard from "../components/SkelotonCard.vue"
import Alert from "../components/Alert.vue"
import { onMounted } from "vue"
import { usePokemonStore } from "../stores/pokemonStore.js"

const store = usePokemonStore()

onMounted(() => {
    store.setPokemonList()
})


</script>
