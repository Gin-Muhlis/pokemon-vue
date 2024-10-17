<template>
    <div class="stats flex flex-col items-start justify-start gap-1 px-3 text-sm">
        <!-- list stats pokemon -->
        <ProgressStat v-for="stat in pokemon.stats" :key="stat.stat.name" :name="stat.stat.name" :value="stat.base_stat" />
    </div>
</template>

<script setup>
import ProgressStat from "./ProgressStat.vue"

// mendifinisikan props
defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})
</script>
