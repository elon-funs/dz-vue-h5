<template>
    <div class="task">
        <div class="topImg">
            <img src="http://gcupload.yicainew.com/uploads/1/db01bfe4be3e56c8f0969ca10fc55ca4.png" />
        </div>
        <!-- <van-tabs v-model="activeName" @click="onClick">
            <van-tab v-for="item of tablist" :title="item.name" :key="item.id">
            </van-tab>
        </van-tabs> -->
        <div class="listWrap">
            <div class="itemWrap"
                v-for="item of list"
                :key="item.task"
                @click="goTaskList(item)">
                <img class="img" :src="item.taskIcon" alt="">
                <div class="title fs24">VIP{{item.levelSeq}}</div>
                <div class="task fs16">{{$t('app.today_task')}}：{{item.doTaskTimes}}{{$t('app.ci')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { levelConfig, topupVip, getVipAmount, taskList } from '@/api'
import { objectSort } from '@/utils/tools'
import topvip from '@/mixin/topvip'
export default {
    name: 'Missionhall',
    mixins: [topvip],
    data () {
        return {
            tablist: [],
            levelData: [],
            activeName: 0,
            taskId: 0,
            list: []
        }
    },
    methods: {
        onClick (id, title) {
            this.taskId = this.tablist[id].id
        },
        goTaskList (item) {
            if (this.userLevel.levelSeq >= item.levelSeq) {
                this.$router.push({
                    path: '/taskList',
                    query: {
                        levelSeq: item.levelSeq,
                        categoryId: this.$route.query.id
                    }
                })
            } else {
                getVipAmount({ levelId: item.id }).then(res => {
                    if (res.status == '1') {
                        this.$dialog.confirm({
                            title: `${this.$t('app.tips')}`,
                            message: `${this.$t('app.youareno')}${item.level}，${this.$t('app.yestopup')}${res.data}USDT${this.$t('app.chenwei')}${item.level}`
                        }).then(() => {
                            if (this.yue.goldnum >= res.data) {
                                const obj = {
                                    amount: res.data,
                                    levelSeq: item.levelSeq,
                                    levelId: item.id
                                }
                                topupVip(obj).then(res => {
                                    this.$toast.success({
                                        duration: 1000,
                                        mask: true,
                                        message: `${this.$t('app.topup')}${item.level}${this.$t('app.success')}`
                                    })
                                    this.$storage.ssRm('member/memberLevel')
                                    setTimeout(() => {
                                        this._memberLevel()
                                    }, 1000)
                                })
                            } else {
                                this.$router.push({ path: '/topup', query: { rmb: String(res.data) } })
                            }
                        }).catch(() => {
                            // on cancel
                        })
                    }
                })
            }
        },
        async _levelConfig () {
            const { data } = await levelConfig()
            data.sort(objectSort('levelSeq'))
            this.levelData = data
        },

        async taskList () {
            await this._memberLevel()
            console.log(this.userLevel)
            const obj = {
                categoryId: this.$route.query.id,
                levelSeq: this.userLevel.levelSeq
            }
            const { data } = await taskList(obj)
            this.list = data.list
            console.log(data)
        }
    },
    created () {
        this.taskList()
        // this.activeName = Number(this.$route.query.id)
        // this.taskId = this.tablist[this.activeName].id
        this._levelConfig()
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/vant.scss';

::v-deep .van-tab--active {
    color: #1989FA;
}
::v-deep .van-tabs__line {
    bottom: 20px;
    background-color: #1989FA;
}
.task {
    position: relative;
    height: 100%;
    .topImg {
        width: 100%;
        height: 160px;
        img {
            width: 100%;
        }
    }
}
.listWrap {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .itemWrap {
        background: $bg1;
        width: 175px;
        margin-bottom: 10px;
        background-size: contain !important;
        text-align: center;
        padding: 10px 0;
        border-radius: 16px;

        .img {
            width: 80px;
            height: 80px;
        }

        .title {
            margin-top: 30px;
        }
        .task {
            margin: 10px 0;
        }
        .btn {
            width: 90px;
            height: 22px;
            line-height: 22px;
            border-radius: 10px;
            margin: 0 auto;
        }
    }
}
</style>
