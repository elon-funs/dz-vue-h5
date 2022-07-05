/**
 * @description: 充值vip
 */
import { doReflushGoldnumBalance, memberLevel } from '@/api'
import { getToken } from '@/api/cookie'

export default {
    data () {
        return {
            yue: 0,
            userLevel: {}
        }
    },
    methods: {
        async _doReflushGoldnumBalance () {
            this.$storage.ssRm('yue')
            const { data } = await doReflushGoldnumBalance()
            this.yue = data
        },
        async _memberLevel () {
            const { data } = await memberLevel()
            this.userLevel = data
        }
    },
    created () {
        if (getToken()) {
            this._doReflushGoldnumBalance()
        }
    }
}
