<template>
    <div>
        <div class="wrap">
            <van-cell v-for="item of helpList" :key="item.id" :title="item.title"  @click="handelShow(item.content)" is-link />
            <van-popup v-model="detailShow" closeable position="bottom" :style="{ height: '100%' }">
                <div class="contentWrap" v-html="contentText"></div>
            </van-popup>
        </div>
    </div>
</template>

<script>
import { helpManual } from '@/api'
export default {
    name: 'Help',
    data () {
        return {
            helpList: [],
            detailShow: false,
            contentText: ''
        }
    },
    methods: {
        async _helpManual () {
            const { data } = await helpManual()
            this.helpList = data.list
        },
        handelShow (con) {
            this.contentText = con
            this.detailShow = true
        }
    },
    created () {
        this._helpManual()
    }
}
</script>

<style lang='scss' scoped>
.wrap {
    margin: 10px 0;
}
.contentWrap {
    margin-top: 50px;
    padding: 15px;
}
</style>
