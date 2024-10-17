import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Stats from '../detailPokemon/Stats.vue'; // Sesuaikan dengan path yang benar
import ProgressStat from '../detailPokemon/ProgressStat.vue'; // Sesuaikan dengan path yang benar

describe('Stats.vue', () => {
    const pokemonMock = {
        stats: [
            { base_stat: 45, stat: { name: 'speed' } },
            { base_stat: 50, stat: { name: 'attack' } },
            { base_stat: 55, stat: { name: 'defense' } },
        ],
    };

    // cek jumlah progres stat sesuai
    it('renders the correct number of ProgressStat components', () => {
        const wrapper = mount(Stats, {
            props: { pokemon: pokemonMock },
        });

        const progressStats = wrapper.findAllComponents(ProgressStat);
        expect(progressStats.length).toBe(pokemonMock.stats.length); 
    });

    // cek props yang diteruskan
    it('passes the correct props to each ProgressStat', () => {
        const wrapper = mount(Stats, {
            props: { pokemon: pokemonMock },
        });

        const progressStats = wrapper.findAllComponents(ProgressStat);

        pokemonMock.stats.forEach((stat, index) => {
            const progressStat = progressStats.at(index);
            expect(progressStat.props('name')).toBe(stat.stat.name);
            expect(progressStat.props('value')).toBe(stat.base_stat);
        });
    });
});
