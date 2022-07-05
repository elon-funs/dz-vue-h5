<template>
  <div class="page">
    <div class="head">
      <div class="top">
        <img src="@/assets/imgs/service/Maskgroup@1x.png" alt="" />
        <div class="top-right">
          <div class="fs16">{{ $t("app.Customer_Service") }}</div>
          <div class="fs12">{{ $t("app.Serve") }}</div>
        </div>
      </div>
      <div class="bottom fs12">{{ $t("app.help") }}</div>
    </div>
    <div class="content">
      <div class="list-item" v-for="item in customer" :key="item.id">
        <div class="item-left">
          <img class="img" src="@/assets/imgs/service/Telegram@1x.png" alt="" />
          <div>{{ $t(item.title) }}</div>
        </div>
        <div class="item-right">
          <van-button
            class="btn"
            color="linear-gradient(90deg, #E0C08D 0%, #C4A269 100%)"
            type="primary"
            @click="goKefu(item.systemConfig)"
            >{{ $t(item.buttone) }}</van-button
          >
        </div>
      </div>
    </div>
    <!-- <div class="icon">
      <img class="img" src="@/assets/imgs/service/在线客服@1x.png" alt="">
    </div> -->
  </div>
</template>

<script>
import { systemConfig } from "@/api";
import { browserVersion1, pay } from "@/utils";
export default {
  data() {
    return {
      systemConfig: "",
      customer: [],
    };
  },
  created() {
    systemConfig({ pcode: "service_url" }).then((res) => {
      res.data.busparamname.split(/[,，]/).forEach((item, i) => {
        if (i === 0) {
          var arr = {
            id: i + 1,
            title: "atención al cliente español",
            buttone: "consultar",
            systemConfig: item,
          };
        } else if (i === 1) {
          var arr = {
            id: i + 1,
            title: "English customer service",
            buttone: "consult",
            systemConfig: item,
          };
        } else {
          var arr = {
            id: i + 1,
            title: "app.customer",
            buttone: "app.consult",
            systemConfig: item,
          };
        }

        this.customer.push(arr);
      });
      this.customer = this.customer.sort(function () {
        return Math.random() > 0.5 ? -1 : 1;
      });
    });
  },
  methods: {
    goKefu(systemConfig) {
      if (browserVersion1().android) {
        window.android.pay(systemConfig);
      } else if (browserVersion1().ios) {
        pay(systemConfig);
      } else {
        window.location.href = systemConfig;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/vant.scss";

.page {
  display: flex;
  flex-direction: column;
  align-items: center;

  .head {
    margin: 15px 0;
    width: 354px;
    height: 154px;
    background: url("../../assets/imgs/service/Rectangle4515@1x.png") no-repeat;
    background-size: cover;
    color: $bg1;

    .top {
      margin: 28px 32px 16px 32px;
      padding-bottom: 16px;
      display: flex;
      border-bottom: 1px solid #000000;

      .top-right {
        margin-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }

    .bottom {
      display: flex;
      margin: auto;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 80%;
    }
  }

  .content {
    background: $bg1;
    border-radius: 8px;
    width: 345px;
    padding-top: 20px;

    .list-item {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      padding-bottom: 20px;

      .item-left {
        display: flex;
        align-items: center;

        .img {
          width: 40px;
          height: 40px;
          margin-right: 12px;
        }
      }

      .item-right {
        display: flex;
        align-items: center;
      }

      .btn {
        height: 25px;
        border-radius: 12.5px;
        color: $bg1 !important;
      }
    }
  }

  .icon {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .img {
      padding: 48px 15px;
    }
  }
}
</style>
