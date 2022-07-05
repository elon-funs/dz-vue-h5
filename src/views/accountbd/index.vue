<template>
    <div>
        <van-tabs @click="onClick" :border="false">
            <van-tab v-for="item of tablist" :title="item.name" :key="item.id"></van-tab>
        </van-tabs>
        <van-cell-group>
            <van-field v-model="value" :label="$t('app.account') + '：'" :placeholder="tishi" />
        </van-cell-group>
        <div class="fs16 btn_com" @click="postFn">{{$t('app.submit')}}</div>
    </div>
</template>

<script>
import storage from '@/utils/storage'
import { bindCategoryName, bindRelated } from '@/api'
const ordinaryTask = storage.ssGet('taskApp/categoryList').data.ordinaryTask
export default {
    name: 'Accountbd',
    data () {
        return {
            value: '',
            tablist: [],
            taskid: '',
            tishi: ''
        }
    },
    methods: {
        onClick (i, name) {
            this.value = ''
            this.taskid = this.tablist[i].id
            this.tishi = this.$t('app.please_input') + name + this.$t('app.account')
            this._bindCategoryName()
        },
        // 查询是否绑定账号
        async _bindCategoryName () {
            const { data } = await bindCategoryName({ id: this.taskid, bindStatus: 1 })
            this.value = data
        },
        // 绑定账号
        // async _bindRelated () {
        //     bindRelated()
        // },
        postFn () {
            bindRelated({ categoryNo: this.value, id: this.taskid }).then(res => {
                if (res.status == '1') {
                    this.$toast({
                        message: `${this.$t('app.binding_success')}！`
                    })
                    setTimeout(() => {
                        this._bindCategoryName()
                    }, 500)
                }
            })
        }
    },
    created () {
        this.tablist = ordinaryTask.filter(item => item.bindStatus == 1)
        this.taskid = this.tablist[0].id
        this.tishi = this.$t('app.please_input') + this.tablist[0].name + this.$t('app.account')
        this._bindCategoryName()
    }
}
</script>

<style lang='scss' scoped>
.van-cell-group {
    margin-top: 10px;
}
::v-deep .van-tab--active {
    color: #1989FA;
}
::v-deep .van-tabs__line {
    bottom: 20px;
    background-color: #1989FA;
}
</style>
