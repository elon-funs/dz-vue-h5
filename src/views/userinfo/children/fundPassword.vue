<template>
    <div>
        <van-cell-group :border="false">
            <van-field :border="false" v-if="status" maxlength="6" type="password" clearable v-model="oldvalue" :label="$t('app.old_zj_passwrod')" :placeholder="$t('app.tips_zj_oldpasswrod')" />
            <van-field :border="false" type="password" maxlength="6" clearable v-model="newvalue" :label="$t('app.new_zj_passwrod')" :placeholder="$t('app.tips_zj_newpasswrod')" />
            <van-field :border="false" type="password" maxlength="6" clearable v-model="okvalue" :label="$t('app.ok_password')" :placeholder="$t('app.please_ok_passwrod')" />
        </van-cell-group>
        <div class="btn_com fs16" @click="postFn">{{$t('app.submit')}}</div>
    </div>
</template>

<script>
import { savePayPassword, updatePayPassword, findPayPassAndAccount } from '@/api'
export default {
    name: 'FundPassword',
    data () {
        return {
            oldvalue: '',
            newvalue: '',
            okvalue: '',
            status: this.$storage.ssGet('userStatus').isPayPass
        }
    },
    methods: {
        postFn () {
            if (!this.status) {
                // 未设置资金密码
                if (this.newvalue !== this.okvalue) {
                    this.$toast({ message: `${this.$t('app.tips_password')}` })
                    return
                }
                const obj = {
                    paypassword: this.$md5(this.newvalue)
                }
                savePayPassword(obj).then(res => {
                    if (res.status == '1') {
                        this.$toast({ message: `${this.$t('app.tips_setpassword')}` })
                        findPayPassAndAccount().then(res => {
                            this.$storage.ssRm('userStatus')
                            this.$storage.ssSet('userStatus', res.data)
                            this.$router.push({ path: '/userinfo' })
                        })
                    } else {
                        this.$toast({
                            message: this.$t(res.status)
                        })
                    }
                })
            } else {
                // 修改资金密码
                if (this.newvalue !== this.okvalue) {
                    this.$toast({ message: `${this.$t('app.tips_inputpassword')}` })
                    return
                }
                const obj = {
                    oldpassword: this.$md5(this.oldvalue),
                    paypassword: this.$md5(this.newvalue)
                }
                updatePayPassword(obj).then(res => {
                    if (res.status == '1') {
                        this.$toast({ message: `${this.$t('app.tips_updatesuccess')}` })
                        this.$router.push({ path: '/userinfo' })
                    } else {
                        this.$toast({
                            message: res.info
                        })
                    }
                })
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/vant.scss';

.van-cell-group {
    margin-top: 10px;
}
</style>
