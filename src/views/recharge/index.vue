<template>
    <div>
        <van-cell-group>
            <van-cell :title="$t('app.amount') + '：'">
                <span class="fs20 pad" style="color: #1989FA">{{setData.money}}</span>
                <span style="color: #000">USDT</span>
            </van-cell>
            <van-cell :title="$t('app.dingdanhao') + '：'">
                <span class="fs14 pad" style="color: #333333">{{setData.num}}</span>
                <span class="copy" @click="copyValue">{{$t('app.copy')}}</span>
            </van-cell>
            <van-field name="uploader" :label="$t('app.filse_post') + '：'">
                <template #input>
                    <van-uploader v-model="uploader" />
                </template>
            </van-field>
        </van-cell-group>
        <div class="btn fs16">
            {{$t('app.submit')}}
        </div>
        <van-divider :style="{ color: '#999999', borderColor: '#999999', fontSize: '12px' }">{{$t('app.tips_topupfont1')}}</van-divider>
        <div class="fs12 font">{{$t('app.tips_topupfont2')}}</div>
        <van-divider :style="{ color: '#999999', borderColor: '#999999', fontSize: '12px' }">{{$t('app.tips_topupfont3')}}</van-divider>
    </div>
</template>

<script>
export default {
    name: '',
    data () {
        return {
            setData: {},
            uploader: []
        }
    },
    methods: {
        copyValue () {
            var input = document.createElement('input')
            input.value = this.setData.num
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            this.$toast({
                message: `${this.$t('app.copy_success')}`
            })
            document.body.removeChild(input)
        }
    },
    created () {
        this.setData = this.$route.query
        console.log(this.$route)
    }
}
</script>

<style lang='scss' scoped>
::v-deep .van-uploader__preview {
    width: 48px;
    height: 48px;
    .van-uploader__preview-image {
        width: 100%;
        height: 100%;
        img {
            width: 100%;
        }
    }
}
::v-deep .van-uploader__upload {
    width: 48px;
    height: 48px;
}
::v-deep .van-cell {
    border-bottom: 1px solid #eeeeee;
    .van-cell__title {
        flex: none;
    }
    .van-cell__value {
        text-align: left;
    }
    .van-field__label {
        line-height: 3.5;
    }
}
.pad {
    padding-left: 20px;
}
.copy {
    display: inline-block;
    padding: 0 10px;
    margin-left: 10px;
    border-radius: 5px;
    color: #fff;
    background-color: #07C160;
}
.btn {
    width: 300px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #1989FA;
    border-radius: 5px;
    margin: 30px auto;
}
.font {
    color: #999999;
    line-height: 1.3;
    padding: 0 12px;
}
</style>
