import Api from ".";

export function getPokemonList(params) {

    return Api.get(`/v2/pokemon`, {
        params
    })
}

export function getDetailPokemon(name) {
    return Api.get(`/v2/pokemon/${name}`)
}