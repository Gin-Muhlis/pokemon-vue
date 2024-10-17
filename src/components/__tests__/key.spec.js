import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import YourComponent from '../detailPokemon/KeyAbout.vue'; // Sesuaikan dengan path komponenmu

describe('YourComponent.vue', () => {

    // cek key yang ditampilkan
    it('renders the name prop correctly', () => {
        const name = 'Pikachu';
        const wrapper = mount(YourComponent, {
            props: { name }
        });

        // Memastikan teks dari prop name dirender dengan benar
        const nameText = wrapper.find('p');
        expect(nameText.text()).toBe(name);
    });

});
