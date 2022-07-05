<template>
  <div class="userinfo">
    <div class="topWrap">
      <div class="title fs18">
        <van-icon
          size="0.6rem"
          color="#C8A76A"
          name="arrow-left"
          @click="$router.push({ path: '/my' })"
        />
        {{ $t("app.grxx") }}
      </div>
      <div class="info">
        <div class="img">
          <img :src="touxiang || require('@/assets/img/touxiang.png')" />
        </div>
        <div class="detail">
          <div class="fs12">
            <span style="color: #c8a76a"> {{ $t("app.phoneNumber") }}</span
            >：{{ phoneNumber }}
          </div>
          <!-- <van-icon name="arrow" size="0.4rem" color="#fff" /> -->
        </div>
      </div>
    </div>
    <div class="list">
      <van-cell
        :title="$t('app.yhk')"
        is-link
        :value="bangdingbank ? $t('app.binding_ok') : $t('app.handel_set')"
        @click="goPage"
        :border="false"
      >
        <template v-slot:icon>
          <div class="box" style="background-color: #7589fd">
            <i class="iconfont iconyinhangqia"></i>
          </div>
        </template>
      </van-cell>
      <!-- <van-cell title="详细信息" is-link value="点击设置" @click="$router.push({ path: '/userinfo/detailMsg' })">
                <template v-slot:icon>
                    <div class="box" style="background-color: #E302F1;">
                        <van-icon name="manager" />
                    </div>
                </template>
            </van-cell> -->
      <van-cell
        :title="$t('app.login_password')"
        is-link
        :value="$t('app.handel_update')"
        @click="$router.push({ path: '/userinfo/loginPassword' })"
        :border="false"
      >
        <template v-slot:icon>
          <img
            style="margin-right: 10px"
            class="icon-img"
            src="@/assets/imgs/userinfo/登录密码@1x.png"
            alt=""
          />
          <!-- <div class="box" style="background-color: #F1DD02;">
            <i class="iconfont icondenglu-mima"></i>
          </div> -->
        </template>
      </van-cell>
      <!-- <van-cell
        :title="$t('app.zj_password')"
        is-link
        :value="zijinpass ? $t('app.handel_update') : $t('app.handel_set')"
        :border="false"
        @click="$router.push({ path: '/userinfo/fundPassword' })"
      >
        <template v-slot:icon>
          <img
            class="icon-img"
            src="@/assets/imgs/userinfo/登录密码@1x.png"
            alt=""
          />
        </template>
      </van-cell> -->
      <van-cell
        :title="$t('app.clear_cache')"
        is-link
        :value="$t('app.handel_clear')"
        :border="false"
        @click="clearCache"
      >
        <template v-slot:icon>
          <img
            style="margin-right: 10px"
            class="icon-img"
            src="@/assets/imgs/userinfo/清楚缓存@1x.png"
            alt=""
          />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: "Userinfo",
  data() {
    return {
      nikeName: this.$storage.lsGet("userInfo").nickname,
      phoneNumber: this.$storage.lsGet("userInfo").acclogin,
      touxiang: this.$storage.lsGet("userInfo").headimgurl,
      bangdingbank: this.$storage.ssGet("userStatus").isBind,
      zijinpass: this.$storage.ssGet("userStatus").isPayPass,
    };
  },
  methods: {
    goPage() {
      // if (this.bangdingbank) return
      this.$router.push({ path: "/userinfo/yhkBangding" });
    },
    clearCache() {
      this.$dialog
        .confirm({
          message: this.$t("app.clear_cache"),
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/vant.scss";

.userinfo {
  height: 100%;
}

.icon-img {
  width: 26px;
  height: 26px;
}

.topWrap {
  height: 116px;
  margin-bottom: 8px;
  background: $bg1;
  .title {
    position: relative;
    padding: 15px 10px;
    text-align: center;
    color: #fff;
    border-bottom: 1px solid $bg2;

    ::v-deep .van-icon {
      position: absolute;
      left: 10px;
      top: 12px;
    }
  }
  .info {
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    .img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      img {
        width: 100%;
      }
    }
    .detail {
      flex: 1;
      position: relative;
      color: #fff;
      .name {
        padding: 8px 0 5px;
      }
      .fs12 {
        margin: 16px 0;
        font-size: 16px;
      }
      ::v-deep .van-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
.list {
  .box {
    width: 26px;
    height: 26px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-right: 10px;
  }
}
</style>
