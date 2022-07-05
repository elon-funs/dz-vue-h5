import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Locale } from 'vant'
// import storage from '@/utils/storage'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
import esES from 'vant/lib/locale/lang/es-ES'
import frFR from './fr-FR'
// import viVN from './vi-VN'// 越南语
// import enLocale from './en_us'
// import zhLocale from './zh_cn'
// import viLocale from './vi_vn'
// import lang from '@/lang/lang'
import { zhapp, zhcode } from '@/lang/zh'
import { enapp, encode } from '@/lang/en'
import { esapp, escode } from '@/lang/es'
import { frapp, frcode } from '@/lang/fr'
import { arapp, arcode } from '@/lang/ar'

// console.log(lang)
// const ZH = {
//     app: {},
//     code: {}
// }
// lang.app.map(v => {
//     ZH.app[v['中文'].split(':')[0]] = v['西班牙语']
// })
// lang.code.map(v => {
//     ZH.code[v['中文'].split(':')[0]] = v['西班牙语']
// })
// console.log(JSON.stringify(ZH.app))
// console.log(JSON.stringify(ZH.code))

Vue.use(VueI18n)

const messages = {
    en: {
        ...{
            app: enapp
        },
        ...encode,
        ...enUS
    },
    zh: {
        ...{
            app: zhapp
        },
        ...zhcode,
        ...zhCN
    },
    es: {
        ...{
            app: esapp
        },
        ...escode,
        ...esES
    },
    fr: {
        ...{
            app: frapp
        },
        ...frapp,
        ...frcode
    },
    ar: {
        ...{
            app: arapp
        },
        ...arcode,
        ...enUS
    }
    // vie: {
    //     ...viVN,
    //     ...viLocale
    // }
}

const i18n = new VueI18n({
    locale: 'es', // 设置默认语言
    messages: messages // 设置资源文件对象
})

// 更新vant组件库本身的语言变化，支持国际化
function vantLocales (lang) {
    if (lang === 'en') {
        Locale.use(lang, enUS)
    }
    if (lang === 'zh') {
        Locale.use(lang, zhCN)
    }
    if (lang === 'es') {
        Locale.use(lang, esES)
    }
    if (lang === 'fr') {
        Locale.use(lang, frFR)
    }
    if (lang === 'ar') {
        Locale.use(lang, enUS)
    }
}

export { i18n, vantLocales }
