<template>
  <div class="bgWrap">
    <img style="width: 100%" src="@/assets/imgs/my/Maskgroup@1x.png" alt="" />
    <!-- <van-icon name="arrow-left" @click="$router.go(-1)" /> -->
    <div class="bg-div">
      <div class="title fs18">
        <p>{{ $t("app.yourfriend") }} {{ phone }}</p>
        <p>{{ $t("app.invitation_you") }} smart part-time</p>
      </div>
      <div id="qrcode"></div>
      <div class="detail">
        <div class="one">
          <span>{{ $t("app.recommend_code") }}：</span>
          <span class="fs24 code" style="color: #ff4054">{{ yqm }}</span>
          <div @click="copyValue(yqm)">{{ $t("app.copy") }}</div>
        </div>
      </div>
      <div class="detailTwo">
        <div class="two">
          <span><van-icon name="share" color="#C8A76A"  size="20"/></span>
          <p class="tow_p">{{ ewm_url }}</p>
          <div @click="copyValue(ewm_url)">{{ $t("app.copy") }}</div>
        </div>
      </div>
      <div class="btn fs18" @click="toSave">
        {{ $t("app.save_qr_code") }}
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import QRCode from "qrcodejs2";
import { mapState } from "vuex";

export default {
  name: "Invitefriends",
  data() {
    return {
      yqm: this.$storage.lsGet("userInfo").recomcode,
      phone: this.$storage.lsGet("userInfo").acclogin,
      ewm_url: "",
    };
  },
  methods: {
    qrcode() {
      // const a = this.$refs.qrcode
      const qrcode = new QRCode("qrcode", {
        width: 160,
        height: 160,
        text: this.ewm_url + `?id=${this.yqm}`,
      });
      return qrcode;
    },
    copyValue(yqm) {
      var input = document.createElement("input");
      input.value = yqm;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      this.$toast({
        message: `${this.$t("app.copy_success")}！`,
      });
      document.body.removeChild(input);
    },
    // 点击保存
    toSave() {
      html2canvas(document.getElementById("qrcode")).then((canvas) => {
        const saveUrl = canvas.toDataURL("image/png");
        if (this.webViewQuery && this.webViewQuery.idfa) {
          window.location.href = "https://www.baidu.com" + "?" + saveUrl;
        }
        console.log(saveUrl);
        const aLink = document.createElement("a");
        const blob = this.base64ToBlob(saveUrl);
        const evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true);
        aLink.download = "qrcode.jpg";
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
      });
    },
    // 这里把图片转base64
    base64ToBlob(code) {
      const parts = code.split(";base64,");
      const contentType = parts[0].split(":")[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
  },
  computed: {
    ...mapState(["webViewQuery"]),
  },
  created() {
    this.ewm_url = window.location.host + "/register" + "?code=" + this.yqm;
    this.$nextTick(function () {
      this.qrcode();
    });
  },
  // mounted () {
  //     console.log(1)
  //     this.$nextTick(function () {
  //         this.qrcode()
  //     })
  // }
};
</script>

<style lang="scss" scoped>
@import "@/styles/vant.scss";

#qrcode {
  padding: 16px 0;
  display: flex;
  justify-content: center;
}
.bgWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  // position: relative;
  width: 100%;
  // height: 100%;
  // background: url('../../assets/img/yq_bg.png') no-repeat;
  // background-size: 100% 100%;
  // ::v-deep.van-icon {
  //     position: absolute;
  //     color: #fff;
  //     font-size: 0.6rem;
  //     top: 10px;
  //     left: 10px;
  // }

  .bg-div {
    width: 345px;
    height: 402px;
    background: url("../../assets/imgs/my/Subtract@1x.png") no-repeat;
    background-size: cover;
    margin: 0 15px;
  }

  .title {
    width: 100%;
    height: 78px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: $color2;
    line-height: 1.3;
    font-size: 16px;
  }
  .detail {
    width: 100%;
    bottom: 15%;
    display: flex;
    justify-content: center;

    .one {
      padding: 10px 0;

      .code {
        padding: 0 20px;
      }
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        box-sizing: border-box;
        text-align: center;
        height: 20px;
        line-height: 20px;
        border-radius: 10px;
        padding: 0 8px;
        color: $bg1;
        background: $bg4;
      }
    }
  }
  .detailTwo {
    width: 100%;
    bottom: 18%;
    display: flex;
    justify-content: center;

    .two {
      padding: 20px 0;

      .code {
        padding: 0 20px;
      }
      .tow_p {
        width: 220px;
        padding-left: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        box-sizing: border-box;
        text-align: center;
        height: 20px;
        line-height: 20px;
        border-radius: 10px;
        padding: 0 8px;
        color: $bg1;
        background: $bg4;
      }
    }
  }
  .btn {
    color: $bg1;
    border-radius: 20px;
    bottom: 5%;
    width: 320px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    background: $bg4;
    margin: 0 12.5px;
  }
}
</style>
