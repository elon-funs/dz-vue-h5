<template>
    <div>
        <van-radio-group v-model="radio" @change="valueFn">
            <van-radio name="1">{{$t('app.line')}}1</van-radio>
            <van-radio name="2">{{$t('app.line')}}2</van-radio>
        </van-radio-group>
    </div>
</template>

<script>
export default {
    name: 'Lineselect',
    data () {
        return {
            radio: this.$storage.lsGet('line') || '1'
        }
    },
    methods: {
        valueFn () {
            this.$storage.lsSet('line', this.radio)
        }
    }
}
</script>

<style lang='scss' scoped>
::v-deep.van-radio {
    background-color: white;
    padding: 10px 20px;
}
</style>
