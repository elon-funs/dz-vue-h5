import Vue from 'vue'
import VueRouter from 'vue-router'
import my from './route/my'
import task from './route/task'

Vue.use(VueRouter)
// 解决vue-router3.0版本以上重复路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

// requireAuth: 是否需要tokne的路由
// nonavBar: 是否需要底部导航
// noHeader: 是否需要顶部组件
// showBack: 是否显示返回icon
// keepAlive：是否缓存组件
// languageSelect: 顶部支持语言选择
// changeLine: 切换线路
// needLogo:  顶部需要logo

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    // 首页
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: {
            requireAuth: true,
            changeLine: true,
            languageSelect: true,
            needLogo: true,
            lang: true
        }
    },
    // 任务
    {
        path: '/task',
        name: 'Task',
        component: () => import('@/views/task'),
        meta: {
            title: 'app.tasklist',
            showBack: true
        }
    },
    // vip
    {
        path: '/vip',
        name: 'Vip',
        component: () => import('@/views/vip'),
        meta: {
            requireAuth: true,
            title: 'vip',
            noHeader: true
            // keepAlive: true
        }
    },
    // 收益
    {
        path: '/earnings',
        name: 'Earnings',
        component: () => import('@/views/earnings'),
        meta: {
            requireAuth: true,
            noHeader: true,
            keepAlive: true
        }
    },
    // 我的
    {
        path: '/my',
        name: 'My',
        component: () => import('@/views/my'),
        meta: {
            noHeader: true
            // keepAlive: true
        }
    },
    // 登录
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login'),
        meta: {
            requireAuth: true,
            showBack: true,
            nonavBar: true,
            languageSelect: true,
            noHeader: true
        }
    },
    // 注册
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/register'),
        meta: {
            noHeader: true,
            requireAuth: true,
            // showBack: true,
            nonavBar: true,
            languageSelect: true
        }
    },
    // 客服
    {
        path: '/customerService',
        name: 'customerService',
        component: () => import('@/views/customerService/customerService.vue'),
        meta: {
            title: 'app.zxkf',
            noHeader: false,
            requireAuth: true,
            // showBack: true,
            nonavBar: true,
            showBack: true
        }
    }
]

export default new VueRouter({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 20)
    },
    routes: [...routes, ...my, ...task]
})
