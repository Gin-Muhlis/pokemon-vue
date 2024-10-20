<template>
    <div class="w-full px-5 lg:px-24 pb-5">
        <div class="w-full flex items-center justify-end mb-20">
            <div role="tablist" class="tabs tabs-boxed p-2">
                <a role="tab" :class="`tab tab-catched ${tabCatchPokemon == 'Catched' ? 'bg-sky-400' : ''}`" @click="changeTab('Catched')">Catched</a>
                <a role="tab" :class="`tab tab-history ${tabCatchPokemon == 'History' ? 'bg-sky-400' : ''}`" @click="changeTab('History')">History</a>
            </div>
        </div>
        <div class="w-full">
            <!-- daftar pokemon yang telah ditangkap -->
            <div v-if="tabCatchPokemon == 'Catched'" class="list-catched flex items-start justify-start flex-wrap gap-16 mb-16">
                <CardPokemon v-for="pokemon in listCatched" :key="pokemon.id" :name="pokemon.name" :id="pokemon.id" :image="pokemon.image" :nickname="pokemon.nickname" :number="pokemon.number" :is-delete="true" />
            </div>

            <!-- daftar history pokemon yang ditangkap -->
            <div v-if="tabCatchPokemon == 'History'" class="list-history flex items-start justify-start flex-wrap gap-16 mb-16">
                <CardPokemon v-for="pokemon in listHistory" :key="pokemon.id" :name="pokemon.name" :id="pokemon.id" :image="pokemon.image" :nickname="pokemon.nickname" :number="pokemon.number" :is-delete="false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { usePokemonStore } from "@/stores/pokemon.js"
import CardPokemon from "@/components/card-pokemon.vue"
import { storeToRefs } from "pinia";

// inisiasi state dan destrukturing state
const store = usePokemonStore()
const {tabCatchPokemon, listCatched, listHistory} = storeToRefs(store)

function changeTab (value) {
    tabCatchPokemon.value = value
}

onMounted(() => {
    store.setListCatchedPokemon()
    tabCatchPokemon.value = "Catched"
})
</script>
