<template>
  <div>
    <div class="topBlack">
      <div class="title fs18">
        {{ $t("app.my_shangji") }}：{{ shangji || $t("app.nothing") }}
      </div>
      <div class="userInfo">
        <div class="touxiang">
          <img
            :src="userInfo.headimgurl || require('@/assets/img/touxiang.png')"
          />
        </div>
        <div class="detail fs16">
          <div class="zh">
            <span class="text1">{{ $t("app.login_account") }}</span
            >：{{ userInfo.mobileno }}
          </div>
          <div class="yqm">
            <span class="text1">{{ $t("app.creditScore") }}</span
            >：{{ creditRatingList }}
          </div>
          <div class="yqm">
            <span class="text1">{{ $t("app.yaoqingma") }}</span
            >：{{ userInfo.recomcode }}
          </div>
          <div class="ye">
            <span class="text1">{{ $t("app.yue") }}</span
            >：<span class="fs24 text2">{{ yue }}</span>
            <span class="text1">&nbsp;{{ $t("app.yuan") }}</span>
            <i
              class="iconfont icontianchongxing- fs22 pad"
              @click="$router.push({ path: '/wallet' })"
            ></i>
          </div>
        </div>
      </div>
      <van-steps
        :active="active"
        active-color="#C8A76A"
        inactive-color="#393939"
      >
        <van-step>{{ $t("app.fenghao") }}</van-step>
        <van-step>{{ $t("app.restrictions") }}</van-step>
        <van-step>{{ $t("app.good") }}</van-step>
        <van-step>{{ $t("app.excellent") }}</van-step>
      </van-steps>
      <div class="btns">
        <van-button
          class="btn"
          :icon="require('@/assets/imgs/my/提款@1x.png')"
          type="primary"
          @click="recharge"
          color="linear-gradient(90deg, #393939 0%, #242424 100%)"
          >{{ $t("app.topup") }}</van-button
        >
        <van-button
          class="btn"
          :icon="require('@/assets/imgs/my/提款@1x.png')"
          type="primary"
          @click="goTixian"
          color="linear-gradient(90deg, #393939 0%, #242424 100%)"
          >{{ $t("app.withdrawal") }}</van-button
        >
      </div>
    </div>

    <!-- <div class="nav">
            <div class="item" v-for="item of navData" :key="item.name" @click="$router.push({ path: item.route })">
                <img :src="item.imgUrl" />
                <div class="mar">{{$t(item.name)}}</div>
            </div>
        </div> -->
  </div>
</template>

<script>
import { findPayPassAndAccount, systemConfig, getMemberCredit } from "@/api";
const NAVDATA = [
  {
    name: "app.task_jl",
    route: "/task",
    imgUrl: require("@/assets/img/my_zi.png"),
  },
  {
    name: "app.examineTask",
    route: "/examinetask",
    imgUrl: require("@/assets/img/my_lan.png"),
  },
  // {
  //     name: '发布管理',
  //     route: '/releasetask',
  //     imgUrl: require('@/assets/img/my_hong.png')
  // }
];
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
    yue: {
      type: Number,
      default: 0,
    },
    creditRating: String,
  },
  data() {
    return {
      active: 0,
      navData: Object.freeze(NAVDATA),
      shangji: this.$storage.lsGet("userInfo").higher,
      systemConfig: "",
      levelSeq: this.$storage.lsGet("userInfo").levelSeq,
      creditRatingList: 0,
    };
  },
  methods: {
    handleClick(item) {
      console.log(item);
    },

    recharge() {
      // this.$dialog
      //   .confirm({
      //     message: this.$t("app.contacktrecharge"),
      //   })
      //   .then(() => {
      //     // window.location.href = this.systemConfig;
      //     this.$router.push({ path: '/customerService' })
      //   })
      //   .catch(() => {
      //     // on cancel
      //   });
      this.$router.push({ path: "/topup" });
    },

    async goTixian() {
      if (this.creditRatingList < 60) {
        this.$dialog
          .confirm({
            title: `${this.$t("app.tips")}`,
            message: `${this.$t("app.creditScoreBelow")}`,
          })
          .then(() => {})
          .catch(() => {});
      } else if (this.levelSeq === 0) {
        this.$dialog
          .confirm({
            title: `${this.$t("app.tips")}`,
            message: `${this.$t("app.vipizin")}`,
          })
          .then(() => {})
          .catch(() => {});
      }
      // if (!this.$storage.ssGet("userStatus").isBind) {
      //   this.$dialog
      //     .confirm({
      //       title: `${this.$t("app.tips")}`,
      //       message: `${this.$t("app.tips_nwbdyhk")}`,
      //     })
      //     .then(() => {
      //       this.$router.push({ path: "/userinfo/yhkBangding" });
      //     })
      //     .catch(() => {
      //       // on cancel
      //     });
      // } else
      else {
        // this.$dialog.confirm({
        //   title: `Withdrawal suspended for 1 hours`,
        //   message: `Retiro suspendido por 1 horas`,
        // });
        const res = await findPayPassAndAccount();
        if (res.data.isBind) {
          this.$router.push({ path: "/withdrawal" });
        } else {
          this.$dialog
            .confirm({
              message: `${this.$t("app.tips_nwbdyhk")}`,
            })
            .then(() => {
              this.$router.push({ path: "/userinfo/yhkBangding" });
            })
            .catch(() => {
              // on cancel
            });
        }
      }
    },
  },
  created() {
    systemConfig({ pcode: "service_url" }).then((res) => {
      this.systemConfig = res.data.busparamname;
    });
    getMemberCredit().then((res) => {
      this.creditRatingList = res.data;
      const creditRating = res.data;
      if (creditRating <= 0) {
        this.active = 0;
      } else if (creditRating < 60 && creditRating > 0) {
        this.active = 1;
      } else if (creditRating <= 80 && creditRating >= 60) {
        this.active = 2;
      } else {
        this.active = 3;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

// ::v-deep .van-steps {
// background: $bg3;
// color: $color1;
// }
// ::v-deep .van-step--finish {
//   color: $color1!important;
// }
// ::v-deep .van-step__circle-container {
//   background: none;
// }
::v-deep .van-step__line {
  background-color: #393939;
}
::v-deep .van-step__circle {
  background-color: #393939;
}
::v-deep .van-step__title {
  color: $color1;
}
::v-deep .van-steps--horizontal {
  margin: 10px 15px 0;
  padding: 10px 15px 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .van-step__title {
    font-size: 14px;
  }
}
::v-deep .van-button__text {
  padding: 0 10px;
  color: $color1;
}
.topBlack {
  width: 100%;
  overflow: hidden;
  background: $bg1;
  .title {
    color: #fff;
    text-align: center;
    padding: 15px 0;
    border-bottom: 1px solid $bg2;
  }
  .userInfo {
    display: flex;
    .touxiang {
      margin: 30px 0 0 18px;
      width: 75px;
      height: 75px;
      img {
        width: 100%;
      }
    }
    .detail {
      color: #fff;
      margin: 33px 0 0 15px;
      flex: 1;
      .yqm {
        margin: 8px 0 3px;
      }
      .ye {
        span {
          color: #fced04;
        }
        .pad {
          position: absolute;
          right: 30px;
          margin-left: 20px;
          color: $color1;
        }
      }
    }
  }
}

.btns {
  padding: 16px;
  display: flex;
  justify-content: space-between;

  .btn {
    width: 165px;
    height: 36px;
    border-radius: 8px;
  }
}

.nav {
  display: flex;
  padding: 16px 0;
  justify-content: space-around;
  // background-color: #fff;
  .item {
    text-align: center;
    img {
      width: 44px;
      height: 44px;
    }
    .mar {
      margin-top: 3px;
    }
  }
}
</style>
