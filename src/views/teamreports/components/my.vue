<template>
    <div>
        <div class="dateWrap">
            <input v-model="oneDate" class="inp" type="text" @focus="selectFn(1)">
            &nbsp;<span style="color: #999999">-</span>&nbsp;
            <input v-model="twoDate" class="inp" type="text" @focus="selectFn(2)">
            <div class="btn bg_font centerY" @click="sousuo">{{this.$t('app.searchText')}}</div>
        </div>
        <div class="tabhead">
            <div v-for="(item, index) of headList" :key="index">{{$t(item)}}</div>
        </div>
        <ul class="tabContent" ref="tabWrap">
            <li v-for="(item, index) of tuanduiData" :key="index">
                <td class="font_ellipsis">{{item.memberName}}</td>
                <!-- <td>{{item.recharge || 0}}</td>
                <td>{{item.withdrawal || 0}}</td> -->
                <td>{{item.spread || 0}}</td>
                <td>{{item.brokerage || 0}}</td>
            </li>
            <div class="nodata fs12" v-if="!lodding">{{$t('app.nodata_l')}}</div>
            <van-loading size="18" text-size='12' v-if="lodding" type="spinner" vertical>{{$t('app.lodding_z')}}...</van-loading>
        </ul>
    </div>
</template>

<script>
const TABHEAD = ['app.user', 'app.returnBate', 'app.czfy']
export default {
    props: {
        oneDate: {
            type: String,
            default: ''
        },
        twoDate: {
            type: String,
            default: ''
        },
        tuanduiData: {
            type: Array,
            default: () => []
        },
        lodding: Boolean
    },
    data () {
        return {
            headList: Object.freeze(TABHEAD)
        }
    },
    methods: {
        sousuo () {
            this.$emit('sousuo')
        },
        selectFn (num) {
            this.$emit('setDate', num)
        },
        lazyLoading () {
            const scrollTop = this.$refs.tabWrap.scrollTop
            const clientHeight = this.$refs.tabWrap.clientHeight
            const scrollHeight = this.$refs.tabWrap.scrollHeight
            if (scrollTop + clientHeight >= scrollHeight) {
                this.$emit('lazyFn')
            }
        }
    },
    mounted () {
        console.log(this.$refs.tabWrap.scrollTop, this.$refs.tabWrap.clientHeight, this.$refs.tabWrap.scrollHeight)
        window.addEventListener('scroll', this.lazyLoading, true)
    },
    destroyed () {
        // 页面离开后销毁，防止切换路由后上一个页面监听scroll滚动事件会在新页面报错问题
        window.removeEventListener('scroll', this.lazyLoading, true)
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/vant.scss';

.dateWrap {
    position: relative;
    margin-top: 8px;
    padding: 10px;
    background-color: $bg2;
    border-bottom: 1px solid $bg2;
    .inp {
        border: 1px solid $color2;
        text-align: center;
        width: 100px;
        height: 23px;
        border-radius: 5px;
        background: $bg2;
    }
    .btn {
        position: absolute;
        right: 10px;
        border-radius: 3px;
        width: 48px;
        height: 24px;
        line-height: 24px;
        text-align: center;
    }
}
.tabhead {
    display: flex;
    padding: 10px 0;
    background: $bg3;
    color: $color1;

    >div {
        width: 33.33%;
        text-align: center;
        line-height: 1.3;
    }
}
.tabContent {
    height: 480px;
    overflow: scroll;
    background: $bg1;
    >li {
        padding: 10px 0;
        width: 100%;
        display: flex;
        font-size: 12px;
        >td {
            width: 33.33%;
            overflow: hidden;
            text-align: center;
        }
    }
}
.nodata {
    text-align: center;
    padding: 10px;
}
</style>
