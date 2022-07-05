<template>
    <div class="tuiguang">
        <img :src="bg" alt="">
        <van-icon size="25" color='#fff' name="arrow-left" @click="$router.push({ path: '/' })" />
    </div>
</template>

<script>
export default {
    name: 'ReturnBate',
    data () {
        return {
        }
    },
    computed: {
        bg () {
            const img = require(`@/assets/imgs/returnBate/${this.$i18n.locale}.png`)
            return img
        }
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
.tuiguang {
    width: 100%;
    img {
        width: 100%;
    }
}
::v-deep.van-icon {
    position: fixed;
    top: 10px;
    left: 10px;
}
</style>
