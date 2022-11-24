import {createRouter,createWebHashHistory }from 'vue-router'
import christmas from '@/pages/christmas/index.vue'


const routes = [
    {
        path: '/',
        redirect: '/christmas'
    },
    {
        path: '/christmas',
        component: christmas
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})