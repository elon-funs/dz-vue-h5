<template>
    <div>
        <div class="detailWrap">
            <span>{{detailData.categoryName}}</span>
            <span style="float: right; color: #1A89FA;">+RMB：{{detailData.price}}</span>
            <div class="font fs14">
                <span>{{detailData.completeTaskNum}}{{$t('app.people')}}{{$t('app.zhuandao')}}</span>
                <span>{{$t('app.surplus')}}{{detailData.surplusNum || 0}}{{$t('app.unitA')}}{{$t('app.quota')}}</span>
                <span>{{$t('app.time_sh')}}</span>
            </div>
        </div>
        <div class="miaoshu">{{$t('app.task_ms')}}：{{detailData.info}}</div>
        <div class="xuqiufang">
            <div class="touxiang">
                <!-- <img :src="detailData.headimg" /> -->
                <div class="touxiang_f">
                    <p class="name">{{$t('app.xuqiuifang')}}：{{detailData.createUser}}</p>
                </div>
            </div>
        </div>
        <div class="shenghe">
            <div class="bz">{{$t('app.sh_biaozhun')}}：</div>
            <div class="btnWrap">
                <div class="btn fs12" v-for="item of biaozhun" :key="item.id">
                    {{item.name}}
                </div>
            </div>
        </div>
        <div class="httpWrap">{{$t('app.fabu_content')}}：
            <span style="color: #666;">{{detailData.taskUrl}}</span>
            <div class="copyBtn centerY" @click="copyValue(detailData.taskUrl)">{{$t('app.copy')}}</div>
        </div>
        <div class="tab">
            <van-tabs @click="onClick">
                <van-tab :title="$t('app.task_bz')">
                    <div v-for="(item, index) of taskBz" :key="index">
                        <div class="mar">{{item.text}}</div>
                        <img :src="item.url" />
                    </div>
                    <!-- <div class="btn_com" @click="lqTask">领取任务</div> -->
                </van-tab>
                <van-tab :title="$t('app.sh_style')">
                    <div v-for="(item, index) of shys" :key="index">
                        <img :src="item.url" />
                    </div>
                    <!-- <div class="btn_com" @click="lqTask">领取任务</div> -->
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { taskDetail, receiveTask } from '@/api'
const SHBZ = [
    {
        name: '手机认证',
        id: 1
    },
    {
        name: '微信认证',
        id: 2
    },
    {
        name: '实名认证',
        id: 3
    },
    {
        name: '身份认证',
        id: 4
    }
]
export default {
    name: 'TaskDetail',
    data () {
        return {
            detailData: {},
            taskBz: [],
            shbz: Object.freeze(SHBZ),
            biaozhun: [],
            shys: []
        }
    },
    methods: {
        copyValue (i) {
            var input = document.createElement('input')
            input.value = i
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            this.$toast({
                message: `${this.$t('app.copy_success')}`
            })
            document.body.removeChild(input)
        },
        onClick (name, title) {
            console.log(name, title)
        },
        lqTask () {
            receiveTask({ taskId: this.$route.query.id }).then(res => {
                if (res.status == '1') {
                    this.$toast({
                        message: `${this.$t('app.lq_success')}`
                    })
                }
            })
        },
        async _taskDetail () {
            const { data } = await taskDetail({ taskId: this.$route.query.id })
            this.detailData = data
            const arr = JSON.parse(data.condition)
            this.shbz.forEach((item, index) => {
                if (arr.includes(item.id)) {
                    this.biaozhun.push(this.shbz[index])
                }
            })
            this.taskBz = JSON.parse(data.stepInfo)
            this.shys = JSON.parse(data.sampleUrl)
        }
    },
    created () {
        this._taskDetail()
    }
}
</script>

<style lang='scss' scoped>
.detailWrap {
    padding: 15px 10px;
    margin-top: 10px;
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
    .font {
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        color: #666666;
    }
}
.miaoshu {
    padding: 18px 10px;
    background-color: #fff;
}
.xuqiufang {
    background-color: #fff;
    padding: 12px 10px;
    margin-top: 5px;
    .touxiang {
        display: flex;
        img {
            width: 44px;
            height: 44px;
        }
        .touxiang_f {
            // padding-left: 10px;
            .name {
                padding: 7px 0;
            }
        }
    }
}
.shenghe {
    background-color: #fff;
    padding: 16px 10px;
    margin: 1px 0;
    display: flex;
    align-items: center;
    .bz {
        width: 80px;
    }
    .btnWrap {
        flex: 1;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        .btn {
            margin-left: 3px;
            border: 1px solid #1A89FA;
            color: #1A89FA;
            border-radius: 5px;
            padding: 4px 5px;
        }
    }
}
.httpWrap {
    position: relative;
    background-color: #fff;
    padding: 12px 10px;
    .copyBtn {
        position: absolute;
        right: 10px;
        color: #1A89FA;
        border-radius: 20px;
        padding: 2px 10px;
        border: 1px solid #1A89FA;
    }
}
.tab {
    overflow: hidden;
    margin: 5px 0 0;
    background-color: #fff;
    .mar {
        margin: 10px;
    }
    ::v-deep.van-tabs__content {
        padding: 0 15px;
        img {
            width: 100%;
        }
    }
}
</style>
