import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises  } from '@vue/test-utils'
import DetailPokemon from '../../views/Detail-Pokemon.vue'
import Alert from '../Alert.vue'
import Loading from '../Loading.vue'
import About from '../detailPokemon/About.vue'
import Stats from '../detailPokemon/Stats.vue'
import Moves from '../detailPokemon/Moves.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useDetailPokemonStore } from '../../stores/detailPokemonStore'
import { useCatchedPokemonStore } from '../../stores/catchedPokemonStore'
import { nextTick } from 'vue'

// Mock useRoute
vi.mock('vue-router', () => ({
    useRoute: () => ({
        params: { name: 'pikachu' }
    }),
}))

describe('Detail-Pokemon.vue', () => {
    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
    });

    // cek apakah error message muncul ketika ada error
    it('renders error message when error is present', async () => {
        const detailPokemonStore = useDetailPokemonStore();
        detailPokemonStore.error = 'An error occurred';

        // mount komponen
        const wrapper = mount(DetailPokemon, {
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>',
                    },
                },
            },
        });

        // cek apakah error muncul
        expect(wrapper.findComponent(Alert).exists()).toBe(true);
        expect(wrapper.findComponent(Alert).props('message')).toBe('An error occurred');
    });

    // cek apakah loading muncul ketika isloading true
    it('renders loading component when isLoading is true', async () => {
        const detailPokemonStore = useDetailPokemonStore();
        detailPokemonStore.isLoading = true;

        // mount komponen
        const wrapper = mount(DetailPokemon, {
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>',
                    },
                },
            },
        });

        expect(wrapper.findComponent(Loading).exists()).toBe(true);
    });

    // cek apakah detail pokemon muncul
    it('renders pokemon detail when isLoading is false and no error', async () => {
        const detailPokemonStore = useDetailPokemonStore();
        const catchedPokemonStore = useCatchedPokemonStore();

        // set state
        detailPokemonStore.isLoading = false;
        detailPokemonStore.pokemonDetail = {
            id: 1,
            name: 'Pikachu',
            sprites: {
                other: {
                    'official-artwork': {
                        front_default: 'https://example.com/pikachu.png',
                    }
                }
            },
        };

        catchedPokemonStore.isCatchedPokemon = vi.fn().mockReturnValue(true);

        // mount komponen
        const wrapper = mount(DetailPokemon)

        // cek data pokemon yang ditampilkan
        expect(wrapper.text()).toContain('#0001');
        expect(wrapper.text()).toContain('Pikachu');
        expect(wrapper.find('img.pokemon-image').attributes('src')).toBe('https://example.com/pikachu.png');
    });

    it('renders correct tab content based on the selected tab', async () => {
        const detailPokemonStore = useDetailPokemonStore();

        // set state
        detailPokemonStore.isLoading = false;
        detailPokemonStore.pokemonDetail = {
            id: 1,
            name: 'Pikachu',
            sprites: {
                other: {
                    'official-artwork': {
                        front_default: 'https://example.com/pikachu.png',
                    }
                }
            },
        };
        detailPokemonStore.tab = 'About';

        // mount komponen
        const wrapper = mount(DetailPokemon, {
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>',
                    },
                },
            },
        });

        // cek komponen about ketika state tab = 'About'
        expect(wrapper.findComponent(About).exists()).toBe(true);
        expect(wrapper.findComponent(Stats).exists()).toBe(false);
        expect(wrapper.findComponent(Moves).exists()).toBe(false);

        // cek komponen stats ketika state tab = 'Stats'
        detailPokemonStore.tab = 'Stats'
        detailPokemonStore.isLoading = false
        
        await flushPromises();

        expect(wrapper.findComponent(About).exists()).toBe(false);
        expect(wrapper.findComponent(Stats).exists()).toBe(true);
        expect(wrapper.findComponent(Moves).exists()).toBe(false);

        // cek komponen moves ketika state tab = 'Moves'
        detailPokemonStore.tab = 'Moves'
        detailPokemonStore.isLoading = false
        
        await flushPromises();

        expect(wrapper.findComponent(About).exists()).toBe(false);
        expect(wrapper.findComponent(Stats).exists()).toBe(false);
        expect(wrapper.findComponent(Moves).exists()).toBe(true);

    });
});
