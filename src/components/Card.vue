<template>
    <RouterLink to="/">
        <div class="group card bg-white w-full shadow-lg relative transition-all duration-300 hover:-translate-y-3">
            <div class="card-body py-10">
                <img src="/images/pokeball2.png" alt="Poke Ball Image"
                    class="w-24 object-cover grayscale opacity-20 absolute -top-10 -right-0 lg:-right-7 z-10 -scale-x-100">
                <div class="flex flex-col items-start justify-start gap-1 relative z-20">
                    <!-- no pokemon -->
                    <span
                        class="font-semibold text-sm text-slate-900 transition-all duration-300 group-hover:text-sky-400">{{
                            showNumberPokemon(pokemon.url) }}</span>

                    <!-- nama pokemon -->
                    <p class="text-xl lg:text-2xl font-bold text-slate-950">{{ pokemon.name }}</p>
                </div>

                <!-- gambar pokemon -->
                <img :src="handleImagePokemon(pokemon.url)" alt="test"
                    class="w-40 lg:w-40 object-cover z-20 absolute -top-10 -right-1 lg:-right-8 ">
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import { usePokemon } from "../composables/usePokemon.js"

defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})

const { handleImagePokemon, showNumberPokemon } = usePokemon()
</script>
