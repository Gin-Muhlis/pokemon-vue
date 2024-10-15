export function usePokemon() {
    // generate gambar pokemon
    const handleImagePokemon = (urlPokemon) => {
        const segments = urlPokemon.split('/');
        const id = segments[segments.length - 2]; 

        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    }

    // generate nomor pokemon
    const showNumberPokemon = (urlPokemon) => {
        const segments = urlPokemon.split('/');
        const id = String(segments[segments.length - 2]); 

        return id.padStart(4, "0")
    }

    return {
        handleImagePokemon,
        showNumberPokemon
    }
}