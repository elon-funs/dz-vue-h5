import router from '@/router'
import { getToken } from '@/api/cookie'
import store from '@/store'
const whitePath = ['/login', '/register']
router.beforeEach((to, from, next) => {
    // 需要缓存组件
    if (to.meta.keepAlive) {
        store.commit('set_keepAliveFn', to.name)
    }
    if (!to.meta.requireAuth) {
        if (getToken()) {
            if (to.path === '/login') {
                next({ path: '/' })
            } else {
                next()
            }
        } else {
            if (whitePath.indexOf(to.path) !== -1) {
                next()
            } else {
                next({ path: '/login' })
            }
        }
    } else {
        next()
    }
})
