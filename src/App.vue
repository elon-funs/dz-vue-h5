<template>
  <div id="app">
    <template>
      <Vheader v-if="!noHeader"></Vheader>
      <keep-alive :include="keepAliveComponents">
        <router-view
          class="viewBox"
          :class="noHeader ? 'noToppadding' : nonavBar ? 'noBottompadding' : ''"
        />
      </keep-alive>
      <navBar v-show="navFlag"></navBar>
    </template>
    <!-- <VfirstLoading v-else></VfirstLoading> -->
  </div>
</template>

<script>
// import { getNewHomeData } from '@/api'
import navBar from './components/NavBar'
import Vheader from './components/Vheader'
// import VfirstLoading from './components/VfirstLoading'
import { mapState } from 'vuex'
export default {
    provide () {
        return {
            app: this
        }
    },
    data () {
        return {
            navFlag: true,
            homeData: null
            // showApp: true
        }
    },
    watch: {
        $route (to, from) {
            this.navFlag = !to.meta.nonavBar
            // if (to.name === 'Home') {
            //     this.homeDataFn()
            // }
        }
    },
    components: {
        navBar,
        Vheader
    // VfirstLoading
    },
    computed: {
        noHeader () {
            return this.$route.meta.noHeader
        },
        nonavBar () {
            return this.$route.meta.nonavBar
        },
        ...mapState({
            keepAliveComponents: state => state.keepAliveComponents
        })
    },
    methods: {
    // async getNewHomeDataFn (bool) {
    //     const { data } = await getNewHomeData(bool)
    //     this.homeData = Object.freeze(data)
    //     this.$storage.ssSet('HomeData', data)
    //     this.$storage.ssSet('isfirst', true)
    //     this.showApp = true
    // }
    // homeDataFn () {
    //     if (this.$storage.ssGet('HomeData')) {
    //         this.homeData = this.$storage.ssGet('HomeData')
    //         this.getNewHomeDataFn(true)
    //     } else {
    //         this.getNewHomeDataFn(true)
    //     }
    // }
    },
    created () {
        this.showApp = this.$storage.ssGet('isfirst')
    }
}
</script>

<style lang="scss">
@import "@/styles/theme.scss";

#app {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 14px;
  box-sizing: border-box;
  text-transform: capitalize;
}
.viewBox {
  height: auto;
  min-height: calc(100% - 95px);
  padding: 45px 0 50px;
  // overflow: hidden;
  background-color: $bg2;
}
.noToppadding {
  padding: 0 !important;
}
.noBottompadding {
  min-height: calc(100% - 45px);
  padding: 45px 0 0 !important;
}
</style>
