<template>
    <div class="wrap">
        <van-cell :title="$t('app.creditStatement')" is-link :value="$t('app.creditHistory')" @click="goXinyong">
            <template #icon>
                <van-icon color="#1989FA" size="0.45rem" name="info" />
            </template>
        </van-cell>
        <div class="xyf">{{$t('app.myCreditScore')}}：{{xy_fen || 0}}</div>
        <div class="fontWrap">
            <div v-html="xyshuoming"></div>
            <!-- <div class="mar fs16">信用积分</div>
            <div class="listWrap">
                <p>1、充值送120积分 </p>
                <p>2、每天领取任务不得消耗信用积分</p>
                <p>3、推荐普通用户奖励6信用积分 </p>
                <p>4、推荐充值用户奖励20信用积分</p>
            </div>
            <div class="mar fs16">信誉积分</div>
            <div class="listWrap">
                <p>1、信誉积分60分为满分，被系统判断任务为恶意的任务</p>
                <p>2、一单扣除10分信誉分，信誉分低于30分限制领取任务</p>
                <p>3、信誉分降低为0分，将被封号</p>
                <p>4、注明：直接推荐5名至尊会员可申请恢复信誉分</p>
            </div> -->
        </div>
        <!-- <div class="bottomContent">【每周一将根据信用积分情况，来评估本周的信誉分】</div> -->
    </div>
</template>

<script>
import { xyshuoming, getMemberCredit } from '@/api'
export default {
    name: 'Creditcenter',
    data () {
        return {
            xyshuoming: '',
            xy_fen: ''
        }
    },
    methods: {
        goXinyong () {
            this.$router.push({ path: '/xinyong' })
        }
    },
    created () {
        xyshuoming().then(res => {
            this.xyshuoming = res.data
        })
        getMemberCredit().then(res => {
            this.xy_fen = res.data
        })
    }
}
</script>

<style lang='scss' scoped>
.wrap {
    background-color: #fff;
}
::v-deep.van-cell {
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    .van-icon {
        margin: 0 5px 0 0;
    }
    .van-cell__title {
        color: #1989FA;
    }
}
.xyf {
    padding: 15px;
}
.fontWrap {
    padding: 0 15px;
    background-color: #fff;
    line-height: 1.3;
    .mar {
        margin: 10px 0;
    }
    .listWrap {
        line-height: 1.6;
    }
}
.bottomContent {
    margin: 10px 0;
    padding-left: 5px;
    color: #1989FA;
}
</style>
