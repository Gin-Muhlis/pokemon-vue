import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Moves from '../detailPokemon/Moves.vue'; 

describe('Moves.vue', () => {
    const propsData = {
        pokemon: {
            moves: [
                { move: { name: 'thunder-punch' } },
                { move: { name: 'quick-attack' } },
                { move: { name: 'iron-tail' } }
            ]
        }
    };

    // cek apakah moves yang ditampilkan sesuai
    it('renders all pokemon moves passed through props', () => {
        const wrapper = mount(Moves, {
            props: propsData,
        });

        // Memastikan jumlah gerakan yang dirender sesuai dengan jumlah moves
        const moves = wrapper.findAll('div > span');
        expect(moves.length).toBe(propsData.pokemon.moves.length);

        // Memastikan setiap nama gerakan sesuai dengan props
        propsData.pokemon.moves.forEach((move, index) => {
            expect(moves.at(index).text()).toBe(move.move.name);
        });
    });

});
