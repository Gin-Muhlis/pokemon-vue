<template>
    <div class="flex flex-col items-center justify-center">
        <!-- number pokemon -->
        <p class="poke-number font-semibold mb-2">
            #{{ numberPokemon }}
        </p>

        <!-- nama pokemon -->
        <div class=" mb-5 flex items-center justify-center gap-2">
            <div v-if="isCatchedPokemon(numberPokemon)" class="relative">
                <!-- logo poke ball ketika pokemon sudah penah ditangkap -->
                <div class="tooltip" data-tip="Owned">
                    <img src="/images/pokeball1.png" alt="Poke ball catched" class="w-6 object-cover">
                </div>
            </div>
            <h1 class="text-2xl font-bold capitalize">
                {{ pokemon.name }}
            </h1>
        </div>

        <!-- gambar pokemon -->
        <img :src="handleDetailImagePokemon(pokemon.sprites)" alt="Pokemon"
            class="pokemon-image w-56 object-cover z-20 mb-7">

        <!-- button tangkap pokemon -->

        <button
            class="btn btn-md btn-poke-ball bg-white flex items-center justify-center gap-2 hover:bg-sky-400 btn-throwing"
            @click="handleThrowPokeBall()">
            <img src="/images/pokeball2.png" alt="Poke ball" class="w-7 object-cover animate-bounce">
            <span>Catch {{ store.pokemonDetail.name }}</span>
        </button>

    </div>
    <Teleport to="body">
        <Throwing :pokemon="pokemon" :is-throwing="isThrowing" @close="handleStatusCatch" />
    </Teleport>
</template>

<script setup>
import Throwing from "./throwing.vue"
import { computed, ref } from "vue"
import { usePokemonStore } from "@/stores/pokemon.js"
import { handleDetailImagePokemon, isCatchedPokemon } from "@/helpers/pokemon.js"
import { handleModal } from '@/helpers/modal.js'

const store = usePokemonStore()
const numberPokemon = computed(() => {
    return String(props.pokemon.id).padStart(4, "0")
})

const isThrowing = ref(false)

const props = defineProps({
    pokemon: Object
})

function handleStatusCatch() {
    isThrowing.value = false
}

// fungsi untuk melempar pokeball
const handleThrowPokeBall = () => {
    handleModal('throwing-modal', 'open')

    isThrowing.value = true

}
</script>
