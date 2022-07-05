<template>
  <div class="vipWrap">
    <div class="topImg">
      <img :src="bg" />
    </div>
    <div class="listWrap">
      <!-- <div
        v-if="loginStatus"
        class="current"
        :style="`background: url(${maxbg[userLevel.levelSeq]}) no-repeat`"
      >
        <div class="sf fs20">
          {{ $t("app.ning_sf") }}：{{ userLevel.level }}
        </div>
        <div class="date">{{ $t("app.date") }}</div>
        <div class="datail">
          <span class="fs16"
            >{{ $t("app.today_task") }}：{{ userLevel.taskNum
            }}{{ $t("app.ci") }}</span
          >
          <span style="float: right;">{{ userLevel.enhancedDate }}</span>
        </div>
      </div> -->
      <!-- <div class="current" v-else>
        <div class="bgWrap fs18">
          <span @click="$router.push({ path: '/login' })"
            >{{ $t("app.nologin") }}~</span
          >
        </div>
      </div> -->
      <div class="vip-list">
        <div
          class="vip-item"
          :style="{
            background: `url(${vipbg[i]}) no-repeat`,
            'background-size': 'cover',
            color: vipcolor[i],
          }"
          v-for="(item, i) of levelData"
          :key="i"
        >
          <div class="head">
            <div class="fs24" style="margin-bottom: 2px">
              VIP{{ item.levelSeq }}
            </div>
            <div v-if="i === 0">{{ $t("app.ning_sf") }}</div>
          </div>
          <div class="content">
            <div class="left">
              <div v-if="item.levelSeq < 6">
                {{ $t("app.unitprice") }}: {{ item.promoteAmount }}
              </div>
              <div v-if="item.levelSeq < 6">
                {{ $t("app.today_task") }}：{{ item.doTaskTimes }}
              </div>
              <div v-if="item.levelSeq < 6">
                {{ $t("app.upgrade") }}: {{ item.rechargeAmount }}
              </div>
            </div>
            <div class="right">
              <div
                v-if="
                  item.isDelete === 0 && userLevel.levelSeq != item.levelSeq
                "
              >
                <p v-if="item.levelSeq == 5" style="margin: 10px 0">
                  {{ $t("app.Opening") }}:2022-07-09
                </p>
                <p>{{ $t("app.Stay") }}</p>
              </div>
              <div
                class="btn"
                v-else-if="userLevel.levelSeq < item.levelSeq || cfvip == '0'"
                @click="goJoin(item)"
              >
                {{ $t("app.ljjr") }}
              </div>

              <div v-if="i === 0 && loginStatus">
                <div class="Efetive">{{ $t("app.dataeffective") }}</div>
                <div>{{ userLevel.effectiveDate }}</div>
              </div>
              <div
                class="btn"
                v-if="userLevel.levelSeq === item.levelSeq && i > 0"
                @click="$router.push('/')"
              >
                {{ $t("app.201") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="zhubo" v-for="item of levelData" :key="item.id">
        <img class="img" :src="item.imageUrl" alt="" />
        <div class="title fs20">VIP{{ item.levelSeq }}</div>
        <div class="task fs16">
          {{ $t("app.today_task") }}：{{ item.doTaskTimes }}{{ $t("app.ci") }}
        </div>
        <div
          class="btn"
          style="background-color: #FF4153;"
          v-if="userLevel.levelSeq < item.levelSeq || cfvip == '0'"
          @click="goJoin(item)"
        >
          {{ $t("app.ljjr") }}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { levelConfig, systemConfig, getVipAmount, topupVip } from "@/api";
import { objectSort } from "@/utils/tools";
import topvip from "@/mixin/topvip";
import { getToken } from "@/api/cookie";

const MAXBG = {
  1: require("@/assets/img/pthy_bg.png"),
  2: require("@/assets/img/zb_bg.png"),
  3: require("@/assets/img/ask_bg.png"),
  4: require("@/assets/img/wh_bg.png"),
  5: require("@/assets/img/mx_bg.png"),
  6: require("@/assets/img/yd_bg.png"),
  7: require("@/assets/img/fen_bg.png"),
  8: require("@/assets/img/hong_bg.png"),
};

const vipbg = [
  require("@/assets/imgs/vip/VIP0.png"),
  require("@/assets/imgs/vip/vip0@1x.png"),
  require("@/assets/imgs/vip/VIP1.png"),
  require("@/assets/imgs/vip/VIP2.png"),
  require("@/assets/imgs/vip/VIP3.png"),
  require("@/assets/imgs/vip/VIP5.png"),
  require("@/assets/imgs/vip/VIP4.png"),
  require("@/assets/imgs/vip/VIP6.png"),
  require("@/assets/imgs/vip/VIP2.png"),
  require("@/assets/imgs/vip/VIP5.png"),
  require("@/assets/imgs/vip/VIP3.png"),
];

const vipcolor = [
  "#73357C",
  "#7C5A35",
  "#647995",
  "#A97402",
  "#5D58A6",
  "#3a359a",
  "#CEC6F8",
  "#Bcbcbc",
];

const banner = {
  en: require("@/assets/imgs/banner/two-en.png"),
  es: require("@/assets/imgs/banner/two-es.png"),
  ar: require("@/assets/imgs/banner/two-ar.png"),
  fr: require("@/assets/imgs/banner/two-fr.png"),
};

export default {
  name: "Vip",
  mixins: [topvip],
  data() {
    return {
      maxbg: Object.freeze(MAXBG),
      levelData: [],
      loginStatus: true,
      cfvip: "",
      vipbg,
      vipcolor,
      systemConfig: "",
    };
  },
  computed: {
    bg() {
      const img = banner[this.$i18n.locale];
      return img;
    },
  },
  methods: {
    async goJoin(item) {
      getVipAmount({ levelId: item.id }).then((res) => {
        if (res.status == "1") {
          this.$dialog
            .confirm({
              title: this.$t("app.tips"),
              message: `${this.$t("app.qdhf")} USDT ${res.data} ${this.$t(
                "app.chenwei"
              )} VIP${item.levelSeq}？`,
            })
            .then(() => {
              // window.location.href = this.systemConfig
              if (this.yue.goldnum >= res.data) {
                const obj = {
                  amount: res.data,
                  levelSeq: item.levelSeq,
                  levelId: item.id,
                };
                topupVip(obj).then((res) => {
                  this.$toast.success({
                    duration: 0,
                    mask: true,
                    message: `${this.$t("app.topup")}${item.level}${this.$t(
                      "app.success"
                    )}`,
                  });
                  // this.$storage.ssRm('member/memberLevel')
                  // this.$storage.ssRm('member/levelConfig')
                  setTimeout(() => {
                    this._memberLevel().then((res) => {
                      this._levelConfig();
                    });
                  }, 500);
                });
              } else {
                this.$toast({
                  duration: 3000,
                  mask: true,
                  message: `${this.$t("11006")}`,
                });
                // window.location.href = this.systemConfig
                // this.$router.push({
                //     path: '/topup',
                //     query: { rmb: String(res.data) }
                // })
              }
            })
            .catch(() => {
              // on cancel
            });
        }
      });
    },

    // 查询会员等级配置
    async _levelConfig() {
      const { data } = await levelConfig();
      const newArr = data.sort(objectSort("levelSeq"));
      // if (this.cfvip == '1') {
      newArr.forEach((item, index) => {
        if (item.level == this.userLevel.level) {
          // console.log(item.level, this.userLevel.level)
          // newArr.splice(index, 1)
        }
      });
      // }
      this.levelData = newArr;
      this.levelData.unshift(this.levelData[this.userLevel.levelSeq]);
    },
  },
  created() {
    // paramGetChildBypcode({ pcode: 'repeatBuyVIP' }).then(res => {
    //     this.cfvip = res.data.busparamname
    if (getToken()) {
      this._memberLevel().then((res) => {
        this._levelConfig();
      });
      systemConfig({ pcode: "service_url" }).then((res) => {
        this.systemConfig = res.data.busparamname;
      });
    } else {
      this.loginStatus = false;
      levelConfig().then((res) => {
        const newArr = res.data.sort(objectSort("levelSeq"));
        this.levelData = newArr;
      });
    }
    // })
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.vipWrap {
  height: calc(100% - 45px) !important;
}
.topImg {
  width: 100%;
  height: 160px;
  img {
    width: 100%;
  }
}

.vip-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vip-item {
  width: 345px;
  height: 140px;
  margin-bottom: 10px;
  border-radius: 8px;

  .head {
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .content {
    display: flex;
    height: 50%;
    align-items: center;
    font-size: 12px;

    .left {
      height: 100%;
      width: 40%;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }

    .right {
      display: flex;
      justify-content: flex-end;
      width: 60%;
      padding-right: 10px;

      .btn {
        border-radius: 6px;
        background: #ffffff;
        height: 34px;
        display: flex;
        align-items: center;
        padding: 0 5px;
      }
      .Efetive {
        margin: 6px 0;
      }
    }
  }
}

.listWrap {
  color: #333;
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-bottom: 45px;
  background: $bg1;

  .current {
    width: 100%;
    height: 120px;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    background-color: rgb(212, 211, 211);
    color: $color2;
    border-radius: 5px;
    // background: url('../../assets/img/nologin_bg.png') no-repeat;
    // background: url('../../assets/img/ask.png') no-repeat;
    background-size: contain !important;
    .sf {
      text-align: center;
      padding: 20px 0;
    }
    .date {
      text-align: right;
      padding: 7px 0;
    }
  }

  .zhubo {
    background: $bg1;
    color: $color2;
    padding: 10px 0;
    border-radius: 16px;

    .img {
      width: 60px;
      height: 60px;
    }
  }

  .wanghong,
  .zhubo,
  .mingxing {
    width: 175px;
    margin-bottom: 10px;
    background-size: contain !important;
    text-align: center;
    .title {
      margin-top: 10px;
    }
    .tyts {
      margin: 5px 0;
      text-align: center;
    }
    .task {
      margin: 5px 0;
    }
    .btn {
      display: inline-block;
      padding: 0 18px;
      height: 22px;
      line-height: 22px;
      border-radius: 10px;
      margin: 0 auto;
      color: #fff;
    }
  }
}
.bgWrap {
  line-height: 120px;
  text-align: center;
  color: #fff;
  box-sizing: border-box;
  // background: url('../../assets/img/nologin_bg.png') no-repeat;
  background-size: 100% 100%;
}
</style>
