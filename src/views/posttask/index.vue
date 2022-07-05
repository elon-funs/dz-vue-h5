<template>
    <div>
        <!-- 表单 -->
        <van-form @submit="onSubmit">
            <div class="topWrap">
                <van-field :label="$t('app.task_fl') + '：'">
                    <template #input>
                        <van-dropdown-menu active-color="#1989fa">
                            <van-dropdown-item v-model="optionValue" :options="optionList" />
                        </van-dropdown-menu>
                    </template>
                </van-field>
                <van-field v-model="params.taskTitle" :label="$t('app.task_bt') + '：'" :placeholder="$t('app.tips_task_bt')" />
                <van-field v-model="params.taskIntroduction" :label="$t('app.task_jj') + '：'" :placeholder="$t('app.tips_task_jj')" />
                <van-field v-model="params.taskPrice" type="number" :label="$t('app.task_dj') + '：'" :placeholder="$t('app.tips_task_dj')">
                    <template #extra >
                        <span>USDT</span>
                    </template>
                </van-field>
                <van-field v-model="params.taskNum" type="digit" :label="$t('app.lq_sl') + '：'" :placeholder="$t('app.tips_lq_sl')" />
                <van-field v-model="params.taskChishu" type="digit" :label="$t('app.lq_cs') + '：'" :placeholder="$t('app.tips_lq_cs')">
                    <template #extra >
                        <span>{{$t('app.ci')}}/{{$t('app.people')}}</span>
                    </template>
                </van-field>
                <van-field :label="$t('app.task_zj') + '：'">
                    <template #input>
                        <div>{{params.taskPrice * params.taskNum || 0}}</div>
                    </template>
                </van-field>
                <van-field v-model="params.taskUrl" :label="$t('app.url_message') + '：'" :placeholder="$t('app.tips_url')" />
            </div>
            <div class="bottomWrap">
                <van-field :label="$t('app.task_level') + '：'">
                    <template #input>
                        <van-dropdown-menu active-color="#1989fa">
                            <van-dropdown-item v-model="levelValue" :options="levelList" />
                        </van-dropdown-menu>
                    </template>
                </van-field>
                <van-field v-model="params.dateValue" :label="$t('app.closingdate') + '：'">
                    <template #input>
                        <span style="width: 100%" @click="showDate = true">{{params.dateValue == '' ? $t('app.click_selectdate') : params.dateValue}}</span>
                    </template>
                </van-field>
                <van-field v-model="params.dateValue" :label="$t('app.complete_tj') + '：'">
                    <template #input>
                        <div class="boxWrap">
                            <div class="btn fs12"
                                v-for="(item, index) of taskAttest"
                                :class="item.active ? 'active' : ''"
                                :key="index"
                                @click="handleActive(item)"
                            >
                            {{item.text}}
                            </div>
                        </div>
                    </template>
                </van-field>
                <van-field v-model="params.taskRequire" :label="$t('app.post_require') + '：'" :placeholder="$t('app.tips_require')" />
                <van-field name="uploader" :label="$t('app.sh_style') + '：'">
                    <template #input>
                        <van-uploader v-model="uploader" :after-read="afterRead" :before-delete="closeImg" :max-count="3" :before-read="beforeRead" />
                    </template>
                </van-field>
                <van-field is-link :label="$t('app.operation_bz') + '：'" @click="showBuzhou = true">
                    <template #input>
                        <div>{{$t('app.tips_operation_bz')}}</div>
                    </template>
                </van-field>
            </div>
            <div class="shuoming">
                <p>{{$t('app.posttask_tipsfont1')}}</p>
                <p>{{$t('app.posttask_tipsfont2')}} USDT {{params.taskPrice * params.taskNum}} ，{{$t('app.posttask_tipsfont2')}}，<span style="color: #1A8AFB; cursor: pointer;" @click="() => $router.push({ path: '/topup' })">{{$t('app.go_topup')}}</span></p>
                <p>{{$t('app.posttask_tipsfont4')}}</p>
            </div>
            <div class="btn_com" @click="_pubTask">{{$t('app.fabu_task')}}</div>
        </van-form>
        <!-- 时间选择 -->
        <van-action-sheet v-model="showDate">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                title="选择年月"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
                @confirm="selectDatefn"
                @cancel="closeDatefn"

            />
        </van-action-sheet>
        <!-- 操作步骤 -->
        <van-popup v-model="showBuzhou" position="right" :style="{ height: '100%', width: '100%' }">
            <div class="bz_top">
                <van-icon class="centerY" size="0.5rem" name="arrow-left" @click="showBuzhou = false" />
                <div class="fs18">{{$t('app.operation_bz')}}</div>
                <span class="complete centerY" @click="completeFn">{{$t('app.complete')}}</span>
            </div>
            <div class="itemWrap" v-for="(item, index) in bz_data" :key="index">
                <div class="number">{{index + 1}}：</div>
                <div class="tupian">
                    <van-field>
                        <template #input>
                            <van-uploader v-model="item.urldata"
                                :after-read="(file, detail) => bz_afterRead(file, detail, index)"
                                :before-delete="(file, detail) => bz_closeImg(file, detail, index)"
                                :before-read="beforeRead"
                            />
                        </template>
                    </van-field>
                </div>
                <div class="fontWrap">
                    <van-field
                        v-model="item.text"
                        rows="2"
                        type="textarea"
                        maxlength="100"
                        :placeholder="$t('app.tips_czoperation_bz')">
                    </van-field>
                </div>
            </div>
            <div class="btnWrap">
                <div class="btn btn1" @click="handelDel">
                    <van-icon size="0.4rem" name="cross" />
                    <span>{{$t('app.delete')}}</span>
                </div>
                <div class="btn btn2" @click="handelAdd">
                    <van-icon size="0.4rem" name="plus" color="#ffffff" />
                    <span>{{$t('app.add')}}</span>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { levelConfig, uploadsImg, pubTask } from '@/api'
// import axios from 'axios'
export default {
    name: 'Posttask',
    data () {
        return {
            taskAttest: [
                {
                    text: '手机验证',
                    active: false
                },
                {
                    text: '微信验证',
                    active: false
                },
                {
                    text: '实名验证',
                    active: false
                },
                {
                    text: '身份验证',
                    active: false
                }
            ],
            uploader: [],
            showBuzhou: false,
            showDate: false,
            params: {
                taskTitle: '', // 任务标题
                taskIntroduction: '', // 任务简介
                taskPrice: '', // 任务单价
                taskNum: '', // 领取数量
                taskChishu: '', // 领取次数
                taskUrl: '', // 链接信息
                dateValue: '', // 截止日期
                taskRequire: '' // 上传要求
            },
            optionValue: 0,
            optionList: [], // 平台列表
            levelValue: 1,
            levelList: [], // 等级列表
            minDate: new Date(),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(),
            bz_data: [
                {
                    urldata: [],
                    text: ''
                }
            ],
            bz_imgArr: [],
            bz_Num: 1,
            imgArr: []
        }
    },
    methods: {
        beforeRead (file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                this.$toast({
                    message: `${this.$t('app.tips_okimg')}`
                })
                return false
            }
            if (file.size >= 2048000) {
                this.$toast({
                    message: '请上传2m内大小图片'
                })
                return false
            }
            return true
        },
        afterRead (file, detail) {
            file.status = 'uploading'
            file.message = ''
            if (/\/(?:jpeg|png)/i.test(file.file.type) && file.file.size > 512000) {
                // 创建Canvas对象(画布)
                const canvas = document.createElement('canvas')
                // 获取对应的CanvasRenderingContext2D对象(画笔)
                const context = canvas.getContext('2d')
                // 创建新的图片对象
                const img = new Image()
                // 指定图片的DataURL(图片的base64编码数据)
                img.src = file.content
                // 监听浏览器加载图片完成，然后进行进行绘制
                img.onload = () => {
                // 指定canvas画布大小，该大小为最后生成图片的大小
                    canvas.width = 350
                    canvas.height = 650
                    // drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
                    // 如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
                    context.drawImage(img, 0, 0, 350, 650)
                    // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
                    file.content = canvas.toDataURL(file.file.type, 0.5)
                    // 最后将base64编码的图片保存到数组中，留待上传。
                    this.$set(this.uploader[detail.index], 'content', file.content)
                }
            }
            const params = new FormData()
            params.append('file', file.file)
            uploadsImg(params).then(result => {
                this.$toast({
                    message: `${this.$t('app.post_success')}`
                })
                file.status = ''
                this.imgArr.push({
                    url: result.result,
                    name: file.file.name,
                    size: file.file.size,
                    status: 'success'
                })
            })
        },
        closeImg (file, detail) {
            this.uploader.splice(detail.index, 1)
            this.imgArr.splice(detail.index, 1)
        },
        bz_afterRead (file, detail, index) {
            // index外层div下标
            file.status = 'uploading'
            file.message = ''
            if (/\/(?:jpeg|png)/i.test(file.file.type) && file.file.size > 512000) {
                // 创建Canvas对象(画布)
                const canvas = document.createElement('canvas')
                // 获取对应的CanvasRenderingContext2D对象(画笔)
                const context = canvas.getContext('2d')
                // 创建新的图片对象
                const img = new Image()
                // 指定图片的DataURL(图片的base64编码数据)
                img.src = file.content
                // 监听浏览器加载图片完成，然后进行进行绘制
                img.onload = () => {
                // 指定canvas画布大小，该大小为最后生成图片的大小
                    canvas.width = 350
                    canvas.height = 650
                    // drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
                    // 如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
                    context.drawImage(img, 0, 0, 350, 650)
                    // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
                    file.content = canvas.toDataURL(file.file.type, 0.5)
                    // 最后将base64编码的图片保存到数组中，留待上传。
                    this.$set(this.bz_data[index].urldata[detail.index], 'content', file.content)
                }
            }
            const params = new FormData()
            params.append('file', file.file)
            uploadsImg(params).then(result => {
                this.$toast({
                    message: `${this.$t('app.post_success')}`
                })
                file.status = ''
                this.$set(this.bz_data[index], 'url', result.result)
            })
        },
        bz_closeImg (file, detail, index) {
            this.bz_data[index].urldata.splice(detail.index, 1)
            this.$set(this.bz_data[index], 'url', '')
        },
        handleActive (item) {
            item.active = !item.active
        },
        onSubmit (values) {
            console.log('submit', values)
        },
        formatter (type, val) {
            if (type === 'month') {
                return `${val}月`
            } else if (type === 'day') {
                return `${val}日`
            }
            return val
        },
        selectDatefn () {
            this.params.dateValue = this.$monent(this.currentDate).format('YYYY-MM-DD')
            this.showDate = false
        },
        closeDatefn () {
            this.showDate = false
        },
        // 删除步骤
        handelDel () {
            console.log(this.bz_data.length)
            if (this.bz_data.length <= 1) {
                this.$toast({
                    message: `${this.$t('app.tips_zsblygbz')}`
                })
                return
            }
            this.bz_data.splice(this.bz_data.length - 1, 1)
        },
        // 添加步骤
        handelAdd () {
            if (this.bz_data.length >= 10) {
                this.$toast({
                    message: `${this.$t('app.tips_zdsgbz')}`
                })
                return
            }
            this.bz_data.push({
                url: [],
                text: ''
            })
        },
        // 完成
        completeFn () {
            this.showBuzhou = false
        },
        // 获取选中条件
        optionFn () {
            const arr = []
            this.taskAttest.forEach((item, index) => {
                if (item.active) {
                    arr.push(index + 1)
                }
            })
            return arr
        },
        // sampleUrl审核样式方法
        // sampleUrl () {
        //     this.uploader
        // },
        _pubTask () {
            const bzArr = []
            this.bz_data.forEach(item => {
                bzArr.push({ url: item.url, text: item.text })
            })
            const obj = {
                categoryId: this.optionValue, // 平台id
                language: 'zh', // 任务标题
                title: this.params.taskTitle, //
                info: this.params.taskIntroduction, // 任务简介
                price: this.params.taskPrice, // 任务金额
                maxNum: this.params.taskNum, // 任务数量
                apieceNum: this.params.taskChishu, // 任务次数
                taskLevel: this.levelValue, // 可领取等级
                condition: JSON.stringify(this.optionFn()), // 完成条件
                totalPrice: this.params.taskPrice * this.params.taskNum, // 任务总价
                finishDate: this.params.dateValue, // 截止时间
                taskRequire: this.params.taskRequire, // 上传要求
                taskUrl: this.params.taskUrl, // 链接信息
                sampleUrl: JSON.stringify(this.imgArr), // 审核样式
                stepInfo: JSON.stringify(bzArr), // 任务步骤
                isSend: this.$route.query.item.isSend
            }
            if (this.params.taskPrice == '' || this.params.taskPrice < 1) {
                this.$toast({
                    message: `${this.$t('app.tips_rwdjbnwk')}`
                })
                return
            }
            if (this.params.taskNum == '') {
                this.$toast({
                    message: `${this.$t('app.tips_lqslbnwk')}`
                })
                return
            }
            if (this.params.taskChishu == '') {
                this.$toast({
                    message: `${this.$t('app.tips_lqcsbnwk')}`
                })
                return
            }
            if (this.params.dateValue == '') {
                this.$toast({
                    message: `${this.$t('app.tips_datevalue')}`
                })
                return
            }
            pubTask(obj).then(res => {
                if (res.status == '1') {
                    this.$toast({
                        message: `${this.$t('app.tips_tjrwcg')}`
                    })
                } else {
                    this.$toast({
                        message: this.$t(res.status)
                    })
                }
            })
        },
        // 获取任务平台数据
        getTaskData () {
            const data = this.$storage.ssGet('taskApp/categoryList').data.ordinaryTask
            data.forEach((item, index) => {
                this.optionList.push({ text: item.name, value: item.id })
            })
        },
        async _levelConfig () {
            const { data } = await levelConfig()
            data.forEach((item, index) => {
                this.levelList.push({ text: item.level, value: item.levelSeq })
            })
        }
    },
    created () {
        this._levelConfig()
        this.optionValue = Number(this.$route.query.item.id)
        this.getTaskData()
    }
}
</script>

<style lang='scss' scoped>
.shuoming {
    font-size: 12px;
    line-height: 1.4;
    color: #9A9A9A;
    margin: 10px 20px 0 10px;
}
.topWrap {
    margin-bottom: 5px;
}
::v-deep.van-field__label {
    width: 75px;
}
::v-deep.van-dropdown-menu {
    width: 100%;
    .van-dropdown-menu__bar {
        box-shadow: none;
        height: 24px;
        .van-dropdown-menu__title {
            width: 100%;
            padding: 0;
            .van-ellipsis {
                font-size: 14px;
            }
        }
    }
}
.boxWrap {
    display: flex;
    justify-content: space-between;
    .btn {
        color: #666;
        border: 1px solid #666;
        border-radius: 5px;
        padding: 0 3px;
        margin: 0 3px;
    }
    .active {
        color: #1A89FA;
        border: 1px solid #1A89FA;
    }
}
::v-deep.van-uploader__preview-image {
    width: 48px;
    height: 48px;
}
::v-deep.van-uploader__upload {
    width: 48px;
    height: 48px;
}
::v-deep.van-popup {
    background-color: #eeeeee;
}
.bz_top {
    position: relative;
    background-color: #fff;
    height: 46px;
    .van-icon {
        position: absolute;
        left: 5px;
    }
    div {
        text-align: center;
        line-height: 46px;
    }
    .complete {
        position: absolute;
        right: 10px;
    }
}
.itemWrap {
    display: flex;
    height: 78px;
    overflow: hidden;
    align-items: center;
    margin: 10px 0;
    background-color: #fff;
    .number {
        padding-left: 10px;
        width: 50px;
        text-align: center;
    }
    .tupian {
        width: 72px;
        height: 60px;
        overflow: hidden;
        ::v-deep.van-cell {
           padding-top: 8px;
           .van-uploader__wrapper {
               flex-wrap: nowrap;
           }
        }
    }
    .fontWrap {
        flex: 1;
        ::v-deep.van-cell {
            padding: 10px 10px 10px 0;
            font-size: 12px;
        }
        ::v-deep.van-field__control {
            margin-left: 5px;
            border: 1px solid #999999;
            padding: 5px 10px;
            border-radius: 5px;
            line-height: 1.3;
        }
    }
}
.btnWrap {
    display: flex;
    justify-content: center;
    .btn {
        box-sizing: border-box;
        margin: 0 10px;
        width: 60px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        span {
            padding-left: 3px;
        }
    }
    .btn1 {
        background-color: #ffffff;
        border: 1px solid #DEDEDE;
    }
    .btn2 {
        background-color: #1A8AFA;
        border: 1px solid #1A8AFA;
        color: #fff;
    }
}
</style>
