<template>
  <div>
    <van-cell-group  :border="false">
      <van-cell :title="$t(item.name)" is-link  v-for="item of navData"
        :key="item.name" :border="false" @click="go(item.route)">
          <template #icon>
              <img :src="item.imgUrl" alt="">
          </template>
      </van-cell>
    </van-cell-group>
    <!-- <div class="navWrap">
      <div
        class="item"
        v-for="item of navData"
        :key="item.name"
        @click="$router.push({ path: item.route })"
      >
        <div class="img">
          <img :src="item.imgUrl" />
        </div>
        <div class="font">
          {{ $t(item.name) }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
const NAVDATA = [
    {
        imgUrl: require('@/assets/imgs/my/个人信息@1x.png'),
        name: 'app.grxx',
        route: '/userinfo'
    },
    // {
    //     imgUrl: require('@/assets/imgs/my/个人信息@1x.png'),
    //     name: 'app.account_bd',
    //     route: '/accountbd'
    // },
    {
        imgUrl: require('@/assets/imgs/my/日结报表@1x.png'),
        name: 'app.today_report',
        route: '/report'
    },
    {
        imgUrl: require('@/assets/imgs/my/账本记录@1x.png'),
        name: 'app.changeRecord',
        route: '/changebill'
    },
    {
        imgUrl: require('@/assets/imgs/my/好友邀请@1x.png'),
        name: 'app.yaoqinghy',
        route: '/invitefriends'
    },
    {
        imgUrl: require('@/assets/imgs/my/团队报表@1x.png'),
        name: 'app.team_report',
        route: '/teamreports'
    },
    {
        imgUrl: require('@/assets/imgs/my/帮助指南@1x.png'),
        name: 'app.help_manual',
        route: '/help'
    },
    {
        imgUrl: require('@/assets/imgs/my/gongsi@1x.png'),
        name: 'app.companyInfo',
        route: '/companyInformation'
    },
    {
        imgUrl: require('@/assets/imgs/my/项目简介@1x.png'),
        name: 'app.project',
        route: '/projectDescription'
    },
    {
        imgUrl: require('@/assets/imgs/my/退出@1x.png'),
        name: 'app.out_login',
        route: '/login'
    }
    // {
    //     imgUrl: require('@/assets/imgs/my/个人信息@1x.png'),
    //     name: 'app.credit_center',
    //     route: '/creditcenter'
    // }
    // {
    //     imgUrl: require('@/assets/img/my_applogo.png'),
    //     name: 'app.app_download',
    //     route: '/appdownload'
    // }
]
export default {
    data () {
        return {
            navData: Object.freeze(NAVDATA)
        }
    },
    methods: {
        go (route) {
            if (route === '/login') {
                this.$emit('outLogin')
                return
            }
            this.$router.push(route)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

::v-deep .van-cell-group .van-cell {
    background: $bg1;
    color: $color2;
}

::v-deep .van-cell {
    border-bottom: 0.5px solid $bg2;
}

::v-deep .van-cell__title {
  padding-left: 10px;
}

.navWrap {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  margin-bottom: 30px;
  .item {
    width: 25%;
    height: 100px;
    .img {
      width: 46px;
      height: 46px;
      margin: 10px auto;
      img {
        width: 100%;
      }
    }
    .font {
      text-align: center;
    }
  }
  .item:nth-of-type(6) {
    .img {
      img {
        height: 95%;
      }
    }
  }
  .item:nth-of-type(7) {
    .img {
      img {
        height: 95%;
      }
    }
  }
  .item:nth-of-type(8) {
    .img {
      margin: 5px auto 15px;
      img {
        height: 115%;
      }
    }
  }
}
</style>
