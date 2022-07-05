<template>
  <div>
    <van-notice-bar
      background="#191919"
      color="red"
      scrollable
      left-icon="volume-o"
      :text="$t('app.yhkbd_font')"
    />
    <div class="inpWrap" v-if="!bangdingbank">
      <van-field
        v-model="params.bankaddress"
        :placeholder="$t('app.tips_inpubankaccount')"
        :label="$t('app.bank_account') + '：'"
        :border="false"
      ></van-field>

      <div class="btn_com" @click="addBank">{{ $t("app.immediately_tj") }}</div>
    </div>
    <div class="noshiming" v-if="false">
      {{ $t("app.yhkbd_fonttips") }}
      <span
        style="color: #1989fa; cursor: pointer"
        @click="$router.push({ path: '/userinfo/detailMsg' })"
        >{{ $t("app.immediately_rz") }}</span
      >
    </div>

    <div v-if="bangdingbank">
      <van-field
        v-model="num"
        disabled
        :label="$t('app.banding_yhk') + '：'"
        :border="false"
      ></van-field>
      <van-field
        v-model="params.bankaddress"
        :placeholder="$t('app.tips_inpubankaccount')"
        :label="$t('app.up_account') + '：'"
        :border="false"
      ></van-field>
      <div class="btn_com" @click="ReviseBank">
        {{ $t("app.handel_update") }}
      </div>
    </div>
  </div>
</template>

<script>
import { doSetAnchorBank, findPayPassAndAccount, resetAnchorBank } from "@/api";
export default {
  name: "YhkBangding",
  data() {
    return {
      params: {
        bankaddress: "",
      },
      bangdingbank: this.$storage.ssGet("userStatus").isBind,
      num: "",
    };
  },
  methods: {
    async _findPayPassAndAccount() {
      const { data } = await findPayPassAndAccount();
      this.$storage.ssSet("userStatus", data);
      this.$router.push({ path: "/userinfo" });
    },
    async _doSetAnchorBank() {
      const obj = {
        bankaddress: this.params.bankaddress,
      };
      if (this.params.bankaddress.length < 24) {
        this.$toast({
          message: `${this.$t("app.tips_bank_err")}！`,
        });
        return;
      }
      doSetAnchorBank(obj).then((res) => {
        if (res.status == "1") {
          this.$toast({
            message: `${this.$t("app.binding_success")}！`,
          });
          this.$storage.ssRm("userStatus");
          this._findPayPassAndAccount();
        }
      });
    },
    addBank() {
      this._doSetAnchorBank();
    },
    ReviseBank() {
      const obj = {
        bankaddress: this.params.bankaddress,
      };
      if (this.params.bankaddress.length < 24) {
        this.$toast({
          message: `${this.$t("app.tips_bank_err")}！`,
        });
        return;
      }
      resetAnchorBank(obj).then((res) => {
        if (res.status == "1") {
          this.$toast({
            message: `${this.$t("app.binding_success")}！`,
          });
          this.$storage.ssRm("userStatus");
          this._findPayPassAndAccount();
        }
      });
    },
  },
  created() {
    if (this.$storage.ssGet("userStatus").isBind) {
      this.num = this.$storage.ssGet("userStatus").memBankaccount.bankaddress;
    }
  },
};
</script>

<style lang='scss' scoped>
.noshiming {
  padding: 20px;
  text-align: center;
}
.inpWrap {
  margin-top: 8px;
}
.tishi {
  padding: 10px;
  font-size: 16px;
  text-align: center;
  color: #ed0c0c;
}
::v-deep .van-cell {
  display: block;
}
::v-deep .van-field__label {
  font-size: 16px;
  width: 100%;
  padding: 5px 15px;
  color: #e0c08d;
}
::v-deep .van-cell__value {
  width: 100%;
  padding: 10px 15px;
}
.tips {
  padding: 10px 15px;
}
</style>
