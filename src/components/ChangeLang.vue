<template>
  <div>
    <img @click="show = true" src="@/assets/imgs/语言选择@1x.png" alt="">
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import { i18n, vantLocales } from '@/lang/index'

export default {
    data () {
        return {
            show: false,
            // 通过 actions 属性来定义菜单选项
            actions: [
                // { name: '中文', lang: 'zh' },
                { name: 'English', lang: 'en' },
                { name: 'Spanish', lang: 'es' },
                { name: 'Arabic', lang: 'ar' },
                { name: 'French', lang: 'fr' }
            ]
        }
    },

    methods: {
        onSelect (item) {
            this.show = false
            this.$storage.lsSet('lang', item.lang)
            i18n.locale = item.lang
            vantLocales(item.lang)
            // this.$toast({
            //     message: item.name === '中文' ? `${item.name}${this.$t('app.switchSuccess')}` : `${item.name} ${this.$t('app.switchSuccess')}`
            // })
        }
    }
}
</script>

<style>

</style>
