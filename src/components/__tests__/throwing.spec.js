import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Throwing from '../detailPokemon/Throwing.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useDetailPokemonStore } from '../../stores/detailPokemonStore.js';

describe('Throwing.vue', () => {
    let pinia;
    const dataProps = {
        id: '1',
        name: 'Pikachu',
        image: '/images/pikachu.png',
        nickname: 'Sparky',
        number: '0001',
        isDelete: false,
    }

    beforeEach(() => {
        pinia = createPinia();
        setActivePinia(pinia);
    });

    // cek apakah button catch menampilkan nama pokemon dengan benar
    it('renders the button with the Pokemon name', () => {
        const store = useDetailPokemonStore();

        store.pokemonDetail = { name: 'Pikachu' };

        const wrapper = mount(Throwing, {
            props: {
                pokemon: dataProps
            },
            global: { plugins: [pinia] },
        });

        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
        expect(button.text()).toContain('Catch Pikachu');
    });

    // cek apakah modal muncul
    it('shows the modal when the button is clicked', async () => {
        const store = useDetailPokemonStore();

        store.pokemonDetail = { name: 'Pikachu' };

        const wrapper = mount(Throwing, {
            props: {
                pokemon: dataProps
            },
            global: { plugins: [pinia] },
        });

        // Mock modal
        const modal = wrapper.find('dialog');
        modal.element.showModal = vi.fn();

        const button = wrapper.find('button');
        await button.trigger('click');

        expect(modal.exists()).toBe(true);
        expect(modal.element.showModal).toHaveBeenCalled(); // Check if showModal was called
    });

    // cek apakah status menjadi throwing ketika button lempak poke ball diklik
    it('changes status to "throwing" when the button is clicked', async () => {
        const store = useDetailPokemonStore();

        const wrapper = mount(Throwing, {
            props: { pokemon: dataProps },
            global: { plugins: [pinia] },
        });

        // Mock modal
        const modal = wrapper.find('dialog');
        modal.element.showModal = vi.fn();

        const button = wrapper.find('button');
        await button.trigger('click');

        expect(store.statusCatch).toBe('throwing');
    });

    // cek function menangkap pokemon dijalankan setelah 2 detik
    it('calls isCatchingPokemon after 2 seconds', async () => {
        const store = useDetailPokemonStore();
        const spy = vi.spyOn(store, "isCatchingPokemon");

        vi.useFakeTimers();

        const pokemon = { name: 'Pikachu' };
        const wrapper = mount(Throwing, {
            props: { pokemon },
            global: { plugins: [pinia] },
        });

        // Mock modal
        const modal = wrapper.find('dialog');
        modal.element.showModal = vi.fn();
        modal.element.close = vi.fn();

        const button = wrapper.find('button');
        await button.trigger('click');

        // majukan waktu 2 detik
        vi.advanceTimersByTime(2000);

        expect(spy).toHaveBeenCalled();
    });

    // cek apakah teks "Throwing Pokeball..." muncul ketika poke ball dilempar (statusCatch = throwing)
    it('shows "Throwing Pokeball..." when statusCatch is "throwing"', async () => {
        const store = useDetailPokemonStore();
        const wrapper = mount(Throwing, {
            props: { pokemon: dataProps },
            global: { plugins: [pinia] },
        });

        store.statusCatch = 'throwing';
        await wrapper.vm.$nextTick();

        const throwingText = wrapper.find('.text-throwing');
        expect(throwingText.text()).toBe('Throwing Pokeball...');
    });

    // cek apakah pesan pokemon melarikan diri muncul ketika gagal menangkap pokemon
    it('shows the Pokemon run message when statusCatch is "run"', async () => {
        const store = useDetailPokemonStore();
        const wrapper = mount(Throwing, {
            props: { pokemon: dataProps },
            global: { plugins: [pinia] },
        });

        store.statusCatch = 'run';
        await wrapper.vm.$nextTick();
        const runMessage = wrapper.find('.text-pokemon-run');
        expect(runMessage.text()).toContain('Oops Pikachu run...');
    });

    // cek pesan sukses ketika berhasil menangkap pokemon
    it('shows the catch success message when statusCatch is "catching"', async () => {
        const store = useDetailPokemonStore();
        const wrapper = mount(Throwing, {
            props: { pokemon: dataProps },
            global: { plugins: [pinia] },
        });

        store.statusCatch = 'catching';
        await wrapper.vm.$nextTick();

        const successMessage = wrapper.find('.text-catch-success');
        expect(successMessage.text()).toContain('Wow you catch Pikachu...');
    });


    // cek apakah fungsi untuk menyimpan data pokemon yang ditangkap terpanggil
    it('calls store.catchingPokemon when Catch button is clicked', async () => {
        const store = useDetailPokemonStore();
        const spy = vi.spyOn(store, "catchingPokemon");

        const wrapper = mount(Throwing, {
            props: { pokemon: dataProps },
            global: { plugins: [pinia] },
        });


        store.statusCatch = 'catching';
        await wrapper.vm.$nextTick();

        const catchButton = wrapper.find('button.bg-sky-400');
        await catchButton.trigger('click'); // Trigger click

        expect(spy).toHaveBeenCalledWith(dataProps);
    });
});
