<template>
    <RouterLink :to="`/pokemon/${pokemon.name}`">
        <div class="group card bg-white w-full shadow-lg relative transition-all duration-300 hover:-translate-y-3">
            <div class="card-body py-10">
                <img v-if="catchedPokemonStore.isCatchedPokemon(showNumberPokemon(pokemon.url))" src="/images/pokeball1.png" alt="Poke ball left image" class="w-5 object cover absolute left-3 top-3">
                <img src="/images/pokeball2.png" alt="Poke iall top image"
                    class="poke-ball w-24 object-cover grayscale opacity-20 absolute -top-10 -right-0 lg:-right-7 z-10 -scale-x-100">
                <div class="flex flex-col items-start justify-start gap-1 relative z-20">
                    <!-- no pokemon -->
                    <span
                        class="pokemon-number font-semibold text-sm text-slate-900 transition-all duration-300 group-hover:text-sky-400">{{
                            showNumberPokemon(pokemon.url) }}</span>

                    <!-- nama pokemon -->
                    <p class="pokemon-name text-xl lg:text-2xl font-semibold text-slate-950">{{ handleNamePokemon(pokemon.name) }}</p>
                </div>

                <!-- gambar pokemon -->
                <img :src="handleImagePokemon(pokemon.url)" alt="Pokemon Image"
                    class="pokemon-image w-40 object-cover z-20 absolute -top-10 -right-1 lg:-right-8 ">
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import { usePokemon } from "../composables/usePokemon.js"
import { useCatchedPokemonStore } from "@/stores/catchedPokemonStore.js";

const catchedPokemonStore = useCatchedPokemonStore()

// memecah fungsi yang ada di usePokemon
const { handleImagePokemon, showNumberPokemon, handleNamePokemon } = usePokemon()


// mendifinisikan props
defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})
</script>
