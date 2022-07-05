<template>
    <div>
        <div class="itemWrap" v-for="(item, index) of listArr" :key="index">
            <div class="left">
                <div class="img"><img :src="item.taskIcon" /></div>
                <div class="name">{{item.categoryName}}</div>
                <div class="btn fs12 bg_font">{{item.taskLevel}}</div>
            </div>
            <div class="center">
                <span class="font_ellipsis">{{item.taskRequire}}</span>
                <div>{{$t('app.receive_user')}}：{{item.mobile}}</div>
                <div>{{$t('app.receive_date')}}：{{item.createTime}}</div>
                <div>{{$t('app.update_date')}}：{{item.updateTime}}</div>
            </div>
            <div class="right">
                <div>USDT：<span style="color: #1A8AFB">{{item.price}}</span></div>
                <div v-if="status == 1" class="lingqu" style="color: rgb(247, 196, 30);">{{$t('app.task_jxz')}}</div>
                <div v-if="status == 2" class="lingqu" style="color: #3442FF;">{{$t('app.task_shz')}}</div>
                <div v-if="status == 3" class="lingqu" style="color: #FF3434;">{{$t('app.task_ywc')}}</div>
                <div v-if="status == 4" class="lingqu" style="color: #9A9A9A;">{{$t('app.task_ysb')}}</div>
                <div v-if="status == 2" class="sh" @click="gosh(item)">{{$t('app.sh')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        listArr: {
            type: Array,
            default: () => []
        },
        status: Number
    },
    data () {
        return {
        }
    },
    methods: {
        gosh (item) {
            this.$router.push({ path: '/shdetail', query: { item } })
        }
    },
    created () {
    }
}
</script>

<style lang='scss' scoped>
.itemWrap {
    display: flex;
    margin: 10px;
    border-radius: 5px;
    background-color: #fff;
    height: 106px;
    .left {
        width: 110px;
        padding: 10px 15px;
        box-sizing: border-box;
        text-align: center;
        .name {
            margin: 3px 0;
        }
        .img {
            width: 50px;
            height: 50px;
            margin: 0 auto;
            text-align: center;
            img {
                width: 100%;
            }
        }
        .btn {
            padding: 3px 3px;
            border-radius: 3px;
        }
    }
    .center {
        padding: 12px 0;
        width: 180px;
        line-height: 1.3;
        overflow: hidden;
        >div {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }
    }
    .right {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        flex: 1;
        padding: 12px 0;
        .sh {
            padding: 3px 10px;
            border-radius: 5px;
            margin-top: 10px;
            background-color: #1A8AFA;
            color: #fff;
        }
        .lingqu {
            padding-top: 15px;
        }
    }
}
</style>
