// generate gambar pokemon
export function handleImagePokemon(urlPokemon) {
    console.log(urlPokemon)

    const segments = urlPokemon.split('/');
    const id = segments[segments.length - 2];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

// generate nomor pokemon
export function handleNumberPokemon(urlPokemon) {
    const segments = urlPokemon.split('/');
    const id = String(segments[segments.length - 2]);

    return id.padStart(4, "0")
}

// generate nama pokemon
export function handleNamePokemon(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

// generate gambar detail pokemon 
export function handleDetailImagePokemon(sprites) {
    return sprites.other['official-artwork'].front_default;
}

// generate color type pokemon
export const typeColors = {
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

export function isCatchedPokemon(number) {
    let data = localStorage.getItem("data")

    if (!data) return

    data = JSON.parse(data)

    const indexPokemon = data.catched.findIndex(pokemon => pokemon.number == number)

    if (indexPokemon > -1) {
        return true
    } else {
        return false
    }

}

export function generateRandNumber() {
    return Math.floor(Math.random() * 2) + 1
}