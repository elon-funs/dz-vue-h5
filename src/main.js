import './styles/index.scss'
import 'amfe-flexible'
// import 'vant/lib/icon/local.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import storage from './utils/storage'
import md5 from 'js-md5'
import { monent } from './utils/tools'
import './utils/vantComponents'
import './intercept'
import '@/components/svgIcon/index.js'
import { i18n, vantLocales } from './lang'
i18n.locale = storage.lsGet('lang') || 'es'
vantLocales(i18n.locale)

Vue.config.productionTip = false
Vue.config.performance = process.env.NODE_ENV !== 'production'
Vue.prototype.$storage = storage
Vue.prototype.$md5 = md5
Vue.prototype.$monent = monent

export default new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
