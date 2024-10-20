import Api from ".";

export function getPokemonList(params) {
    const mockingData = {
        id: 25,
        name: "pikachu",
        height: 4,
        weight: 60,
        base_experience: 112, // experience
        sprites: {
          front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        },
        types: [
          {
            type: {
              name: "electric",
            },
          },
        ],
        stats: [
          {
            base_stat: 55,
            effort: 0,
            stat: {
              name: "hp",
            },
          },
          {
            base_stat: 90,
            effort: 2,
            stat: {
              name: "speed",
            },
          },
          {
            base_stat: 40,
            effort: 0,
            stat: {
              name: "defense",
            },
          },
          {
            base_stat: 50,
            effort: 0,
            stat: {
              name: "attack",
            },
          },
        ],
        abilities: [
          {
            ability: {
              name: "static",
            },
            is_hidden: false,
          },
          {
            ability: {
              name: "lightning-rod",
            },
            is_hidden: true,
          },
        ],
        moves: [
          {
            move: {
              name: "thunder-shock",
            },
          },
          {
            move: {
              name: "quick-attack",
            },
          },
          {
            move: {
              name: "iron-tail",
            },
          },
        ],
      };
      
    return Api.get(`/v2/pokemon`, {
        params
    })
}

export function getDetailPokemon(name) {
    return Api.get(`/v2/pokemon/${name}`)
}