<template>
    <div class="moves w-full relative h-full overflow-y-scroll flex items-start justify-start flex-wrap gap-3 scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-gray-100">
        <div v-for="move in pokemon.moves" :key="move.move.name" class="px-7 rounded py-3 border border-dashed border-slate-300 text-xs">
            <!-- nama gerakan/move -->
            <span>{{ move.move.name }}</span>
        </div>
    </div>
</template>

<script setup>

defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})
</script>
