import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import About from '../detailPokemon/About.vue'; // Sesuaikan dengan path komponen
import KeyAbout from '../detailPokemon/KeyAbout.vue'; // Pastikan mengimpor komponen KeyAbout jika digunakan di dalam test

describe('About.vue', () => {
    // Contoh data pokemon
    const pokemon = {
        types: [{ slot: 1, type: { name: 'grass' } }, { slot: 2, type: { name: 'poison' } }],
        height: 7,
        weight: 69,
        abilities: [{ slot: 1, ability: { name: 'overgrow' } }, { slot: 3, ability: { name: 'chlorophyll' } }],
        base_experience: 64
    };

    // cek tipe pokemon ditampilkan dengan benar
    it('renders the correct pokemon types', () => {
        const wrapper = mount(About, {
            props: { pokemon }
        });

        // Memastikan tipe pokemon dirender dengan benar
        const types = wrapper.findAll('.value-type');
        expect(types).toHaveLength(2);
        expect(types[0].text()).toBe('grass');
        expect(types[1].text()).toBe('poison');
    });

    // cek value height dan weight sesuai dengan props
    it.only('renders the correct height and weight', () => {
        const wrapper = mount(About, {
            props: { pokemon }
        });

        // Memastikan tinggi pokemon dirender dengan benar
        const height = wrapper.find('.value-height');
        expect(height.text()).toContain('7 (m)');

        // Memastikan berat pokemon dirender dengan benar
        const weight = wrapper.find('.value-weight');
        expect(weight.text()).toContain('69 (kg)');
    });

    // cek apakah abilities muncul dengan benar
    it('renders the correct abilities', () => {
        const wrapper = mount(About, {
            props: { pokemon }
        });

        // Memastikan abilities pokemon dirender dengan benar
        const abilities = wrapper.findAll('.value-abilities');
        expect(abilities).toHaveLength(2);
        expect(abilities[0].text()).toBe('overgrow');
        expect(abilities[1].text()).toBe('chlorophyll');
    });

    it('renders the correct experience', () => {
        const wrapper = mount(About, {
            props: { pokemon }
        });

        // Memastikan pengalaman pokemon dirender dengan benar
        const experience = wrapper.find('.value-exp').text();
        expect(experience).toContain('64 (xp)');
    });

    // cek key dari data pokemon apakah sudah benar
    it('renders KeyAbout with correct labels', () => {
        const wrapper = mount(About, {
            props: { pokemon }
        });

        // Memastikan KeyAbout menerima prop "name" dengan label yang benar
        const keyAboutComponents = wrapper.findAllComponents(KeyAbout);
        expect(keyAboutComponents[0].props('name')).toBe('Type');
        expect(keyAboutComponents[1].props('name')).toBe('Height');
        expect(keyAboutComponents[2].props('name')).toBe('Weight');
        expect(keyAboutComponents[3].props('name')).toBe('Abilities');
        expect(keyAboutComponents[4].props('name')).toBe('Experience');
    });
});
