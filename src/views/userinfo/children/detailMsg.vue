<template>
    <div>
        <van-cell-group>
            <van-field v-model="value" :label="$t('app.zhenshi') + '：'" :placeholder="$t('app.tips_nametips')" />
        </van-cell-group>
        <div class="btn_com fs16">{{$t('app.submit')}}</div>
    </div>
</template>

<script>
export default {
    name: 'DetailMsg',
    data () {
        return {
            value: ''
        }
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
.van-cell-group {
    margin-top: 10px;
}
</style>
