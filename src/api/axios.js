import axios from 'axios'
// import store from '@/store'
import router from '@/router'
// import storage from '@/utils/storage'
import { getToken } from './cookie'
import qs from 'qs'
import { Toast } from 'vant'
import { codeMessage } from '@/lang/codeMessage'
import Vue from '../main'

// const PRODUCT_URL = 'http://h5.kuaizhuan168.com/api'
// const PRODUCT_URL = 'http://192.168.1.8:5858/api'
// const MOCK_URL = `${window.location.origin}/api`
// const LANG = store.state.language
// axios.defaults.transformRequest = (data) => qs.stringify(data)  // 接口请求前将所传参数序列化
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000
const headerType = {
    defalut: 'application/x-www-form-urlencoded',
    json: 'application/json;charset=utf-8',
    fromData: 'multipart/form-data'
}
// 判断请求是否需要Loading效果
let needLoading = ''
// 缓存接口
// const CACHEQUEUE = {}
// 请求拦截
axios.interceptors.request.use(
    config => {
        const { headers, data } = config

        if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            config.data = qs.stringify(data)
        } else {
            config.data = data
        }
        config.headers.language = localStorage.getItem("lang") === null ? 'es' : localStorage.getItem("lang")
        if (getToken()) {
            config.headers.acctoken = getToken()
        }
        // if (headers['Content-Type'] === 'multipart/form-data') {
        //     delete config.headers.acctoken
        // }
        if (needLoading) {
            Toast.loading({
                duration: 10000,
                message: 'On request...',
                mask: true
            })
        }
        return config
    },
    error => {
        Toast.fail({
            mask: true,
            message: 'request was aborted',
            duration: 1000
        })
        return Promise.reject(error)
    }
)

// 响应拦截
axios.interceptors.response.use(
    response => {
        const res = response.data
        // if (res.result) {
        //     return Promise.resolve(response)
        // }
        if (res.status * 1 === 1) {
            // const url = response.config.url
            // 缓存接口数据
            // if (CACHEQUEUE[url]) {
            //     const type = `${CACHEQUEUE[url]}Set`
            //     storage[type](url, res)
            // }
            Toast.clear()
        } else if (res.status * 1 === 401) {
            // Toast({
            //     message: res.info,
            //     duration: 2000
            // })
            router.push({
                path: '/login'
            })
        } else {
            Toast.clear()
            const lang = Vue.$i18n.locale
            const status = res.status
            Toast({
                message: codeMessage(status, lang),
                duration: 1000
            })
        }
        return Promise.resolve(response)
    },
    error => {
        Toast({
            message: 'request was aborted',
            duration: 1000
        })
        return Promise.reject(error)
    }
)

/**
 * get方法，对应get请求
 * String url 请求的url地址
 * Object params 请求时携带的参数
 * Boolean noLoading 是否请求时加载Loading，默认加载
 * ssCache 是否缓存数据
 */
export function get({ url, params, needLoadingValue, cacheType }) {
    // if (cacheType) {
    //     const type = `${cacheType}Get`
    //     CACHEQUEUE[url] = cacheType
    //     if (storage[type](url)) {
    //         return Promise.resolve(storage[type](url))
    //     }
    // }
    needLoading = needLoadingValue ? true : ''
    return new Promise((resolve, reject) => {
        if (url === '/getCaptchaImage') {
            axios
                .get(url, { params, responseType: 'blob' })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err.data)
                })
        } else {
            axios
                .get(url, { params }, { cache: false })
                .then(res => {
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err.data)
                })
        }

    })
}

/**
 * post方法，对应post请求
 * String url 请求的url地址
 * Object params 请求时携带的参数
 * Boolean noLoading 是否请求时加载Loading，默认加载
 */
export function post({ url, params, needLoadingValue, header = 'defalut' }) {
    needLoading = needLoadingValue ? true : ''
    return new Promise((resolve, reject) => {
        axios
            .post(url, params, { headers: { 'Content-Type': headerType[header] } })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
