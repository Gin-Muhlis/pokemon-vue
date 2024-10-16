<template>
    <div class="flex flex-col items-start justify-start gap-4 px-3">
        <!-- tipe pokemon -->
        <div class="flex items-start justify-start gap-3 w-full">
            <div class="basis-1/4">
                <p class="font-semibold text-sm w-full">Type</p>
            </div>

            <div v-for="type in pokemon.types" :key="type.slot"
                :class="[typeColors[type.type.name], 'py-1', 'px-2', 'rounded']">
                <p class="text-xs text-white">{{ type.type.name }}</p>
            </div>
        </div>

        <!-- height pokemon -->
        <div class="flex items-start justify-start gap-3 w-full">
            <div class="basis-1/4">
                <p class="font-semibold text-sm w-full">Height</p>
            </div>
            <p class="text-sm">{{ pokemon.height }} (m)</p>
        </div>

        <!-- weight pokemon -->
        <div class="flex items-start justify-start gap-3 w-full">
            <div class="basis-1/4">
                <p class="font-semibold text-sm w-full">Weight</p>
            </div>
            <p class="text-sm">{{ pokemon.weight }} (kg)</p>
        </div>

        <!-- abilities pokemon -->
        <div class="flex items-start justify-start gap-3 w-full">
            <div class="basis-1/4">
                <p class="font-semibold text-sm w-full">Abilities</p>
            </div>
            <div class="flex flex-col items-start justify-start gap-3">
                <div v-for="ability in pokemon.abilities" :key="ability.slot"
                    class="flex items-center justify-start gap-2">
                    <img src="/images/pokeball1.png" alt="Poke ball" class="w-4 grayscale">
                    <div class="px-2 py-1 rounded bg-sky-300">
                        <p class="text-xs">{{ ability.ability.name }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- exp pokemon -->
        <div class="flex items-start justify-start gap-3 w-full">
            <div class="basis-1/4">
                <p class="font-semibold text-sm w-full">Experince</p>
            </div>
            <p class="text-sm">{{ pokemon.base_experience }} (xp)</p>
        </div>
    </div>
</template>

<script setup>
import { usePokemon } from "../../composables/usePokemon.js"

const { generateColorTypePokemon, typeColors } = usePokemon()



defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})

</script>
