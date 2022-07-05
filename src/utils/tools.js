import { Toast } from 'vant'
// import { needClearCache } from '@/config'
// import storage from './storage'
import Vue from '../main'

/**
 * @description: 表单验证
 * @param {Obj}
 * @return: 布尔值
 */
export const valiForm = (rules, data) => {
    let flag = true
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key]
            if (rules[key].required) {
                if (!element || !rules[key].reg.test(element)) {
                    Toast({
                        message: Vue.$t(rules[key].msg),
                        mask: true,
                        duration: 1000
                    })
                    flag = false
                    break
                } else {
                    flag = true
                }
            } else {
                if (element) {
                    if (!rules[key].reg.test(element)) {
                        Toast({
                            message: Vue.$t(rules[key].msg),
                            mask: true,
                            duration: 1000
                        })
                        flag = false
                        break
                    }
                } else {
                    flag = true
                }
            }
        }
    }
    return flag
}

/**
 * @description: token失效重新登錄,需要清除的緩存
 */
export const clearCache = () => {
    const clearCacheObj = {
        ss (arr) {
            arr.forEach(item => {
                sessionStorage.removeItem(item)
            })
        },
        ls (arr) {
            arr.forEach(item => {
                localStorage.removeItem(item)
            })
        }
    }
    for (const key in needClearCache) {
        clearCacheObj[key](needClearCache[key])
    }
}

// 日期格式化
/**
 * @description: 日期格式化
 * @param: date  时间对象
 * 例如转时分秒：monent(new Date(时间戳)).format('hh:mm:ss')
 */
export const monent = (date = new Date()) => {
    class Monent {
        constructor (date) {
            this.date = date
        }

        returZero (num) {
            return num * 1 < 10 ? `0${num}` : num
        }

        before (day) {
            let dateTime = this.date.getTime()
            dateTime -= day * 60 * 60 * 24 * 1000
            this.date = new Date(dateTime)
            return this
        }

        format (str) {
            const year = this.date.getFullYear()
            const month = this.date.getMonth() + 1
            const day = this.date.getDate()
            const hour = this.date.getHours()
            const minute = this.date.getMinutes()
            const secouds = this.date.getSeconds()
            // 时间格式
            const obj = {
                YYYY: year,
                MM: month,
                DD: day,
                hh: hour,
                mm: minute,
                ss: secouds
            }
            for (const key in obj) {
                const reg = new RegExp(key)
                const val = this.returZero(obj[key])
                str = str.replace(reg, () => {
                    return val
                })
            }
            return str
        }
    }
    return new Monent(date)
}
// 数组对象排序
export const objectSort = (property) => {
    return function (a, b) {
        const val1 = a[property]
        const val2 = b[property]
        return val1 - val2
    }
}
