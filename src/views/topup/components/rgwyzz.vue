<template>
    <div>
        <van-field v-model="params.topmoney" type="digit" :label="$t('app.amount') + '：'" :placeholder="$t('app.tips_topupje')" />
        <van-field v-model="params.name" :label="$t('app.zhuanzhang_name') + '：'" :placeholder="$t('app.tips_topupxm')" />
        <van-field name="uploader" :label="$t('app.zhuanzhang_img') + '：'">
            <template #input>
                <van-uploader v-model="params.uploader"
                    :max-count="1"
                    :after-read="afterRead"
                    :before-delete="closeImg"
                    :before-read="beforeRead"
                />
            </template>
        </van-field>
        <!-- 提交按钮 -->
        <!-- <div class="btn_com" @click="chongzhi">{{$t('app.topup_lk')}}</div> -->
        <div style="text-align: center;">
            <van-button :disabled='bool' type="info" @click="chongzhi">{{!bool ? $t('app.topup_lk') : $t('app.ytjqsd')}}</van-button>
        </div>
        <van-divider :style="{ color: '#999999', borderColor: '#999999', fontSize: '12px;' }">{{$t('app.tips_topupfont')}}</van-divider>
        <!-- 银行卡信息 -->
        <div class="yhkWrap">
            <div class="headerWrap">
                <p class="fs14">{{$t('app.bank_zhuanzhang')}}</p>
                <p class="fs12">{{$t('app.tips_complete_zz')}}</p>
            </div>
            <div class="btmWrap fs14">
                <div class="linWrap">
                    <span>{{$t('app.skr')}}</span>
                    <span class="pad">{{artificialData.NETBANK[0].accountname}}</span>
                    <span class="copy centerY" @click="copyFn(artificialData.NETBANK[0].accountname)">{{$t('app.copy')}}</span>
                </div>
                <div class="linWrap">
                    <span>{{$t('app.skyh')}}</span>
                    <span class="pad">{{artificialData.NETBANK[0].banknamealias}}</span>
                    <span class="copy centerY" @click="copyFn(artificialData.NETBANK[0].banknamealias)">{{$t('app.copy')}}</span>
                </div>
                <div class="linWrap">
                    <span>{{$t('app.skzh')}}</span>
                    <span class="pad">{{artificialData.NETBANK[0].accountno}}</span>
                    <span class="copy centerY" @click="copyFn(artificialData.NETBANK[0].accountno)">{{$t('app.copy')}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { doAgentPay, uploadsImg } from '@/api'
export default {
    props: {
        artificialData: {
            type: Object,
            default: () => {}
        },
        defaultRmb: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            bool: false,
            params: {
                topmoney: '',
                name: '',
                uploader: []
            }
        }
    },
    methods: {
        afterRead (file) {
            file.status = 'uploading'
            file.message = ''
            const params = new FormData()
            params.append('file', file.file)
            uploadsImg(params).then(result => {
                this.$toast({
                    message: `${this.$t('app.post_success')}`
                })
                file.status = ''
                this.$set(this.params, 'imgurl', result.result)
            })
        },
        beforeRead (file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                this.$toast({
                    message: `${this.$t('app.pls_tips_photo')}`
                })
                return false
            }
            return true
        },
        closeImg (file, detail) {
            console.log(this.params.uploader, detail)
            this.params.uploader.splice(detail, 1)
            this.$set(this.params, 'imgurl', '')
        },
        copyFn (value) {
            var input = document.createElement('input')
            input.value = value
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            this.$toast({
                message: `${this.$t('app.copy_success')}`
            })
            document.body.removeChild(input)
        },
        _doAgentPay () {
            const obj = {
                price: this.params.topmoney,
                payuser: this.params.name,
                bankid: this.artificialData.NETBANK[0].bankid
            }
            doAgentPay(obj).then(res => {
                if (res.status == '1') {
                    this.$toast({
                        duration: 1500,
                        message: `${this.$t('app.submit_success')}`
                    })
                    setTimeout(() => {
                        this.bool = false
                    }, 4000)
                } else {
                    this.bool = false
                }
            })
        },
        chongzhi () {
            if (this.params.topmoney == '') {
                this.$toast({
                    message: `${this.$t('app.jebnwk')}`
                })
                return
            }
            if (this.params.name == '') {
                this.$toast({
                    message: `${this.$t('app.xmbnwk')}`
                })
                return
            }
            this.bool = true
            this._doAgentPay()
        }
    },
    created () {
        this.params.topmoney = this.defaultRmb
    }
}
</script>

<style lang='scss' scoped>
::v-deep.van-button {
    margin-top: 20px;
    height: 35px;
    width: 200px;
}
::v-deep.van-uploader__upload {
    width: 50px;
    height: 50px;
}
::v-deep.van-uploader__preview-image {
    width: 50px;
    height: 50px;
}
.yhkWrap {
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
    .headerWrap {
        padding: 10px 15px;
        line-height: 1.5;
        color: #fff;
        background-color: #5382CF;
    }
    .btmWrap {
        padding: 10px 15px;
        background-color: #DFE7FB;
        .linWrap {
            position: relative;
            padding: 15px 0;
            .pad {
                padding-left: 40px;
            }
            .copy {
                position: absolute;
                right: 20px;
                font-size: 12px;
                display: block;
                padding: 5px 10px;
                background-color: #07C160;
                color: #fff;
                border-radius: 3px;
            }
        }
    }
}
</style>
