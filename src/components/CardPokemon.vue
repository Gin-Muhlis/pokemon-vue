<template>

    <div
        class="card-pokemon group max-w-full sm:max-w-96 card bg-white w-full shadow-lg relative transition-all duration-300 hover:-translate-y-3">
        <button 
            v-if="isDelete"
            @click="catchedPokemonStore.deleteCatchedPokemon(id)"
            class="z-50 flex items-center justify-center absolute top-3 left-3 bg-red-500 w-5 h-5 rounded-full">
            
            <img src="/images/x.png" alt="X Image" class="x-delete w-4 object-cover">
        </button>
        <img v-if="catchedPokemonStore.isCatchedPokemon(number)" src="/images/pokeball1.png" alt="Poke ball left image" class="pokeball-catched w-5 object cover absolute left-3 top-3">
        <img src="/images/pokeball2.png" alt="Poke Ball Image"
            class="poke-ball w-24 object-cover grayscale opacity-20 absolute -top-10 -right-0 lg:-right-7 z-10 -scale-x-100">
        <RouterLink :to="`/pokemon/${name}`">
            <div class="card-body py-10">
                <div class="flex flex-col items-start justify-start gap-1 relative z-20">
                    <!-- no pokemon -->
                    <span
                        class="pokemon-number font-semibold text-sm text-slate-900 transition-all duration-300 group-hover:text-sky-400">{{
                            number }}</span>

                    <!-- nama pokemon -->
                    <p class="pokemon-name text-xl lg:text-2xl font-semibold text-slate-950">{{ handleNamePokemon(name)
                        }}</p>
                    <p class="pokemon-nickname text-xl lg:text-lg italic font-semibold text-slate-950">{{ nickname }}</p>
                </div>

                <!-- gambar pokemon -->
                <img :src="image" alt="Pokemon Image"
                    class="pokemon-image w-44 object-cover z-20 absolute -top-10 -right-1 lg:-right-8 ">
            </div>
        </RouterLink>
    </div>

</template>

<script setup>
import { usePokemon } from "../composables/usePokemon.js"
import { useCatchedPokemonStore } from "../stores/catchedPokemonStore.js"

const catchedPokemonStore = useCatchedPokemonStore()

// memecah fungsi yang ada di usePokemon
const { handleNamePokemon } = usePokemon()

// mendifinisikan props
defineProps({
    id: {
        type: String,
        required: false,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: false,
        default: ""
    },
    number: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        required: false,
        default: false
    }
})

</script>
