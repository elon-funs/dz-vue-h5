<template>
  <div>
    <van-cell-group :border="false">
      <van-field
        :border="false"
        type="password"
        maxlength="12"
        clearable
        v-model.trim="params.oldvalue"
        :label="$t('app.old_loginpassword')"
        :placeholder="$t('app.please_input_oldpassword')"
      />
      <van-field
        :border="false"
        type="password"
        maxlength="12"
        clearable
        v-model.trim="params.password"
        :label="$t('app.new_loginpassword')"
        :placeholder="$t('app.please_input_newpassword')"
        @keyup.enter.native="vali"
      />
      <van-field
        :border="false"
        type="password"
        maxlength="12"
        clearable
        v-model.trim="params.okvalue"
        :label="$t('app.ok_password')"
        :placeholder="$t('app.please_ok_passwrod')"
      />
    </van-cell-group>
    <div class="btn_com fs16" @click="postFn">{{ $t("app.submit") }}</div>
  </div>
</template>

<script>
import { updatePassword } from "@/api";
import { valiForm } from "@/utils/tools";
export default {
  name: "LoginPassword",
  data() {
    return {
      params: {
        oldvalue: "",
        password: "",
        okvalue: "",
      },
      rules: {
        oldvalue: {
          required: true,
          reg: /^[a-zA-Z0-9]{1,12}$/,
          msg: "app.P_OriginalFormat",
        },
        password: {
          required: true,
          reg: /^[a-zA-Z0-9]{1,12}$/,
          msg: "app.P_newFormat",
        },
        okvalue: {
          required: true,
          reg: /^[a-zA-Z0-9]{1,12}$/,
          msg: "app.P_confirmFormat",
        },
      },
    };
  },
  methods: {
    postFn() {
      if (!valiForm(this.rules, this.params)) return;
      if (this.params.oldvalue === this.params.password) {
        this.$toast({
          message: `${this.$t("app.update_pw_tips")}！`,
        });
        return;
      }
      if (this.params.okvalue !== this.params.password) {
        this.$toast({
          message: `${this.$t("app.update_pw_tips2")}！`,
        });
        return;
      }
      const obj = {
        oldPassword: this.$md5(this.params.oldvalue),
        password: this.$md5(this.params.password),
        acclogin: this.$storage.lsGet("userInfo").acclogin,
      };
      updatePassword(obj).then((res) => {
        if (res.status == "1") {
          this.$toast({
            message: `${this.$t("app.update_success")}！`,
          });
        } else {
          this.$toast({
            message: this.$t(res.status),
          });
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/vant.scss";

.van-cell-group {
  margin-top: 10px;
}
</style>
