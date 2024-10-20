<template>
    <div class="about flex flex-col items-start justify-start gap-4 px-3">
        <!-- tipe pokemon -->
        <div class="flex items-start justify-start gap-3 w-full">
            <KeyAbout name="Type" />

            <div v-for="type in pokemon.types" :key="type.slot" class="py-1 px-2 rounded"
                :class="typeColors[type.type.name]">
                <p class="text-xs text-white value-type">{{ type.type.name }}</p>
            </div>
        </div>

        <!-- height pokemon -->
        <div class="flex items-start justify-start gap-3 w-full">
            <KeyAbout name="Height" />

            <p class="text-sm value-height">{{ pokemon.height }} (m)</p>
        </div>

        <!-- weight pokemon -->
        <div class="flex items-start justify-start gap-3 w-full">
            <KeyAbout name="Weight" />

            <p class="text-sm value-weight">{{ pokemon.weight }} (kg)</p>
        </div>

        <!-- abilities pokemon -->
        <div class="flex items-start justify-start gap-3 w-full">
            <KeyAbout name="Abilities" />

            <div class="flex flex-col items-start justify-start gap-3">
                <div v-for="ability in pokemon.abilities" :key="ability.slot"
                    class="flex items-center justify-start gap-2">
                    <img src="/images/pokeball1.png" alt="Poke ball" class="w-4 grayscale">
                    <div class="px-2 py-1 rounded bg-sky-300">
                        <p class="text-xs value-abilities">{{ ability.ability.name }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- exp pokemon -->
        <div class="flex items-start justify-start gap-3 w-full">
            <KeyAbout name="Experience" />
            <p class="text-sm value-exp">{{ pokemon.base_experience }} (xp)</p>
        </div>
    </div>
</template>

<script setup>
import KeyAbout from "./key-about.vue";
import { usePokemon } from "../../composables/usePokemon.js"
import { typeColors } from "@/helpers/pokemon.js"

// mendifinisikan props
defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})

</script>
