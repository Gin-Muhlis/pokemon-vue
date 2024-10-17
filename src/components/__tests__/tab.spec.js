import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useDetailPokemonStore } from '../../stores/detailPokemonStore';
import TabButton from '../detailPokemon/TabButton.vue'; // Sesuaikan dengan path yang benar

describe('TabButton.vue', () => {
    let pinia;

    beforeEach(() => {
        pinia = createPinia();
        setActivePinia(pinia);
    });

    // cek tab button ditampilkan dengan nama yang benar
    it('renders the tab button with the correct name', () => {
        const name = 'Details'; // Nama tab
        const wrapper = mount(TabButton, {
            props: { name },
            global: { plugins: [pinia] },
        });

        const button = wrapper.find('.tab');
        expect(button.exists()).toBe(true);
        expect(button.text()).toBe(name);
    });

    // cek tab button diterapkan dengan kelas aktif dan shadow
    it('applies active class when store.tab matches the name', async () => {
        const name = 'Details';
        const store = useDetailPokemonStore();
        store.tab = name;

        const wrapper = mount(TabButton, {
            props: { name },
            global: { plugins: [pinia] },
        });

        const button = wrapper.find('.tab');
        expect(button.classes()).toContain('bg-sky-400');
        expect(button.classes()).toContain('shadow-lg');
    });

    // cek apakah fungsi changeTab dipanggil dengan benar
    it('calls store.changeTab when button is clicked', async () => {
        const name = 'Details';
        const store = useDetailPokemonStore();
        const spy = vi.spyOn(store, 'changeTab');

        const wrapper = mount(TabButton, {
            props: { name },
            global: { plugins: [pinia] },
        });

        const button = wrapper.find('.tab');
        await button.trigger('click'); 

        expect(spy).toHaveBeenCalledWith(name);
    });
});
