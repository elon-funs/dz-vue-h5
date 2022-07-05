<template>
    <div>
        <van-cell v-for="(item, index) of listData" :key="index" center :title="item.source" :value="item.integral" :label="item.createTime" />
        <div class="nodata" v-if="listData.length == 0">{{$t('app.no_data')}}</div>
    </div>
</template>

<script>
import { memberCreditDetailLst } from '@/api'
export default {
    name: 'Xingyong',
    data () {
        return {
            listData: [],
            params: {
                pageNo: 1,
                pageSize: 10
            }
        }
    },
    methods: {
        sjcFn (i) {
            return this.$monent(new Date(i)).format('YYYY-MM-DD hh:mm:ss')
        }
    },
    created () {
        memberCreditDetailLst(this.params).then(res => {
            this.listData = res.data.list
        })
    }
}
</script>

<style lang='scss' scoped>
::v-deep.van-cell__value {
    color: #4087F1;
}
.nodata {
    text-align: center;
    padding: 15px;
}
</style>
