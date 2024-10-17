<template>
    <div class="w-full px-5 lg:px-24 pb-5">
        <div class="w-full flex items-center justify-end mb-20">
            <div role="tablist" class="tabs tabs-boxed p-2">
                <a role="tab" :class="`tab ${store.tab == 'Catched' ? 'bg-sky-400' : ''}`" @click="store.changeTab('Catched')">Catched</a>
                <a role="tab" :class="`tab ${store.tab == 'History' ? 'bg-sky-400' : ''}`" @click="store.changeTab('History')">History</a>
            </div>
        </div>
        <div class="w-full">
            <!-- daftar pokemon yang telah ditangkap -->
            <div v-if="store.tab == 'Catched'" class="flex items-start justify-start flex-wrap gap-16 mb-16">
                <CardPokemon v-for="pokemon in store.listCatched" :key="pokemon.id" :name="pokemon.name" :id="pokemon.id" :image="pokemon.image" :nickname="pokemon.nickname" :number="pokemon.number" :is-delete="true" />
            </div>

            <!-- daftar history pokemon yang ditangkap -->
            <div v-if="store.tab == 'History'" class="flex items-start justify-start flex-wrap gap-16 mb-16">
                <CardPokemon v-for="pokemon in store.listHistory" :key="pokemon.id" :name="pokemon.name" :id="pokemon.id" :image="pokemon.image" :nickname="pokemon.nickname" :number="pokemon.number" :is-delete="false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCatchedPokemonStore } from "../stores/catchedPokemonStore.js"
import CardPokemon from "../components/catchedPokemon/CardPokemon.vue";

const store = useCatchedPokemonStore()

onMounted(() => {
    store.setListCatchedPokemon()
    store.tab = "Catched"
})
</script>
