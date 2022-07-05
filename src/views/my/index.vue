<template>
    <div class="my">
        <mytop :userInfo='userInfo' :yue="yue"></mytop>
        <mytable :tableData='tableData'></mytable>
        <mybottomnav @outLogin="outLogin"></mybottomnav>
        <div class="out-login">
        <!-- <div class="outLogin fs18" @click="outLogin">
            {{$t('app.out_login')}}
        </div> -->
        </div>
    </div>
</template>

<script>
import { findPayPassAndAccount, doReflushGoldnumBalance, myPageCount, logout } from '@/api'
import mytop from './components/myTop'
import mytable from './components/myTable'
import mybottomnav from './components/myBottomnav'
import { removeToken } from '@/api/cookie'

export default {
    name: 'My',
    data () {
        return {
            userInfo: {},
            yue: 0,
            tableData: {}
        }
    },
    components: {
        mytop,
        mytable,
        mybottomnav
    },
    methods: {
        async outLogin () {
            await logout()
            this.$toast({
                message: `${this.$t('app.out_success')}`,
                duration: 1500
            })
            removeToken()
            // this.$storage.lsRm('lang')
            this.$storage.lsRm('userInfo')
            this.$router.push({ path: '/login' })
        },
        async _doReflushGoldnumBalance () {
            const { data } = await doReflushGoldnumBalance()
            this.yue = data.goldnum
            this.$storage.ssSet('yue', data.goldnum)
        },
        async _myPageCount () {
            const { data } = await myPageCount()
            this.tableData = data
        }
    },
    created () {
        this.userInfo = this.$storage.lsGet('userInfo')
        findPayPassAndAccount().then(res => {
            this.$storage.ssSet('userStatus', res.data)
        })
        this._doReflushGoldnumBalance()
        this._myPageCount()
    }
}
</script>

<style lang='scss' scoped>
.out-login {
    padding-bottom: 1px;
    height: 65px;
}

.outLogin {
    width: 320px;
    height: 44px;
    color: #fff;
    border-radius: 20px;
    margin: 0 auto 80px;
    text-align: center;
    line-height: 44px;
    background: linear-gradient(to right, #2ED8FF, #044DE7);
}
</style>
