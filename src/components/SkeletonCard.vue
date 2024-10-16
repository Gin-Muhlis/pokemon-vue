<template>
    <div
        class="skeleton-card w-full rounded-xl bg-white px-8 py-3 h-32 flex relative items-center justify-between gap-1">
        <!-- gambar poke ball top -->
        <img src="/images/pokeball2.png" alt="Poke ball image"
            class="poke-ball-top w-24 object-cover grayscale opacity-20 absolute -top-10 -right-0 lg:-right-7 z-10 -scale-x-100">

        <!-- div refresentasi nomor dan nama pokemon -->
        <div class="flex flex-col items-start justify-start gap-3 relative z-20">
            <div class="w-12 h-2 bg-slate-200 rounded-md animate-pulse"></div>
            <div class="w-24 h-2 bg-slate-200 rounded-md animate-pulse"></div>
        </div>

        <!-- gambar poke ball spinning -->
        <img src="/images/pokeball1.png" alt="Poke ball animation"
            class="poke-ball-spin w-8 object-cover z-20 relative animate-spin grayscale opacity-20 -left-10 lg:-left-5">
    </div>
</template>

<script setup>

</script>
