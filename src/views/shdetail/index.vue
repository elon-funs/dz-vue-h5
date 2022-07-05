<template>
    <div>
        <div class="topWrap">
            <div class="title">{{$t('app.task_yq')}}：{{detailData.taskRequire}}</div>
            <div class="money">
                {{$t('app.task_je')}}：<span style="color: #1A8AFA; float: right;">USDT+{{detailData.price}}</span>
                <span class="renshu">
                    {{detailData.completeTaskNum || 0}}{{$t('app.people')}}{{$t('app.task_ywc')}}
                    <span style="float: right;">{{$t('app.surplus')}}{{detailData.surplusNum || 0}}{{$t('app.unitA')}}{{$t('app.quota')}}</span>
                </span>
            </div>
            <div class="info">{{$t('app.task_ms')}}：{{detailData.info}}</div>
            <div class="url">{{$t('app.url_message')}}：{{detailData.taskUrl}}</div>
            <van-field name="uploader" :label="$t('app.sh_style') + '：'">
                <template #input>
                    <van-uploader v-model="uploader1" :max-count="3"/>
                </template>
            </van-field>
        </div>
        <div class="infoWrap">
            <div class="toux">
                <!-- <img src="@/assets/img/touxiang.png" /> -->
                <div class="font">
                    <p>{{$t('app.receive_user')}}：{{detailData.mobile}}</p>
                    <!-- <p></p> -->
                </div>
                <div class="date fs12">{{sjcFn(detailData.createTime)}}{{$t('app.release')}}</div>
            </div>
            <div>{{$t('app.complete_status')}}：
                <!-- <span v-if="item.status == 1" style="color: #FFD133">进行中</span> -->
                <span v-if="detailData.status == 2" style="color: #3442FF;">{{$t('app.task_shz')}}</span>
                <!-- <span v-if="item.status == 3" style="color: #FFD133">已完成</span> -->
            </div>
            <van-field name="uploader" :label="$t('app.submit_style') + '：'">
                <template #input>
                    <van-uploader v-model="uploader2" :max-count="uploader2len" />
                </template>
            </van-field>
            <div>{{$t('app.update_date')}}：{{sjcFn(detailData.updateTime)}}</div>
        </div>
        <div class="btnWrap fs14">
            <div style="background-color: #FD966A;" @click="postTask(detailData, 'MALIGNITY')">{{$t('app.malice')}}</div>
            <div style="background-color: #3442FF;" @click="postTask(detailData, 'UNDERWAY')">{{$t('app.retrial')}}</div>
            <div style="background-color: #9A9A9A;" @click="postTask(detailData, 'FAILURE')">{{$t('app.fail')}}</div>
            <div style="background-color: #FF3434;" @click="postTask(detailData, 'DONE')">{{$t('app.success')}}</div>
        </div>
    </div>
</template>

<script>
import { editTaskOrder } from '@/api'
export default {
    name: 'Shdetail',
    data () {
        return {
            detailData: {},
            uploader1: [],
            uploader2: [],
            uploader2len: 1,
            font: {
                MALIGNITY: 'app.sh_tips_fail',
                UNDERWAY: 'app.sh_tips_again',
                FAILURE: 'app.sh_tips_update',
                DONE: 'app.sh_tips_complete'
            }
        }
    },
    methods: {
        sjcFn (i) {
            return this.$monent(new Date(i)).format('YYYY-MM-DD hh:mm:ss')
        },
        postTask (item, status) {
            const obj = {
                id: item.orderId,
                taskId: item.taskId,
                taskOrderStatus: status
            }
            console.log(obj, status)
            this.$dialog.confirm({
                title: this.$t('app.examineTask'),
                message: `${this.$t('app.sh_shuoming')}：${this.$t(this.font[status])}`
            }).then(() => {
                editTaskOrder(obj).then(res => {
                    if (res.status == '1') {
                        this.$toast({
                            message: `${this.$t('app.sh_success')}！`
                        })
                        this.$router.push({ path: '/examinetask' })
                    }
                })
            }).catch(() => {
                // on cancel
            })
        }
    },
    created () {
        this.detailData = this.$route.query.item
        if (this.detailData.sampleUrl != '[]') {
            if (this.detailData.sampleUrl.indexOf('[') == -1) {
                const shys = this.$route.query.item.sampleUrl
                this.uploader1.push({ url: shys })
            } else {
                const shys = JSON.parse(this.$route.query.item.sampleUrl)
                this.uploader1.push({ url: shys[0].url })
            }
        }
        // const tjys = JSON.parse(this.$route.query.item.submitSample)
        this.uploader2len = JSON.parse(this.$route.query.item.submitSample).length
        JSON.parse(this.$route.query.item.submitSample).forEach(item => {
            this.uploader2.push({ url: item.img })
        })
    }
}
</script>

<style lang='scss' scoped>
.topWrap {
    margin-top: 10px;
    background-color: #fff;
    .title, .money, .info, .url {
        padding: 15px 10px;
        border-bottom: 1px solid #eeeeee;
    }
    .renshu {
        margin-top: 10px;
        display: block;
    }
}
.infoWrap {
    margin: 5px 0;
    background-color: #fff;
    >div {
        border-bottom: 1px solid #eeeeee;
        padding: 15px 10px;
    }
    .toux {
        display: flex;
        align-items: center;
        img {
            width: 44px;
            height: 44px;
            margin-right: 12px;
        }
        .font {
            line-height: 1.3;
        }
        .date {
            flex: 1;
            text-align: right;
            color: #666666;
        }
    }
}
.btnWrap {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    >div {
        margin: 0 10px;
        padding: 8px 20px;
        border-radius: 5px;
        color: #fff;
    }
}
::v-deep.van-cell {
    padding: 10px;
}
::v-deep.van-uploader {
    padding: 0;
    .van-uploader__preview-image {
        width: 48px;
        height: 48px;
    }
    .van-uploader__upload {
        width: 48px;
        height: 48px;
    }
}
::v-deep.van-icon-clear::before {
    display: none;
}
</style>
