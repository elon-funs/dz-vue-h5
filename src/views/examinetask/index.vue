<template>
    <div>
        <van-tabs @click="onClick">
            <van-tab v-for="item of tablist" :title="$t(item.title)" :key="item.id">
                <listitem v-if="listArr.length > 0" :listArr='listArr' :status='status'></listitem>
                <van-loading v-if="lodding" type="spinner" vertical>{{$t('app.lodding_z')}}...</van-loading>
                <div class="noData" v-if="nodeta">{{$t('app.no_data')}}</div>
                <div style="text-align: center; padding: 0.4rem 0;" v-if="!lodding && !nodeta">{{$t('app.nodata_l')}}</div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { waitReceiveList } from '@/api'
import listitem from './components/listitem'
const TABLIST = [
    {
        title: 'app.task_jxz',
        id: 1
    },
    {
        title: 'app.task_shz',
        id: 2
    },
    {
        title: 'app.task_ywc',
        id: 3
    },
    {
        title: 'app.task_ysb',
        id: 4
    }
]
export default {
    name: 'Examinetask',
    data () {
        return {
            tablist: Object.freeze(TABLIST),
            listArr: [],
            lodding: false,
            nodeta: false,
            status: 1,
            pageNo: 1
        }
    },
    components: {
        listitem
    },
    methods: {
        // 滚动底部加载
        lazyLoading () {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            const clientHeight = document.documentElement.clientHeight
            const scrollHeight = document.documentElement.scrollHeight
            if (scrollTop + clientHeight >= scrollHeight) {
                console.log(1)
                this.pageNo++
                this.lodding = true
                waitReceiveList({ status: this.status, pageNo: this.pageNo, pageSize: 10 }).then(res => {
                    if (res.status == '1') {
                        this.lodding = false
                        res.data.list.forEach(item => {
                            this.listArr.push(item)
                        })
                    }
                })
            }
        },
        onClick (id, title) {
            this.pageNo = 1
            this.status = this.tablist[id].id
            this.lodding = true
            this.nodeta = false
            this.listArr = []
            this._postlist()
        },
        async _postlist () {
            this.lodding = true
            const { data } = await waitReceiveList({ status: this.status, pageNo: this.pageNo, pageSize: 10 })
            this.listArr = data.list
            this.lodding = false
            this.nodeta = data.list < 1
        }
    },
    created () {
        this._postlist()
        // 滚动到底部，再加载的处理事件
        window.addEventListener('scroll', this.lazyLoading)
    },
    destroyed () {
        // 页面离开后销毁，防止切换路由后上一个页面监听scroll滚动事件会在新页面报错问题
        window.removeEventListener('scroll', this.lazyLoading)
    }
}
</script>

<style lang='scss' scoped>
::v-deep.van-tabs__wrap {
    position: fixed;
    width: 100%;
    top: 45px;
    left: 0;
    z-index: 100;
}
::v-deep.van-tabs__content {
    padding-top: 45px;
}
.van-loading {
    margin-top: 20px;
}
.noData {
    text-align: center;
    padding: 15px 0;
}
</style>
