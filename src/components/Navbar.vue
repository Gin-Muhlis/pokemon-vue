<template>
    <div class="w-full px-5 lg:px-28 py-5 border flex items-center justify-between gap-5">
        <!-- Logo dan icon untuk ke home page -->
        <RouterLink to="/">
            <img src="/images/poke.png" alt="Pokemon Icon" class="icon-poke w-32 lg:w-40 object-cover">
        </RouterLink>

        <!-- Button untuk ke page catch -->
        <button class="btn bg-white flex items-center justify-center gap-2 btn-sm border-none transition-all duration-300 hover:bg-sky-400">
            <p class="font-semibold text-sm">0 Catch</p>
            <img src="/images/pokeball2.png" alt="Poke Ball" class="icon-pokeball w-4 object-cover">
        </button>
    </div>
</template>

<script setup>

</script>
