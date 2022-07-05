<template>
  <div class="homeNav">
    <div
      class="item"
      v-for="item of navData"
      :key="item.title"
      @click="goUrl(item.route)"
    >
      <!-- <svg-icon icon-class="vipzq" className='svg_class'/> -->
      <img :src="item.iconUrl" />
      <span>{{ $t(item.title) }}</span>
    </div>
  </div>
</template>

<script>
import { browserVersion1, pay } from "@/utils";
export default {
  name: "homeNav",
  props: {
    videourl: String,
    groupUrl: String,
  },
  data() {
    return {
      navData: [
        {
          title: "app.vipzone",
          iconUrl: require("@/assets/imgs/Recharge@1x.png"),
          route: "/vip",
        },
        {
          title: "app.app_download",
          iconUrl: require("@/assets/imgs/APP下载@1x.png"),
          route: "/vedioCourse",
        },
        {
          title: "app.promotionRewards",
          iconUrl: require("@/assets/imgs/推广奖励@1x.png"),
          route: "/returnBate",
        },
        {
          title: "app.team",
          iconUrl: require("@/assets/imgs/推广奖励@1x.png"),
          route: "/team",
        },
      ],
    };
  },
  methods: {
    goUrl(i) {
      if (i == "/vedioCourse") {
        window.location.href = this.videourl;
      } else if (i == "/team") {
        if (browserVersion1().android) {
          window.android.pay(this.groupUrl);
        } else if (browserVersion1().ios) {
          pay(this.groupUrl);
        } else {
          window.location.href = this.groupUrl;
        }
      } else {
        this.$router.push({ path: i });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/theme.scss";

.homeNav {
  background-color: $bg1;
  color: $color2;
  border-radius: 5px;
  margin: 5px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 110px;
  .item {
    width: 30%;
    display: flex;
    flex-direction: column;
    text-align: center;
    img {
      margin: 0 auto 5px;
      width: 40px;
      height: 40px;
    }
    span {
      font-size: 14px;
    }
  }
}
.svg_class {
  width: 30px;
  height: 30px;
}
</style>
