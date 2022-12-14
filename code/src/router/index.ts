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
            title: '๐โ๐๐๐'
        }
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
router.beforeEach((to, from, next) => {
    /* ่ทฏ็ฑๅ็ๅๅไฟฎๆน้กต้ขtitle */
    if (to.meta.title) {
        // @ts-ignore
        document.title = to.meta.title
    }
    next()
})