<template>
  <div class="navWrap">
    <div
      class="navItem"
      v-for="item of navData"
      :key="item.id"
      :class="$route.path === item.href ? 'active' : ''"
      @click="handelClick(item)"
    >
      <img class="img" :src="$route.path === item.href ? item.iconed : item.icon" alt="">
      <span class="font">{{ $t(item.name) }}</span>
    </div>
  </div>
</template>

<script>
const NAVDATA = [
    {
        id: 1,
        name: 'app.homepage',
        href: '/home',
        icon: require('@/assets/imgs/tabbar/Home (1).png'),
        iconed: require('@/assets/imgs/tabbar/Home@1x.png')
    },
    {
        id: 2,
        name: 'app.task',
        href: '/task',
        icon: require('@/assets/imgs/tabbar/任务_h@1x.png'),
        iconed: require('@/assets/imgs/tabbar/任务_l@1x.png')
    },
    {
        id: 3,
        name: 'app.vip',
        href: '/vip',
        icon: require('@/assets/imgs/tabbar/VIP_h@1x.png'),
        iconed: require('@/assets/imgs/tabbar/VIP_L@1x.png')
    },
    {
        id: 4,
        name: 'app.earnings',
        href: '/earnings',
        icon: require('@/assets/imgs/tabbar/收益_h@1x.png'),
        iconed: require('@/assets/imgs/tabbar/收益_L@1x.png')
    },
    {
        id: 5,
        name: 'app.my',
        href: '/my',
        icon: require('@/assets/imgs/tabbar/My_h@1x.png'),
        iconed: require('@/assets/imgs/tabbar/My_l@1x.png')
    }
]
export default {
    name: 'navBar',
    data () {
        return {
            navData: Object.freeze(NAVDATA)
        }
    },
    methods: {
        handelClick (item) {
            this.$router.push({ path: item.href })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.navWrap {
  position: fixed;
  display: flex;
  background-color: $bg1;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 8;

  .navItem {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 20%;
    text-align: center;
    height: 100%;
    color: #666666;

    .img {
      width: 20px;
      height: 20px;
    }
  }
}
.active {
  color: $color1 !important;
}
.icon_font {
  font-size: 28px;
}
.font {
  font-size: 12px;
}
</style>
