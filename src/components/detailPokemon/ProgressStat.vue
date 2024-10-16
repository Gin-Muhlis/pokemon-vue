<template>
    <div class="w-full">
            <div class="w-full flex items-center justify-between mb-1">
                <div class="font-semibold flex items-center justify-start gap-1">
                    <img src="/images/heart.png" alt="Heart image" class="w-5 object-cover">
                    <p>{{ name }}</p>
                </div>
                <div>
                    <p class="font-semibold">{{ value }}</p>
                </div>
            </div>
            <progress className="progress progress-info w-full" :value="value" max="255"></progress>
        </div>
</template>

<script setup>
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
