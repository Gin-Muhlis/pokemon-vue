import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/pokemon/:name',
        name: 'pokemon-detail',
        component: () => import('@/views/DetailPokemon.vue')
    },
    {
        path: '/mypokemon',
        name: 'mypokemon',
        component: () => import('@/views/Catched.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

