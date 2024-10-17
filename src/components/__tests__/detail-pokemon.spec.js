import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils'
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
        const wrapper = mount(DetailPokemon, {
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>',
                    },
                },
            },
        });

        expect(wrapper.findComponent(Alert).exists()).toBe(true);
        expect(wrapper.findComponent(Alert).props('message')).toBe('An error occurred');
    });

    // cek apakah loading muncul ketika isloading true
    it('renders loading component when isLoading is true', async () => {
        const detailPokemonStore = useDetailPokemonStore();
        detailPokemonStore.isLoading = true;

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

        const wrapper = mount(DetailPokemon)

        expect(wrapper.text()).toContain('#0001');
        expect(wrapper.text()).toContain('Pikachu');
        expect(wrapper.find('img.pokemon-image').attributes('src')).toBe('https://example.com/pikachu.png');
    });

    it('renders correct tab content based on the selected tab', async () => {
        const detailPokemonStore = useDetailPokemonStore();
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

        const wrapper = mount(DetailPokemon, {
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>',
                    },
                },
            },
        });

        expect(wrapper.findComponent(About).exists()).toBe(true);
        expect(wrapper.findComponent(Stats).exists()).toBe(false);
        expect(wrapper.findComponent(Moves).exists()).toBe(false);

        detailPokemonStore.tab = 'Stats'
        
        await wrapper.vm.$nextTick();

        expect(wrapper.findComponent(About).exists()).toBe(false);
        expect(wrapper.findComponent(Stats).exists()).toBe(true);
        expect(wrapper.findComponent(Moves).exists()).toBe(false);

    });
});
