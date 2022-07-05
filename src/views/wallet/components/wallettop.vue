<template>
  <div class="top">
    <div class="font">{{ $t("app.zzc") }}：</div>
    <div class="qina">{{ yue || 0 }} <span class="usdt">USDT</span></div>
    <div class="tab">
      <div class="item" @click="recharge">
        <img class="img" src="@/assets/imgs/my/Withdraw@1x.png" alt="" />
        {{ $t("app.topup") }}
      </div>
      <div class="item" @click="goTixian">
        <img class="img" src="@/assets/imgs/my/Withdraw@1x.png" alt="" />
        {{ $t("app.withdrawal") }}
      </div>
      <div class="line centerXY"></div>
    </div>
  </div>
</template>

<script>
import { findPayPassAndAccount, systemConfig, getMemberCredit } from "@/api";

export default {
  props: {
    yue: Number,
  },
  data() {
    return {
      systemConfig: "",
      levelSeq: this.$storage.lsGet("userInfo").levelSeq,
      creditRatingList: 0,
    };
  },
  created() {
    systemConfig({ pcode: "service_url" }).then((res) => {
      this.systemConfig = res.data.busparamname;
    });
    getMemberCredit().then((res) => {
      this.creditRatingList = res.data;
    });
  },
  methods: {
    recharge() {
      // this.$dialog
      //   .confirm({
      //     message: this.$t("app.contacktrecharge"),
      //   })
      //   .then(() => {
      //     // window.location.href = this.systemConfig;
      //     this.$router.push({ path: "/customerService" });
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
      } else {
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
        // }
        // this.$dialog.confirm({
        //   title: `Withdrawal suspended for 1 hours`,
        //   message: `Retiro suspendido por 1 horas`,
        // });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/vant.scss";

.usdt {
  font-size: 20px;
}

.top {
  box-sizing: border-box;
  position: relative;
  color: #fff;
  margin: 10px 5px;
  height: 140px;
  border-radius: 5px;
  overflow: hidden;
  background: url("../../../assets/imgs/my/Group913863.png") no-repeat;
  background-size: cover;
  .font {
    margin: 15px 0 0 35px;
    color: $bg1;
  }
  .qina {
    margin: 15px 0 0 30px;
    font-size: 35px;
    color: $bg1;
    font-weight: bold;
  }
  .tab {
    position: absolute;
    width: 100%;
    display: flex;
    height: 40px;
    line-height: 40px;
    bottom: 0;
    background: rgba(200, 167, 106, 0.2);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .item {
      width: 50%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;

      .img {
        padding: 0 10px;
      }

      div {
        display: inline-block;
        width: 23px;
        height: 23px;
        border-radius: 20px;
        text-align: center;
        line-height: 23px;
      }
      .one {
        background-color: #fda250;
      }
      .two {
        background-color: #50d1f9;
      }
    }
    .line {
      position: absolute;
      width: 1px;
      height: 16px;
      background-color: #ffffff;
    }
  }
}
</style>
