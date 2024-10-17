import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProgressStat from '../detailPokemon/ProgressStat.vue';

describe('ProgressStat.vue', () => {
    const propsData = {
        name: 'speed',
        value: 80
    };

    // cek apakah nama dan nilai stat sesuai
    it('renders the correct stat name and value', () => {
        const wrapper = mount(ProgressStat, {
            props: propsData,
        });

        // Memastikan nama stat ditampilkan dengan benar
        const statName = wrapper.find('p');
        expect(statName.text()).toBe(propsData.name);

        // Memastikan value stat ditampilkan dengan benar
        const statValue = wrapper.findAll('p').at(1); // mengambil elemen <p> kedua untuk value
        expect(statValue.text()).toBe(propsData.value.toString());
    });

    // cek apakah image sesuai
    it('renders the correct image based on stat name', () => {
        const wrapper = mount(ProgressStat, {
            props: propsData,
        });

        // cek apakah image muncul dan src yang benar
        const img = wrapper.find('img');
        expect(img.exists()).toBe(true); // Memastikan img ada
        expect(img.attributes('src')).toBe(`/images/${propsData.name}.png`); // Memastikan src image sesuai dengan name stat
    });

    // cek apakah progress bar sesuai
    it('sets the correct value and max for the progress bar', () => {
        const wrapper = mount(ProgressStat, {
            props: propsData,
        });

        // cek value progress stat
        const progressBar = wrapper.find('progress');
        expect(progressBar.attributes('value')).toBe(propsData.value.toString()); // Memastikan value pada progress bar sesuai dengan prop value
        expect(progressBar.attributes('max')).toBe('255'); // Memastikan nilai max adalah 255
    });
});
