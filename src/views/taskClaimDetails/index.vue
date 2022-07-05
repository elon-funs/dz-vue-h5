<template>
    <div>
        <div class="topWrap">
            <div>{{$t('app.task_bt')}}：{{detailData.title}}</div>
            <div>{{$t('app.task_sy')}}：RMB+{{detailData.price}}</div>
            <div>{{$t('app.task_ms')}}：{{detailData.info}}</div>
            <div>{{$t('app.fabu_require')}}：{{detailData.taskRequire}}</div>
            <!-- <div>审核样式：</div> -->
            <div v-if="status == 3 || status == 4 || status == 5">{{$t('app.sh_date')}}：{{sjcFn(detailData.updateTime)}}</div>
        </div>
        <div class="infoWrap">
            <div class="toux">
                <!-- <img src="@/assets/img/touxiang.png" /> -->
                <div class="font">
                    <p>{{$t('app.xuqiuifang')}}：{{detailData.createUser}}</p>
                    <!-- <p></p> -->
                </div>
                <div class="date fs12">{{sjcFn(detailData.createTime)}}{{$t('app.release')}}</div>
            </div>
            <div>{{$t('app.complete_status')}}：
                <span v-if="status == 1" style="color: #FFD133">{{$t('app.task_jxz')}}</span>
                <span v-if="status == 2" style="color: #FFD133">{{$t('app.task_shz')}}</span>
                <span v-if="status == 3" style="color: #FFD133">{{$t('app.task_ywc')}}</span>
            </div>
            <div class="fbnr">
                {{$t('app.fabu_content')}}：<span class="font_ellipsis neirong">{{detailData.taskUrl}}</span>
                <div class="btn centerY" @click="copyValue(detailData.taskUrl)">{{$t('app.copy')}}</div>
            </div>
        </div>
        <div class="tab">
            <van-tabs @click="onClick">
                <van-tab :title="$t('app.task_bz')">
                    <div v-for="(item, index) of bz_img" :key='index'>
                        <div class="mar">第{{index + 1}}步：{{item.text}}</div>
                        <img :src="item.url" />
                    </div>
                    <!-- <div class="btnWrap">
                        <div class="notask">放弃任务</div>
                        <div class="oktask">提交完成任务</div>
                    </div> -->
                </van-tab>
                <van-tab :title="$t('app.sh_style')">
                    <div v-for="(item, index) of sh_img" :key='index'>
                        <img :src="item.url" />
                    </div>
                    <!-- <div class="btnWrap">
                        <div class="notask fs16">放弃任务</div>
                        <div class="oktask fs16">提交完成任务</div>
                    </div> -->
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskClaimDetails',
    data () {
        return {
            detailData: {},
            bz_img: [],
            sh_img: [],
            status: 1
        }
    },
    methods: {
        sjcFn (i) {
            return this.$monent(new Date(i)).format('YYYY-MM-DD hh:mm:ss')
        },
        copyValue (i) {
            // window.location.href = 'https://v.douyin.com/J5LTR9j'
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
        onClick (id, title) {
            console.log(id, title)
        }
    },
    created () {
        this.detailData = this.$route.query.item
        this.status = this.$route.query.status
        this.bz_img = JSON.parse(this.$route.query.item.stepInfo)
        this.sh_img = JSON.parse(this.$route.query.item.sampleUrl)
    }
}
</script>

<style lang='scss' scoped>
.topWrap {
    margin-top: 10px;
    background-color: #fff;
    div {
        padding: 15px 10px;
        border-bottom: 1px solid #eeeeee;
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
    .fbnr {
        position: relative;
        .btn {
            position: absolute;
            right: 10px;
            border: 1px solid #1A8AFB;
            font-size: 12px;
            padding: 3px 10px;
            color: #1A8AFB;
            border-radius: 20px;
        }
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
    .btnWrap {
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
        >div {
            box-sizing: border-box;
            width: 160px;
            height: 40px;
            line-height: 40px;
            border-radius: 5px;
            text-align: center;
            color: #fff;
        }
        .notask {
            background-color: #9A9A9A;
        }
        .oktask {
            background-color: #1A8AFA;
        }
    }
}
.neirong {
    color: #000;
    width: 60%;
    display: inline-block !important;
    vertical-align: bottom;
}
</style>
