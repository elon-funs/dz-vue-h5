<template>
  <div>
    <van-nav-bar :fixed="true" :border="false">
      <!-- 返回icon -->
      <template #left>
        <van-icon
          v-if="showBack"
          name="arrow-left"
          size="20"
          color="#C8A76A"
          @click="goBack"
        />
        <!-- <div class="line" v-if="changeLine" @click="$router.push({ path: '/lineselect' })">{{$t('app.switchingCircuit')}}</div> -->

        <change-lang  v-if="lang"></change-lang>
      </template>
      <!-- 页面标题 -->
      <template v-slot:title>
        <span>{{ $t(title) }}</span>
        <img v-if="needLogo" class="img" src="../assets/imgs/STP.png" />
      </template>
      <!-- 选择语言 -->
      <!-- <template #right v-if="languageSelect">
                <div @click="show = true" :style="{'color': $route.path == '/register' ? '#000000':'#FF3333'}">{{$t('app.selectLanguage')}}</div>
            </template> -->
    </van-nav-bar>
  </div>
</template>

<script>
import ChangeLang from './ChangeLang.vue'

export default {
    components: { ChangeLang },
    name: 'Vheader',
    data () {
        return {
            imgurl: '../assets/img/headerimg.png'

        }
    },
    computed: {
        changeLine () {
            return this.$route.meta.changeLine
        },
        showBack () {
            return this.$route.meta.showBack
        },
        title () {
            return this.$route.meta.title
        },
        lang () {
            return this.$route.meta.lang
        },
        // languageSelect () {
        //     return this.$route.meta.languageSelect
        // },
        needLogo () {
            return this.$route.meta.needLogo
        }
    },
    methods: {
        goBack () {
            if (this.$route.name === 'Login' || this.$route.name === 'Home') {
                this.$router.push('/home')
            } else {
                window.history.length > 2
                    ? this.$router.go(-1)
                    : this.$router.push('/')
            }
        }

    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.van-nav-bar {
  height: 45px;
  touch-action: none;
  background-color: $bg1 !important;
  color: $color2;
  z-index: 9;
  ::v-deep.van-nav-bar__title {
    color: $color2;
    display: flex;
    align-items: center;
  }
}
.line {
  color: $color2;
}
.img {
  width: 60px;
  height: 30px;
}
</style>
