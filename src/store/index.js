import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'js-cookie'
import storage from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        keepAliveComponents: [],
        language: storage.lsGet('lang') || 'zh',
        webViewQuery: cookie.get('webViewQuery') || {}
    },
    mutations: {
        set_keepAliveFn (state, component) {
            !state.keepAliveComponents.includes(component) && state.keepAliveComponents.push(component)
        },
        set_language (state, v) {
            storage.lsSet('lang', v)
            state.language = v
        },
        set_webViewQuery (state, v) {
            cookie.set('webViewQuery', v)
            state.webViewQuery = v
        }
    },
    actions: {
    },
    modules: {
    }
})
