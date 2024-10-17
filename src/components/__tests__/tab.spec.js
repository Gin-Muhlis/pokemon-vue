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

        const button = wrapper.find('a[role="tab"]');
        expect(button.exists()).toBe(true); // Memastikan tombol ada
        expect(button.text()).toBe(name); // Memastikan nama tombol benar
    });

    // cek tab button diterapkan dengan kelas aktif dan shadow
    it('applies active class when store.tab matches the name', async () => {
        const name = 'Details';
        const store = useDetailPokemonStore(); // Mengambil store
        store.tab = name; // Mengatur tab saat ini ke nama yang sama

        const wrapper = mount(TabButton, {
            props: { name },
            global: { plugins: [pinia] },
        });

        const button = wrapper.find('a[role="tab"]');
        expect(button.classes()).toContain('bg-sky-400'); // Memastikan kelas aktif diterapkan
        expect(button.classes()).toContain('shadow-lg'); // Memastikan shadow diterapkan
    });

    // cek apakah fungsi changeTab dipanggil dengan benar
    it('calls store.changeTab when button is clicked', async () => {
        const name = 'Details';
        const store = useDetailPokemonStore();
        const spy = vi.spyOn(store, 'changeTab'); // Memantau fungsi changeTab

        const wrapper = mount(TabButton, {
            props: { name },
            global: { plugins: [pinia] },
        });

        const button = wrapper.find('a[role="tab"]');
        await button.trigger('click'); // Trigger klik pada button

        expect(spy).toHaveBeenCalledWith(name); // Memastikan fungsi dipanggil dengan nama yang benar
    });
});
