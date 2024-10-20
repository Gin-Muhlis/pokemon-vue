<template>
    <div class="stats flex flex-col items-start justify-start gap-1 px-3 text-sm">
        
        
        <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="w-full">
            <div class="w-full flex items-center justify-between mb-1">
                <div class="font-semibold flex items-center justify-start gap-1">
                    <!-- icon stat -->
                    <img :src="`/images/${stat.stat.name}.png`" alt="Heart image" class="w-5 object-cover">
                    <!-- nama stat -->
                    <p>{{ stat.stat.name }}</p>
                </div>
                <div>
                    <!-- value stat -->
                    <p class="font-semibold">{{ stat.base_stat }}</p>
                </div>
            </div>
            <!-- progress stat -->
            <progress class="progress progress-info w-full" :value="stat.base_stat" max="255"></progress>
        </div>
    </div>
</template>

<script setup>

// mendifinisikan props
const props = defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})
</script>
