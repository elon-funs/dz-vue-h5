<template>
  <div class="page">
    <div class="type">
      <p>{{ $t("app.WalletType") }}：</p>
      <van-tabs :border="false">
        <van-tab
          v-for="item of dataList"
          :title="item.coinName"
          :key="item.coinId"
        ></van-tab>
      </van-tabs>
    </div>
    <!-- <van-field readonly clickable :label="$t('app.txfs') + '：'" disabled :value="banklistName.bankaddress" :placeholder="$t('app.tips_selectbank')" />
        <van-field v-model="params.num" :placeholder="$t('app.tips_qsrtx')" type="digit" :label="$t('app.txje') + '：'"></van-field>
        <van-field v-model="params.password" :placeholder="$t('app.tips_zjmm')" type="password" :label="$t('app.zjmm') + '：'"></van-field>
        <div class="font">{{$t('app.tips')}}：需要手续费{{sxf}}</div>
        <div class="btn_com" @click="tixian">{{$t('app.withdrawal')}}</div> -->
    <van-cell-group :border="false">
      <van-field
        :border="false"
        disabled
        v-model="form.moneyAddress"
        :label="$t('app.walletaddr')"
        :placeholder="$t('app.walletaddr')"
      />
      <van-field
        :border="false"
        v-model="form.num"
        :placeholder="$t('app.tips_qsrtx')"
        type="digit"
        :label="$t('app.txje')"
      ></van-field>
      <van-field
        :border="false"
        v-model="form.password"
        :placeholder="$t('app.tips_zjmm')"
        type="password"
        :label="$t('app.zjmm')"
      ></van-field>
    </van-cell-group>
    <div class="illustrate">
      <p style="font-size: 18px">{{ $t("app.WithdrawalInstructions") }}</p>
      <p>{{ $t("app.one") }}</p>
      <p>{{ $t("app.two") }}</p>
      <p>{{ $t("app.three") }}</p>
      <p>{{ $t("app.Four") }}</p>
    </div>
    <div class="btn_com fs16" @click="tixian">{{ $t("app.submit") }}</div>
  </div>
</template>

<script>
import { doIncarnate, systemConfig } from "@/api";
export default {
  name: "Withdrawal",
  data() {
    return {
      banklistName: this.$storage.ssGet("userStatus").memBankaccount,
      params: {
        num: "",
        password: "",
      },
      sxf: "",
      dataList: [
        {
          coinName: "TRC20",
          coinId: "1",
        },
      ],
      form: {
        active: "TRC20",
        num: "",
        password: "",
        moneyAddress:
          this.$storage.ssGet("userStatus").memBankaccount.bankaddress,
      },
    };
  },
  methods: {
    checkForm() {
      if (!this.form.num) {
        return false;
      }
      if (!this.form.password) {
        return false;
      }

      return true;
    },

    tixian() {
      if (!this.checkForm()) return;
      const obj = {
        coinName: this.form.active,
        moneyAddress: this.form.moneyAddress,
        apycamt: this.form.num,
        paypassword: this.$md5(this.form.password),
      };
      doIncarnate(obj).then((res) => {
        if (res.status == "1") {
          this.$toast({
            message: `${this.$t("app.tips_txsq")}`,
            duration: 2000,
          });
          this.$router.push({ path: "/wallet" });
        }
      });
    },
  },
  created() {
    systemConfig({ pcode: "commission" }).then((res) => {
      this.sxf = res.data.busparamname;
    });
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/vant.scss";
::v-deep .van-cell-group {
  margin: 10% auto;
  width: 94%;
  background-color: #191919;
}
::v-deep .van-field__label {
  color: #c8a76a;
  font-family: Inter;
  font-weight: medium;
  font-size: 16px;
  line-height: normal;
  letter-spacing: 0px;
  text-align: left;
  width: 5.2em;
}
::v-deep .van-field__body {
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(90deg, #393939 0%, #242424 100%);
}
::v-deep .van-field__control {
  padding-left: 12px;
  font-family: Inter;
  color: #919191;
  font-weight: regular;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0px;
  text-align: left;
}
.font {
  padding: 15px;
  color: #999;
}
::v-deep .van-tabs__wrap .van-tab--active {
  color: #191919 !important;
  background: linear-gradient(90deg, #e0c08d 0%, #c4a269 100%);
}
::v-deep .van-tab {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 0.10667rem;
  color: #c8a76a;
  font-size: 0.37333rem;
  cursor: pointer;
}
::v-deep .van-tabs--line .van-tabs__wrap {
  width: 94%;
  height: 1.17333rem;
  margin: 20px auto;
}
::v-deep .van-tabs__line {
  transform: translateX(273px) translateX(-50%);
  transition-duration: 0.3s;
  background-color: #191919 !important;
}
::v-deep .van-cell {
  display: block;
}
::v-deep .van-field__label {
  font-size: 16px;
  width: 100%;
  color: #e0c08d;
}
::v-deep .van-cell__value {
  width: 100%;
  padding: 5px 10px;
}
.type {
  p {
    color: #c8a76a;
    font-family: Inter;
    font-weight: medium;
    font-size: 16px;
    line-height: normal;
    letter-spacing: 0px;
    text-align: left;
    margin: 20px;
  }
}
.illustrate {
  width: 94%;
  border-radius: 8px;
  background: linear-gradient(90deg, #393939 0%, #242424 100%);
  margin: 10% auto;
  p {
    color: #c8a76a;
    font-family: Inter;
    font-weight: medium;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0px;
    text-align: left;
    margin: 0px 0px 0px 12px;
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
</style>
