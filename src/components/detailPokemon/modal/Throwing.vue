<template>
    <!-- button untuk melempar pokeball -->
    <button class="btn btn-md bg-white flex items-center justify-center gap-2 hover:bg-sky-400"
        @click="handleThrowPokeBall(pokemon)">
        <img src="/images/pokeball2.png" alt="Poke ball" class="w-7 object-cover animate-bounce">
        <span>Catch {{ store.pokemonDetail.name }}</span>
    </button>

    <dialog ref="modalThrowing" id="my_modal_1" class="modal">
        <div class="modal-box">
            <!-- ketika melempar pokeball -->
            <div v-if="store.statusCatch == 'throwing'" class="flex items-center justify-center flex-col gap-5">
                <img src="/images/pokeball2.png" alt="Poke ball" class="w-16 object cover animate-spin">
                <p class="font-bold text-lg">Throwing Pokeball...</p>
            </div>

            <!-- ketika pokemon tidak tertangkap -->
            <div v-if="store.statusCatch == 'run'" class="flex items-center justify-center flex-col gap-5">
                <img src="/images/pokeball2.png" alt="Poke ball" class="w-16 object cover animate-bounce">
                <p class="font-bold text-lg">Oops {{ handleNamePokemon(pokemon.name) }} run...</p>
            </div>

            <!-- ketika berhasil menangkap pokemon -->
            <div v-if="store.statusCatch == 'catching'" class="flex items-center justify-center flex-col">
                <p class="font-semibold text-lg mb-7">Wow you catch {{ handleNamePokemon(pokemon.name) }}...</p>
                <p class="font-semibold text-lg mb-2">Give a Wild {{ handleNamePokemon(pokemon.name) }} Nickname</p>

                <div class="mb-7 w-full flex items-center justify-center flex-col">
                    <!-- input nickname pokemon -->
                    <input v-model="store.nickPokemon" type="text" placeholder="Your pokemon name..."
                        class="input input-bordered w-full  max-w-xs mb-2 input-md" />

                    <!-- error ketika nickname pokemon tidak diisi -->
                    <p v-if="store.errorInputNickname" class="text-sm text-red-500 font-semibold">{{
                        store.errorInputNickname }}</p>
                </div>
                <div class="w-full flex items-center justify-center gap-3">
                    <!-- button untuk melepaskan pokemon yang ditangkap -->
                    <button class="btn btn-md bg-white border-sky-400 font-semibold hover:bg-white hover:border-sky-400"
                        onclick="my_modal_1.close()">
                        Release
                    </button>

                    <!-- button untuk menyimpan data pokemon yang ditangkap -->
                    <button class="btn btn-md bg-sky-400 font-semibold hover:bg-sky-400"
                        @click="store.catchingPokemon(pokemon)">
                        Catch
                    </button>
                </div>
            </div>

            <!-- ketika pokemon tertangkap dan disimpan -->
            <div v-if="store.statusCatch == 'catched'" class="flex items-center justify-center flex-col gap-5">
                <img src="/images/pokeball2.png" alt="Poke ball" class="w-16 object cover animate-spin">
                <p class="font-bold text-lg">Well done, Go to My Pokemon List...</p>
            </div>
        </div>

    </dialog>
</template>

<script setup>
import { useDetailPokemonStore } from "../../../stores/detailPokemonStore.js"
import { ref } from "vue"
import { storeToRefs } from 'pinia'
import { usePokemon } from "../../../composables/usePokemon.js"

const store = useDetailPokemonStore()
const { handleNamePokemon } = usePokemon()

// Create a ref to access the modal element
const modalThrowing = ref(null);

// fungsi untuk melempar pokeball
const handleThrowPokeBall = (pokemon) => {
    // ubah status menjadi 'throwing'
    statusCatch.value = "throwing"

    // Show the modal
    modalThrowing.value.showModal();

    // Menjalankan fungsi untuk menangkap pokemon
    setTimeout(() => {
        store.isCatchingPokemon(modalThrowing)
    }, 2000);

};

// mendefinisikan props
defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})


</script>
