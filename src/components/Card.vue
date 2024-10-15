<template>
    <RouterLink to="/">
        <div
            class="group w-full rounded-lg bg-white px-8 py-3 flex relative items-center justify-between gap-1 transition-all duration-300 hover:-translate-y-3" :key="id">
            <img src="/images/pokeball2.png" alt="Poke Ball Image"
                class="w-24 object-cover grayscale opacity-20 absolute -top-7 -right-7 z-10 -scale-x-100">
            <div class="flex flex-col items-start justify-start gap-1 relative z-20">
                <span class="font-semibold text-sm text-slate-900 transition-all duration-300 group-hover:text-sky-400">0001</span>
                <p class="text-2xl font-bold text-slate-950">{{ name }}</p>
            </div>
            <img :src="image" alt="test" class="w-28 object-cover relative z-20 -translate-y-7 translate-x-9">
        </div>
    </RouterLink>
</template>

<script setup>
    defineProps({
        id: Number,
        name: String,
        image: String
    })
</script>
