<template>
  <div class="login">
    <div class="topWrap">
      <!-- <van-icon class="topIcon" name="arrow-left" size="20" color="#ffffff" @click="$router.push({ path: '/' })" /> -->
      <!-- <div class="selectLang" @click="showLang = true">{{$t('app.selectLanguage')}}</div> -->
      <div class="logoBox centerXY">
        <!-- <img src="@/assets/img/logo_.png" alt="" srcset=""> -->
        <img src="@/assets/imgs/ICONSPT.png" alt="" srcset="" />
      </div>
      <!-- <img class="bgimg" src="@/assets/imgs/登录BJ@1x.png" /> -->
    </div>
    <!-- 输入框 -->
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
        :border="false"
        v-model.trim="params.email"
        :placeholder="$t('app.email')"
        @keyup.enter.native="vali"
      >
        <template v-slot:left-icon>
          <van-icon name="contact" color="#C8A76A" />
        </template>
      </van-field>
      <!-- 输入密码 -->
      <van-field
        v-model.trim="params.password"
        :border="false"
        :type="passwordType ? 'password' : 'text'"
        clearable
        :placeholder="$t('app.p_password')"
        @keyup.enter.native="vali"
      >
        <template v-slot:left-icon>
          <van-icon name="lock" color="#C8A76A" />
        </template>
        <template v-slot:right-icon>
          <van-icon
            v-if="passwordType"
            @click="passwordType = !passwordType"
            name="closed-eye"
            color="#C8A76A"
          />
          <van-icon
            v-else
            @click="passwordType = !passwordType"
            name="eye-o"
            color="#C8A76A"
          />
        </template>
      </van-field>
      <van-checkbox
        class="checkBox fs12"
        checked-color="#C8A76A"
        v-model="checked"
        label-disabled
        icon-size="18px"
      >
        {{ $t("app.remember") }}
        <template>
          <div class="forgetPassword fs12" @click="zxkf">
            {{ $t("app.forget") }}
          </div>
        </template>
      </van-checkbox>
      <!-- 登录按钮 -->
      <div class="btnclass" @click="onSubmit">
        {{ $t("app.login") }}
      </div>
      <div class="bottomFont fs14">
        <div>
          <span>{{ $t("app.no") }}{{ $t("app.account") }}？</span>
          <span style="color: #c8a76a" @click="openRegister">{{
            $t("app.registerNow")
          }}</span>
        </div>
        <change-lang></change-lang>
        <!-- <span style="float: right;" @click="lineFn">{{$t('app.switchingCircuit')}}</span> -->
      </div>
    </div>
    <!-- <van-action-sheet v-model="showLang" :actions="actions" @select="onSelect" /> -->
  </div>
</template>

<script>
import { login, memberLevel, paramGetChildBypcode, systemConfig } from "@/api";
import { i18n, vantLocales } from "@/lang/index";
import { valiForm } from "@/utils/tools";
import { setToken, removeToken } from "@/api/cookie";
import Cookies from "js-cookie";
import { mapMutations } from "vuex";
import ChangeLang from "../../components/ChangeLang.vue";
import { browserVersion1 } from "@/utils";

export default {
  name: "Login",
  components: {
    ChangeLang,
  },
  data() {
    return {
      quhao: 86,
      systemConfig: "",
      checked: true,
      showLang: false,
      // 通过 actions 属性来定义菜单选项
      actions: [
        // { name: '中文', lang: 'zh' },
        { name: "English", lang: "en" },
        { name: "Spanish", lang: "es" },
        { name: "Arabic", lang: "ar" },
        { name: "French", lang: "fr" },
      ],
      passwordType: true,
      params: {
        // tel: this.$storage.lsGet('account') || '',
        email: this.$storage.lsGet("account") || "",
        password: this.$storage.lsGet("psw") || "",
      },
      rules: {
        tel: {
          required: true,
          reg: /^1[3456789]\d{6}|^[1-9]\d{6,9}$/,
          msg: "app.p_phoneNumber",
        },
        email: {
          required: true,
          reg: /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,30}$/i,
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
    lineFn() {
      console.log(123);
      this.$router.push({ path: "/lineselect" });
    },
    vali() {
      if (!valiForm(this.rules, this.params)) return;
      const params = {
        email: this.params.email.trim(),
        password: this.$md5(this.params.password),
      };
      this._login(params);
    },
    onSubmit() {
      if (!valiForm(this.rules, this.params)) return;
      const params = {
        email: this.params.email.trim(),
        password: this.$md5(this.params.password),
      };
      this.$toast.loading({
        duration: 15000,
        mask: true,
        message: `${this.$t("app.login_z")}...`,
      });
      this._login(params);
    },
    async _login(params) {
      login(params)
        .then((res) => {
          if (res.status === "1") {
            // 记住用户名
            if (this.checked) {
              this.$storage.lsSet("account", this.params.email);
              this.$storage.lsSet("psw", this.params.password);
              this.$storage.lsSet("isFirstLogin", 1);
            }
            this.$toast.success({
              duration: 0,
              mask: true,
              message: `${this.$t("app.login_success")}`,
            });
            this.$toast.clear();
            setToken(res.data.acctoken);
            memberLevel();
            this.$storage.lsSet("userInfo", res.data);
            this.$router.push({ path: "/home" });
          }
        })
        .catch(() => {});
    },
    async _paramGetChildBypcode() {
      const { data } = await paramGetChildBypcode({ pcode: "h5_language" });
      if (data) {
        this.$nextTick(() => {
          this.set_language(data.busparamname);
          i18n.locale = data.busparamname;
          vantLocales(data.busparamname);
        });
      }
    },
    openRegister() {
      this.$router.push({ path: "/register" });
    },
    // onSelect (item) {
    //     this.showLang = false
    //     this.$storage.lsSet('lang', item.lang)
    //     i18n.locale = item.lang
    //     vantLocales(item.lang)
    //     this.$toast({
    //         message: item.name === '中文' ? `${item.name}${this.$t('app.switchSuccess')}` : `${item.name} ${this.$t('app.switchSuccess')}`
    //     })
    // },
    // 清空数据
    clearDate() {
      sessionStorage.clear();
      this.$storage.lsRm("userInfo");
      removeToken();
    },
    // 忘记密码
    zxkf() {
      this.$router.push({ path: "/customerService" });
    },
    ...mapMutations(["set_language", "set_webViewQuery"]),
  },
  created() {
    this.clearDate();
    systemConfig({ pcode: "service_url" }).then((res) => {
      this.systemConfig = res.data.busparamname;
    });
    const url = this.$route;
    const query = url.query;
    if (JSON.stringify(query) !== "{}") {
      this.set_webViewQuery(query);
    } else {
      Cookies.remove("webViewQuery");
    }
    // this._paramGetChildBypcode()
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/vant.scss";

.login {
  // background-color: #ffffff;
  height: 100%;
}
.headWrap {
  height: 40px;
  display: flex;
  position: relative;
  align-items: center;
  .icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  .font {
    flex: 1;
    text-align: center;
    font-size: 15px;
    color: skyblue;
  }
}
.inputWrap {
  position: relative;
  padding: 30px 10px;
  // background-color: white;
  ::v-deep.van-cell--center {
    padding: 5px 15px;
  }
  .btnclass {
    width: 320px;
    height: 44px;
    background: $bg4;
    color: $bg1;
    margin: 18px auto;
    border-radius: 25px;
    text-align: center;
    line-height: 44px;
  }
  .checkBox {
    margin: 10px 0 0 18px;
    position: relative;

    .forgetPassword {
      position: absolute;
      color: $color1;
      right: 20px;
      top: 0;
    }
  }
  .bottomFont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 320px;
    margin: 0 auto;
  }
}
::v-deep.van-field__button {
  height: 35px;
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
.quhaolist {
  position: absolute;
  left: 12%;
  top: 8px;
  z-index: 99;
}
::v-deep.van-dropdown-menu__bar {
  height: 28px;
  box-shadow: none;
}
.jia {
  position: absolute;
  z-index: 400;
  top: 8px;
}
// .oneinput {
//     // background: red !important;
//     ::v-deep.van-field__control {
//         padding-left: 55px !important;
//     }
// }
</style>
