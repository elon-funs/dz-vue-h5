<template>
    <div>
        <van-field v-model="topmoney" type="digit" :label="$t('app.amount') + '：'" :placeholder="$t('app.tips_topupje')" />
        <div style="text-align: center;">
            <van-button type="info" @click="chongzhi">{{$t('app.topup_lk')}}</van-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dsftopupdata: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            topmoney: ''
        }
    },
    methods: {
        chongzhi () {
            const obj = {
                money: this.topmoney,
                providerid: this.dsftopupdata.providerid,
                tpaysetid: this.dsftopupdata.tpaysetid,
                type: 'WECHAT'
            }
            this.$emit('gochongzhi', obj)
        }
    }
}
</script>

<style lang='scss' scoped>
::v-deep.van-button {
    margin-top: 20px;
    height: 35px;
    width: 200px;
}
</style>
