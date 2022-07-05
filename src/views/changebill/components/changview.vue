<template>
    <div>
        <div class="item" v-for="(item, index) of listdata" :key="index" @click="handelCilck(item)">
            <div class="btm">
                <span class="fs14 fontW ">{{ $t(`app.${item.changetype === 55 ? 1 : (item.changetype === 10 ? 12 : item.changetype)}`)}}</span>
                <span class="moneyW text1" style="float: right; ">{{item.quantity}}</span>
            </div>
            <div>
                <span class="fs12" style="color: #999999;">{{item.createTime}}</span>
                <!-- <span class="fs12" style="float: right;" :style="{'color': item.status == '已完成' ? '#333333' : '#FF4053'}">{{item.prename}}</span> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        listdata: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
        }
    },
    methods: {
        handelCilck (item) {
            console.log(item)
        }
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/vant.scss';

.item {
    background-color: $bg1;
    border-bottom: 1px solid $bg2;
    padding: 12px 20px;
    .btm {
        margin-bottom: 15px;
        display: flex;
        .fontW {
            display: block;
            width: 50%;
            // overflow: hidden;
            // white-space: nowrap;
        }
        .moneyW {
            flex: 1;
            text-align: right;
        }
    }
}
</style>
