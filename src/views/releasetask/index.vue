<template>
    <div>
        <van-tabs @click="onClick">
            <van-tab v-for="item of tablist" :title="item.name" :key="item.id">
                <!-- <van-loading v-if="lodding" type="spinner" vertical>加载中...</van-loading> -->
                <!-- <listitem v-if="listArr.length > 0" :listArr='listArr'></listitem> -->
                <!-- <div class="nodata" v-if="nodeta">暂无数据~</div> -->
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
    name: 'Releasetask',
    data () {
        return {
            tablist: Object.freeze(this.$storage.ssGet('taskApp/categoryList').data.ordinaryTask)
        }
    },
    methods: {
        onClick (id, title) {
            console.log(id, title)
        }
    },
    created () {
        console.log(this.$storage.ssGet('taskApp/categoryList'))
    }
}
</script>

<style lang='scss' scoped>

</style>
