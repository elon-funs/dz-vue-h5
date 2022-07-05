<template>
  <div class="wrap">
    <van-tabs :border="false">
      <van-tab
        v-for="item of dataList"
        :title="item.coinName"
        :key="item.coinId"
      ></van-tab>
    </van-tabs>
    <van-notice-bar
      v-if="appSrc !== '' && appSrc !== null"
      background="#191919"
      color="red"
      scrollable
      left-icon="volume-o"
      :text="$t('app.RechargeReminder')"
    />
    <div class="content" v-if="appSrc !== '' && appSrc !== null">
      <!-- <p style="color: red; font-size:22px"></p> -->
      <vue-qr
        :size="180"
        :margin="0"
        :auto-color="true"
        :dot-scale="1"
        :text="appSrc"
        style="margin-top: 8%"
      />
      <van-cell-group :border="false">
        <p>{{ $t("app.recharge") }}</p>
        <van-field
          :border="false"
          readonly
          v-model="form.moneyAddress"
          :placeholder="$t('app.walletaddr')"
        />

        <!-- <p>{{ $t("app.RechargeAmount") }}</p>
        <van-field
          :border="false"
          v-model="form.amount"
          :placeholder="$t('app.PleaseAmount')"
          type="digit"
        ></van-field> -->
      </van-cell-group>
      <!-- <van-button class="copy" type="primary" @click="copy('address')"
        >Copy Address</van-button
      > -->
      <div class="btn_com fs16" @click="copy(form.moneyAddress)">
        {{ $t("app.copy") }}
      </div>
    </div>
  </div>
</template>

<script>
import { moneyAddress, coinList, submitRecharge } from "@/api";
import VueQr from "vue-qr";

export default {
  name: "Topup",
  data() {
    return {
      form: {
        coinName: "",
        amount: "",
        moneyAddress: "",
      },
      dataList: [],
      // 二维码链接
      appSrc: "",
    };
  },
  components: {
    VueQr,
  },
  methods: {
    checkForm() {
      if (!this.form.amount) {
        return false;
      }
      if (!this.form.moneyAddress) {
        return false;
      }

      return true;
    },
    // 充值
    async submitRecharge() {
      if (!this.checkForm()) return;
      const res = await submitRecharge(this.form);
    },
    // 复制
    copy(el) {
      // 创建一个 Input标签
      const oInput = document.createElement("input");
      oInput.value = el;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      // 执行浏览器复制命令
      /// 复制命令会将当前选中的内容复制到剪切板中
      /// 如这里构建的 Input标签
      this.$toast(this.$t("app.copy_success"));
      document.execCommand("Copy");
      /// 复制成功后再将构造的标签 移除
      oInput.remove();
    },

    async coinList() {
      const res = await coinList();
      this.dataList = [];
      res.data.forEach((item, i) => {
        if (item.coinName === "TRC20") {
          this.dataList.push(res.data[i]);
        }
      });
      this.form.coinName = this.dataList[0].coinName;
      this.queryMoneyAddress();
    },
    // 查询钱包地址
    async queryMoneyAddress() {
      const res = await moneyAddress({ coinName: this.form.coinName });
      this.appSrc = res.data;
      this.form.moneyAddress = res.data;
    },
  },
  created() {
    this.coinList();
  },
};
</script>

<style lang="scss" scoped>
.wrap {
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
    width: 100%;
    height: 1.17333rem;
    margin: auto;
  }
  ::v-deep .van-tabs__line {
    transform: translateX(273px) translateX(-50%);
    transition-duration: 0.3s;
    background-color: #191919 !important;
  }
  ::v-deep.van-divider {
    margin: 5px 0;
  }
  .listWrap {
    margin-bottom: 10px;
  }

  .content {
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .address {
      padding: 20px 0;
      color: rgb(24, 127, 196);
    }

    .copy {
      width: 80%;
      border-radius: 16px;
    }
  }
  ::v-deep .van-cell-group {
    margin: 15% auto 15% auto;
    width: 100%;
    background-color: #1919190e;
    p {
      color: #c8a76a;
      font-family: Inter;
      font-weight: medium;
      font-size: 16px;
      line-height: normal;
      letter-spacing: 0px;
      text-align: left;
      margin: 20px 0;
    }
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
    color: #919191;
    font-family: Inter;
    font-weight: regular;
    font-size: 12px;
    line-height: 1.2rem;
    letter-spacing: 0px;
    text-align: left;
  }
  ::v-deep.van-cell {
    align-items: center;
    // border-bottom: 1px solid #393939;
    padding: 10px 15px;
    background-color: #1919190e;
  }
  ::v-deep .van-cell::after {
    border: none !important;
  }
}
.headerWrap {
  position: relative;
  width: 100%;
  height: 45px;
  ::v-deep.van-icon {
    padding: 10px 0 0 10px;
  }
  .topjl {
    position: absolute;
    right: 10px;
    font-size: 13px;
  }
}
.contentWrap {
  height: 100%;
  background-color: #eee;
  padding-top: 8px;
}
</style>
