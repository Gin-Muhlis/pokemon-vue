<template>
    <!-- tab section detail pokemon -->
    <a role="tab"
        :class="`tab mx-5 transition-all duration-200 hover:bg-sky-400 hover:shadow-lg ${store.tab == name ? 'bg-sky-400 shadow-lg' : ''}`"
        @click="store.changeTab(name)">{{ name }}</a>
</template>

<script setup>
import  { useDetailPokemonStore } from "../../stores/detailPokemonStore.js"

const store = useDetailPokemonStore()

// mendifinisikan props
defineProps({
    name: {
        type: String,
        required: true
    }
})
</script>
