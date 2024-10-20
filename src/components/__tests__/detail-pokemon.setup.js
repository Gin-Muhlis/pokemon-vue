export const dummyPokemonData = {
    data: {
        id: 25,
    name: "pikachu",
    height: 4,
    weight: 60,
    base_experience: 112, 
    sprites: {
        other: {
            'official-artwork': {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            }
        }
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
    }
  };