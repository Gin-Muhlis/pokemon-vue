export function usePokemon() {
    // generate gambar pokemon
    const handleImagePokemon = (urlPokemon) => {
        const segments = urlPokemon.split('/');
        const id = segments[segments.length - 2];

        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    }

    // generate nomor pokemon
    const handleNumberPokemon = (urlPokemon) => {
        const segments = urlPokemon.split('/');
        const id = String(segments[segments.length - 2]);

        return id.padStart(4, "0")
    }

    // generate nama pokemon
    const handleNamePokemon = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    // generate gambar detail pokemon 
    const handleDetailImagePokemon = (sprites) => {
        return sprites.other['official-artwork'].front_default;
    }

    // generate color type pokemon
    const typeColors = {
        normal: 'bg-normal',
        fire: 'bg-fire',
        water: 'bg-water',
        electric: 'bg-electric',
        grass: 'bg-grass',
        ice: 'bg-ice',
        fighting: 'bg-fighting',
        poison: 'bg-poison',
        ground: 'bg-ground',
        flying: 'bg-flying',
        psychic: 'bg-psychic',
        bug: 'bg-bug',
        rock: 'bg-rock',
        ghost: 'bg-ghost',
        dragon: 'bg-dragon',
        dark: 'bg-dark',
        steel: 'bg-steel',
        fairy: 'bg-fairy'
    };

    return {
        handleImagePokemon,
        handleNumberPokemon,
        handleNamePokemon,
        handleDetailImagePokemon,
        typeColors
    }
}