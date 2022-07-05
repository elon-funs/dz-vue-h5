<template>
    <div>
        <van-loading size="24px" vertical v-if="loading">{{$t('app.lodding_z')}}...</van-loading>
        <div class="itemWrap" @click="goDetail(item.taskId)" v-for="item of listData" :key="item.id">
            <div class="left">
                <img :src="item.taskIcon" />
                <div class="mar">{{item.categoryName}}</div>
            </div>
            <div class="center">
                <!-- <div>{{$t('app.xuqiuifang')}}：{{item.createUser}}</div> -->
                <div class="lingqu text1">VIP{{item.levelSeq}}</div>
                <div class="mar_top_btm10">{{$t('app.surplus')}}：<span class="text1">{{item.surplusNum || 0}}</span></div>
                <!-- <div class="mar_top_btm10 fontClass" style="line-height: 1.3;">{{$t('app.require')}}：{{item.taskRequire}}</div> -->
            </div>
            <div class="right">
                <div>USDT：<span class="text1">{{item.price}}</span></div>
                <!-- <div class="fs16 mar_top_btm10" style="color: #FB0101;">{{$t('app.yifukuan')}}</div> -->
                <div class="lingqu bg_font" @click.stop="lingquTask(item.taskId)">{{$t('app.lingqu')}}</div>
            </div>
        </div>
        <div v-if="!loading && isLastPage" style="text-align: center; padding: 0.5rem 0;">{{$t('app.nodata_l')}}~</div>
    </div>
</template>

<script>
import { taskList, receiveTask } from '@/api'
export default {
    name: 'TaskList',
    data () {
        return {
            params: this.$route.query,
            listData: [],
            loading: true,
            pageNo: 1,
            isLastPage: false
        }
    },
    methods: {
        // 滚动底部加载
        lazyLoading () {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            const clientHeight = document.documentElement.clientHeight
            const scrollHeight = document.documentElement.scrollHeight
            if (this.isLastPage) {
                return
            }
            if (scrollTop + clientHeight >= scrollHeight) {
                this.pageNo++
                this.lodding = true
                const obj = {
                    pageNo: this.pageNo,
                    pageSize: 10,
                    categoryId: this.params.categoryId,
                    levelSeq: this.params.levelSeq
                }
                taskList(obj).then(res => {
                    if (res.status == '1') {
                        this.isLastPage = res.data.isLastPage
                        this.lodding = false
                        res.data.list.forEach(item => {
                            this.listData.push(item)
                        })
                    }
                })
            }
        },
        goDetail (id) {
            // this.$router.push({ path: '/taskDetail', query: { id } })
        },
        async _taskList () {
            this.listData = []
            this.loading = true
            const obj = {
                pageNo: 1,
                pageSize: 10,
                categoryId: this.params.categoryId,
                levelSeq: this.params.levelSeq
            }
            const { data } = await taskList(obj)
            this.isLastPage = data.isLastPage
            this.listData = data.list
            this.loading = false
        },
        // 领取任务
        lingquTask (id) {
            receiveTask({ taskId: id }).then(res => {
                if (res.status == '1') {
                    this.$toast({
                        message: `${this.$t('app.lq_success')}`
                    })
                    this._taskList()
                }
            })
        }
    },
    created () {
        // 滚动到底部，再加载的处理事件
        window.addEventListener('scroll', this.lazyLoading)
        this._taskList()
    },
    destroyed () {
        // 页面离开后销毁，防止切换路由后上一个页面监听scroll滚动事件会在新页面报错问题
        window.removeEventListener('scroll', this.lazyLoading)
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/vant.scss';
::v-deep.van-loading {
    margin-top: 20px;
}
.itemWrap {
    display: flex;
    margin: 10px;
    border-radius: 5px;
    background-color: $bg1;
    padding: 10px 0;

    .left {
        width: 96px;
        padding: 10px 15px;
        box-sizing: border-box;
        text-align: center;
        overflow: hidden;
        .mar {
            margin: 5px 0;
        }
        img {
            margin: 0 auto;
            width: 36px;
            height: 36px;
        }
        .btn {
            padding: 3px 3px;
            border-radius: 3px;
        }
    }
    .center {
        padding: 12px 0;
        width: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .fontClass {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
    .right {
        text-align: center;
        flex: 1;
        padding: 12px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .lingqu {
            box-sizing: border-box;
            padding: 0 5px;
            height: 24px;
            line-height: 18px;
            margin: 0 auto;
            padding: 3px 5px;
            border-radius: 5px;
        }
    }
}
</style>
