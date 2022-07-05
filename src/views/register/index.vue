<template>
  <div class="register">
    <div class="topWrap">
      <!-- <van-icon class="topIcon" name="arrow-left" size="20" color="#ffffff" @click="$router.push({ path: '/' })" /> -->
      <!-- <div class="selectLang" @click="showLang = true">{{$t('app.selectLanguage')}}</div> -->
      <div class="logoBox centerXY">
        <!-- <img src="@/assets/img/logo_.png" alt="" srcset=""> -->
        <img src="@/assets/imgs/ICONSPT.png" alt="" srcset="" />
      </div>
      <!-- <img class="bgimg" src="@/assets/imgs/登录BJ@1x.png" /> -->
    </div>
    <div class="inputWrap">
      <!-- <div class="quhaolist">
        <div class="jia">+</div>
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="quhao" :options="optionList" />
        </van-dropdown-menu>
      </div> -->
      <!-- 输入手机号 -->
      <van-field
        class="oneinput"
        v-model.trim="params.email"
        :border="false"
        :placeholder="$t('app.p_phoneNumber')"
      >
        <template v-slot:left-icon>
          <img
            src="@/assets/My-h.png"
            alt=""
            style="width: 18px; height: 18px; position: relative; top: 3px"
          />
        </template>
      </van-field>
      <!-- 验证码 -->
      <!-- <van-field v-model="yzm" type="text" placeholder="请输入验证码">
                <template v-slot:left-icon>
                    <i class="iconfont iconxinfeng icon_style" />
                </template>
                <template v-slot:right-icon>
                    <div class="yzmimg" @click="handelyzm"><img :src="yzmimg" alt="" srcset=""></div>
                </template>
            </van-field> -->
      <!-- 短信验证码-->
      <van-field
        v-model.trim="msyzm"
        type="text"
        :border="false"
        :placeholder="$t('app.emailcode')"
        :maxlength="4"
      >
        <template v-slot:left-icon>
          <i class="iconfont iconxinfeng icon_style" />
        </template>
        <template #button>
          <img
            style="
              width: 80px;
              height: 30px;
              position: absolute;
              right: 0px;
              top: -2px;
            "
            :src="graphicCode"
            @click="CaptchaImageList"
            alt=""
          />
        </template>
      </van-field>
      <!-- 输入密码 -->
      <van-field
        v-model.trim="params.password"
        type="password"
        :border="false"
        :placeholder="$t('app.p_loginpassWord')"
      >
        <template v-slot:left-icon>
          <van-icon name="lock" color="#999999" />
        </template>
      </van-field>
      <!-- 确认密码 -->
      <van-field
        v-model.trim="okpassword"
        type="password"
        :border="false"
        :placeholder="$t('app.p_confirmPassWord')"
      >
        <template v-slot:left-icon>
          <van-icon name="lock" color="#999999" />
        </template>
      </van-field>
      <!-- 邀请码 -->
      <van-field
        v-model.trim="yqm"
        type="text"
        :border="false"
        :placeholder="$t('app.p_invitationCode')"
      >
        <template v-slot:left-icon>
          <i class="iconfont iconyaoqingmaguanli icon_style" />
        </template>
      </van-field>
    </div>
    <div class="btnclass" @click="onRegister">
      {{ $t("app.registerNow") }}
    </div>
    <div class="bottomFont fs14">
      <div>
        <span>{{ $t("app.account_number") }}</span>
        <span
          style="color: #c8a76a"
          @click="$router.push({ path: '/login' })"
          >{{ $t("app.clickLogin") }}</span
        >
      </div>
      <change-lang></change-lang>
    </div>
  </div>
</template>

<script>
import {
  register,
  sendSmsCode,
  systemConfig,
  buryingPointTransform,
  sendMailCode,
  CaptchaImage,
} from "@/api";
import { valiForm } from "@/utils/tools";
import { mapState } from "vuex";
import ChangeLang from "../../components/ChangeLang.vue";
import { browserVersion1, getUrlQueryString } from "@/utils";

export default {
  name: "Register",
  components: {
    ChangeLang,
  },
  data() {
    return {
      yzmimg: "",
      btnBool: false,
      btnText: this.$t("app.get_invitationsCode"),
      btnNum: 60,
      params: {
        // phone: '',
        email: "",
        password: "",
      },
      quhao: 86,
      // yzm: '',
      msyzm: "",
      okpassword: "",
      graphicCode: "",
      onlyCode: "",
      yqm: "",
      rules: {
        phone: {
          required: true,
          reg: /^1[3456789]\d{6}|^[1-9]\d{6,9}$/,
          msg: "请输入正确手机号",
        },
        email: {
          required: true,
          reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
          msg: "app.p_phoneNumber",
        },
        password: {
          required: true,
          reg: /^[a-zA-Z0-9]{1,12}$/,
          msg: "app.p_format",
        },
      },
      optionList: [
        { text: "1264", value: 1246 },
        { text: "212", value: 212 },
        { text: "258", value: 258 },
        { text: "264", value: 264 },
        { text: "275", value: 275 },
        { text: "375", value: 375 },
        { text: "377", value: 377 },
        { text: "52", value: 52 },
        { text: "55", value: 55 },
        { text: "60", value: 60 },
        { text: "62", value: 62 },
        { text: "63", value: 63 },
        { text: "65", value: 65 },
        { text: "66", value: 66 },
        { text: "673", value: 673 },
        { text: "81", value: 81 },
        { text: "82", value: 82 },
        { text: "84", value: 84 },
        { text: "85", value: 85 },
        { text: "855", value: 855 },
        { text: "86", value: 86 },
        { text: "850", value: 850 },
        { text: "852", value: 852 },
        { text: "856", value: 856 },
        { text: "88", value: 88 },
        { text: "886", value: 886 },
        { text: "880", value: 880 },
        { text: "91", value: 91 },
        { text: "92", value: 92 },
        { text: "93", value: 93 },
        { text: "94", value: 94 },
        { text: "95", value: 95 },
      ],
    };
  },
  methods: {
    // 获取图形验证码
    async CaptchaImageList() {
      const res = await CaptchaImage({});
      this.graphicCode = window.URL.createObjectURL(res);
    },

    // 获取邮箱验证码
    async getEmailCode() {
      if (!this.rules.email.reg.test(this.params.email)) {
        this.$toast({
          message: this.$t("115"),
        });
        return;
      }
      const res = await sendMailCode({
        email: this.params.email,
        sendtype: 3,
      });
      this.timer = setInterval(() => {
        this.btnBool = true;
        this.btnNum--;
        this.btnText =
          this.btnNum < 10 ? `0${this.btnNum}S` : `${this.btnNum}S`;
        if (this.btnNum === 0) {
          clearInterval(this.timer);
          this.btnBool = false;
          this.btnNum = 60;
          this.btnText = this.$t("app.get_invitationsCode");
        }
      }, 1000);
      this.$once("hook: beforeDestroy", () => {
        clearInterval(this.timer);
      });
      console.log(res);
    },
    // 获取短信验证码
    getmsyzm() {
      if (!this.rules.phone.reg.test(this.params.phone)) {
        this.$toast({
          message: `${this.$t("app.sjhbzq")}`,
        });
        return;
      }
      const obj = {
        tel: this.params.phone.trim(),
        sendtype: 3,
        areacode: this.quhao,
        // imageCode: this.yzm
      };
      this.timer = setInterval(() => {
        this.btnBool = true;
        this.btnNum--;
        this.btnText =
          this.btnNum < 10 ? `0${this.btnNum}S` : `${this.btnNum}S`;
        if (this.btnNum === 0) {
          clearInterval(this.timer);
          this.btnBool = false;
          this.btnNum = 60;
          this.btnText = this.$t("app.get_invitationsCode");
        }
      }, 1000);
      this.$once("hook: beforeDestroy", () => {
        clearInterval(this.timer);
      });
      sendSmsCode(obj)
        .then((res) => {
          if (res.status == "1") {
            this.btnNum = 60;
            this.btnBool = true;
          } else {
            clearInterval(this.timer);
            this.btnText = this.$t("app.cxhqyzm");
            this.btnBool = false;
          }
        })
        .catch(() => {
          clearInterval(this.timer);
          this.btnNum = 60;
          this.btnBool = false;
          this.btnText = this.$t("app.cxhqyzm");
        });
    },
    _totalRegister(params) {
      buryingPointTransform(params).then((res) => {
        this.$toast({
          message: `${this.$t("app.zccg")}`,
          duration: 1000,
        });
        this.$storage.lsSet("account", this.params.phone);
        this.$storage.lsSet("psw", this.params.password);
        this.$router.push({ path: "/login" });
      });
    },
    // 注册
    onRegister() {
      // 手机号与密码验证
      if (!valiForm(this.rules, this.params)) return;
      // 短信验证码验证
      // if (!/^\d{4}$/.test(this.msyzm)) {
      //     this.$toast({
      //         message: `${this.$t('app.yzmbzq')}`
      //     })
      //     return
      // }
      // 确认密码验证
      if (this.params.password !== this.okpassword) {
        this.$toast({
          message: `${this.$t("app.tips_inputpassword")}`,
        });
        return;
      }
      // 邀请码验证
      if (!/^[a-zA-Z0-9]{6}$/.test(this.yqm)) {
        this.$toast({
          message: `${this.$t("app.yqmbzq")}`,
        });
        return;
      }
      const uuid = require("uuid");
      const obj = {
        // tel: this.params.phone.trim(),
        email: this.params.email.trim(),
        password: this.$md5(this.params.password),
        imageCode: this.msyzm,
        deviceCode: this.onlyCode === "" ? uuid.v1() : this.onlyCode,
        invitecode: this.yqm,
        // areacode: this.quhao
      };
      register(obj).then((res) => {
        if (res.status === "1") {
          if (JSON.stringify(this.webViewQuery) !== "{}" && this.$route.query) {
            const { idfa, os } = this.webViewQuery;
            const mcode = os === "iOS" ? idfa : this.$md5(idfa);
            const mtype = os === "iOS" ? 1 : 0;
            this._totalRegister({ mcode, mtype });
          } else {
            this.$toast({
              message: this.$t(res.status),
              duration: 1000,
            });
            this.$storage.lsSet("account", this.params.email);
            this.$storage.lsSet("psw", this.params.password);
            this.$router.push({ path: "/login" });
          }
        }
      });
    },
    response2JS(response) {
      this.onlyCode = response;
    },
    handelyzm() {
      this.yzmimg =
        window.origin + "/api/getCaptchaImage?" + new Date().getTime();
      console.log(this.yzmimg);
    },
  },
  computed: {
    ...mapState(["webViewQuery"]),
  },
  created() {
    // this.handelyzm()
    systemConfig({ pcode: "idcode" }).then((res) => {
      // this.yqm = res.data.busparamname
      if (this.$route.query.id) {
        this.yqm = this.$route.query.id;
      }
    });
    this.CaptchaImageList();
    this.yqm = getUrlQueryString("Code");
    window.getParamsFromOc = this.getParamsFromOc;
    if (browserVersion1().ios) {
      window.webkit.messageHandlers.jsInvokeOCMethod.postMessage(
        "Javascript invoke OC"
      );
    } else if (browserVersion1().android) {
      this.onlyCode = window.android.get_device_id();
    }
    window.response2JS = this.response2JS;
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/vant.scss";

.register {
  height: 100%;
}

.inputWrap {
  padding: 30px 10px;
  position: relative;
}

.topWrap {
  position: relative;
  overflow: hidden;
  height: 235px;
  width: 100%;
  background: url("../../assets/imgs/登录BJ@1x.png") no-repeat;
  background-size: cover;
  .bgimg {
    width: 102%;
    height: 100%;
    position: absolute;
    // bottom: -2px;
    left: -3px;
  }
  .logoBox {
    position: absolute;
    text-align: center;
    width: 66px;
    height: 66px;
    // border-radius: 50%;
    // border: 3px solid #fff;
    img {
      width: 100%;
    }
  }
  .selectLang {
    color: #ffffff;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .topIcon {
    position: absolute;
    left: 10px;
    top: 10px;
  }
}

::v-deep input:-internal-autofill-selected {
  background: $bg1 !important;
}

::v-deep.van-dropdown-menu__bar {
  height: 28px;
  box-shadow: none;
}
.email-code {
  color: $bg1 !important;
  height: 20px;
  border-radius: 8px;
}
.logoWrap {
  width: 66px;
  height: 66px;
  margin: 30px auto;
  img {
    width: 100%;
  }
}
.icon_style {
  color: #999999;
}
// ::v-deep .van-field__control {
//   border-bottom: 1px solid #dddddd;
// }
::v-deep .van-cell::after {
  border-bottom: none !important;
}
.btnclass {
  width: 320px;
  height: 44px;
  background: $bg4;
  margin: 18px auto;
  border-radius: 25px;
  text-align: center;
  line-height: 44px;
  color: $bg1;
}
.bottomFont {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  margin: 0 auto;
}
::v-deep .van-button--small {
  position: absolute;
  right: 0;
  top: -10px;
  height: 30px;
  border-radius: 20px;
  background-color: #ff4053;
  border: none;
}
.quhaolist {
  position: absolute;
  left: 9%;
  top: 6px;
  z-index: 99;
}
// .oneinput {
//   // background: red !important;
//   ::v-deep.van-field__control {
//     padding-left: 55px !important;
//   }
// }
.jia {
  position: absolute;
  z-index: 400;
  top: 8px;
}
.yzmimg {
  width: 100px;
  height: 32px;
  position: absolute;
  top: -10px;
  right: 0px;
  // position: absolute;
  // top: 1px;
  // height: 40px;
  img {
    width: 100%;
    height: 32px;
  }
}
</style>
