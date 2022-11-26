import {createRouter,createWebHashHistory }from 'vue-router'
import christmas from '@/pages/christmas/index.vue'


const routes = [
    {
        path: '/',
        redirect: '/christmas'
    },
    {
        path: '/christmas',
        component: christmas,
        meta: {
            title: '🎊⛄🎅🎄🎊'
        }
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        // @ts-ignore
        document.title = to.meta.title
    }
    next()
})