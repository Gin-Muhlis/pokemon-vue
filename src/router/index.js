import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/pokemon/:name',
        name: 'pokemon-detail',
        component: () => import('../views/Detail-Pokemon.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

