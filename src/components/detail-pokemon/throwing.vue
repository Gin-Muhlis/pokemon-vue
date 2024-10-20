<template>
    <dialog id="throwing-modal" class="modal">
        <div class="modal-box">
            <!-- ketika melempar pokeball -->
            <div v-if="store.statusCatch == 'throwing'" class="flex items-center justify-center flex-col gap-5">
                <img src="/images/pokeball2.png" alt="Poke ball" class="w-16 object cover animate-spin">
                <p class="font-bold text-lg text-throwing">Throwing Pokeball...</p>
            </div>

            <!-- ketika pokemon tidak tertangkap -->
            <div v-if="store.statusCatch == 'run'" class="run-message flex items-center justify-center flex-col gap-5">
                <img src="/images/pokeball2.png" alt="Poke ball" class="w-16 object cover animate-bounce">
                <p class="font-bold text-lg text-pokemon-run">Oops {{ handleNamePokemon(pokemon.name) }} run...</p>
            </div>

            <!-- ketika berhasil menangkap pokemon -->
            <div v-if="store.statusCatch == 'catching'" class="form-catch flex items-center justify-center flex-col input-parent">
                <p class="font-semibold text-lg mb-7 text-catch-success">Wow you catch {{
                    handleNamePokemon(pokemon.name) }}...</p>
                <p class="font-semibold text-lg mb-2">Give a Wild {{ handleNamePokemon(pokemon.name) }} Nickname</p>

                <div class="mb-7 w-full flex items-center justify-center flex-col input-col">
                    <!-- input nickname pokemon -->
                    <input v-model="nickPokemon" type="text" placeholder="Your pokemon name..."
                        class="input input-bordered w-full  max-w-xs mb-2 input-md" />

                    <!-- error ketika nickname pokemon tidak diisi -->
                    <p v-if="errorInputNickname" class="text-sm text-red-500 font-semibold error-nickname-message">{{
                        errorInputNickname }}</p>
                </div>
                <div class="w-full flex items-center justify-center gap-3">
                    <!-- button untuk melepaskan pokemon yang ditangkap -->
                    <button class="btn btn-md bg-white border-sky-400 font-semibold hover:bg-white hover:border-sky-400"
                        @click="releasePokemon">
                        Release
                    </button>

                    <!-- button untuk menyimpan data pokemon yang ditangkap -->
                    <button class="btn btn-md bg-sky-400 font-semibold hover:bg-sky-400"
                        @click="store.catchPokemon(pokemon)">
                        Catch
                    </button>
                </div>
            </div>

            <!-- ketika pokemon tertangkap dan disimpan -->
            <div v-if="store.statusCatch == 'catched'" class="flex items-center justify-center flex-col gap-5">
                <img src="/images/pokeball2.png" alt="Poke ball" class="w-16 object cover animate-spin">
                <p class="font-bold text-lg">Well done</p>
                <RouterLink to="/mypokemon">
                    <button class="btn btn-md bg-sky-400 font-semibold hover:bg-sky-400">Go to My Pokemon List</button>
                </RouterLink>
            </div>
        </div>

    </dialog>
</template>

<script setup>
import { usePokemonStore } from '@/stores/pokemon.js'
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue'
import { storeToRefs } from 'pinia'
import { handleNamePokemon } from '@/helpers/pokemon.js'
import { handleModal } from '@/helpers/modal.js'
import { generateRandNumber } from '@/helpers/pokemon.js'

// inisitasi state dan destrukturing state
const store = usePokemonStore()
const { pokemonDetail, nickPokemon, errorInputNickname } = storeToRefs(store)

function releasePokemon() {
    handleModal('throwing-modal', 'close')
    store.statusCatch = 'throwing'
    store.nickPokemon = ''
    emit('close')
}

function catchPokemon() {
    store.statusCatch = 'throwing'

    setTimeout(() => {
        // random number antara 1 dan 2
        const randomNumber = generateRandNumber()
        const isCatched = 2
        
        // cek apakah pokemon tertangkap
        if (randomNumber == isCatched) {
            store.statusCatch = "catching"

        } else {
            store.statusCatch = "run"
            setTimeout(() => {
                handleModal('throwing-modal', 'close')
                emit('close')
            }, 2000);
        }
    }, 2000);
}


// mendefinisikan props
const props = defineProps({
    pokemon: {
        type: Object,
        required: true
    },
    isThrowing: {
        type: Boolean,
        required: true,
        default: false
    }
})

const emit = defineEmits(['close'])

watch(() => props.isThrowing, () => {
    if (props.isThrowing) {
        catchPokemon()
    }
})


</script>
