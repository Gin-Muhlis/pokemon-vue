<template>
    <div class="w-full">
        <div class="w-full flex items-center justify-between mb-1">
            <div class="font-semibold flex items-center justify-start gap-1">
                <!-- icon stat -->
                <img :src="`/images/${name}.png`" alt="Heart image" class="w-5 object-cover">
                <!-- nama stat -->
                <p>{{ name }}</p>
            </div>
            <div>
                <!-- value stat -->
                <p class="font-semibold">{{ value }}</p>
            </div>
        </div>
        <!-- progress stat -->
        <progress className="progress progress-info w-full" :value="value" max="255"></progress>
    </div>
</template>

<script setup>
// mendefinisikan props
defineProps({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})
</script>
