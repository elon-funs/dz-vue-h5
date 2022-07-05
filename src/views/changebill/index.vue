<template>
  <div>
    <van-tabs @change="onClick" :border="false">
      <van-tab v-for="item of list" :title="$t(item.title)" :key="item.id">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="$t('app.nodata_l')"
          @load="onLoad"
        >
          <changview :listdata="listdata"></changview>
        </van-list>
        <!-- <van-loading v-if="lodding" type="spinner" vertical>{{$t('app.lodding_z')}}...</van-loading> -->
        <!-- <div class="nodata" v-if="!lodding && !nodeta">{{$t('app.nodata_l')}}</div> -->
        <!-- <div class="nodata" v-if="listdata.length == 0 && !lodding">{{$t('app.no_data')}}</div> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { myIncomeAndExpensesList } from '@/api'
import changview from './components/changview'
const LIST = [
    {
        title: 'app.income',
        id: 1
    },
    {
        title: 'app.expenditure',
        id: 2
    }
    // {
    //     title: '充值',
    //     id: '2'
    // }
]
export default {
    name: 'Changebill',
    data () {
        return {
            list: Object.freeze(LIST),
            listdata: [],
            lodding: true,
            nodeta: false,
            pageNo: 1,
            type: 1,
            loading: false,
            finished: false,
            totalPage: 1
        }
    },
    components: {
        changview
    },
    methods: {
        onLoad () {
            this._myIncomeAndExpensesList()
        },
        lazyLoading () {
            const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
            const clientHeight = document.documentElement.clientHeight
            const scrollHeight = document.documentElement.scrollHeight
            if (scrollTop + clientHeight >= scrollHeight) {
                this.pageNo++
                this.lodding = true
                const obj = {
                    type: this.type,
                    pageNo: this.pageNo,
                    pageSize: 7
                }
                console.log(scrollTop, clientHeight, scrollHeight)
                myIncomeAndExpensesList(obj).then(res => {
                    this.lodding = false
                    if (res.status == '1') {
                        res.data.data.forEach(item => {
                            this.listdata.push(item)
                        })
                    }
                    window.scrollTo(0, scrollTop - 10)
                })
            }
        },
        handelCilck (item) {
            console.log(item)
        },
        onClick (id, title) {
            this.finished = false
            this.listdata = []
            this.lodding = true
            this.nodeta = false
            this.pageNo = 1
            this.totalPage = 1
            this.type = this.list[id].id
            // this.onLoad()
            // this._myIncomeAndExpensesList()
        },
        async _myIncomeAndExpensesList () {
            const obj = {
                type: this.type,
                pageNo: this.pageNo,
                pageSize: 10
            }
            const { data } = await myIncomeAndExpensesList(obj)
            this.loading = false
            this.totalPage = data.totalPage
            if (!data.data.length) {
                this.finished = true
            }
            if (this.pageNo === data.totalPage) {
                this.finished = true
            } else {
                this.pageNo += 1
            }
            this.listdata = this.listdata.concat(data.data)
            this.nodeta = data.data < 1
            this.lodding = false
        }
    },
    created () {
    // 滚动到底部，再加载的处理事件
    // window.addEventListener('scroll', this.lazyLoading)
        // this._myIncomeAndExpensesList()
    },
    destroyed () {
    // 页面离开后销毁，防止切换路由后上一个页面监听scroll滚动事件会在新页面报错问题
        window.removeEventListener('scroll', this.lazyLoading)
    }
}
</script>

<style lang="scss" scoped>
::v-deep.van-tabs__wrap {
  margin-bottom: 8px;
}
.nodata {
  text-align: center;
  padding: 20px;
}
</style>
