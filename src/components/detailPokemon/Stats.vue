vbas<template>
    <div class="flex flex-col items-start justify-start gap-1 px-3 text-sm">
        <!-- Hp pokemon -->
        <ProgressStat v-for="stat in pokemon.stats" :key="stat.stat.name" :name="stat.stat.name" :value="stat.base_stat" />
    </div>
</template>

<script setup>
import ProgressStat from "./ProgressStat.vue"

defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})
</script>
