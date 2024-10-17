<template>
    <div class="basis-1/4">
        <p class="font-semibold text-sm w-full">{{ name }}</p>
    </div>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        required: true
    }
})
</script>