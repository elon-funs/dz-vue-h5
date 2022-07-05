<template>
  <div>
    <div class="dateWrap">
      <input v-model="oneDate" class="inp" type="text" @focus="selectFn(1)" />
      &nbsp;<span style="color: #999999">-</span>&nbsp;
      <input v-model="twoDate" class="inp" type="text" @focus="selectFn(2)" />
      <div class="btn bg_font centerY" @click="sousuo">
        {{ this.$t("app.searchText") }}
      </div>
    </div>
    <van-tabs @click="leveClick">
      <van-tab
        v-for="(item, index) of levelist"
        :key="index"
        :title="$t(item.leve)"
      >
      </van-tab>
    </van-tabs>
    <div class="itemWrap">
      <div class="item" v-for="(item, index) in listdata" :key="index">
        <span class="fs16 text1">{{ temData[index] || 0 }}</span>
        <div style="width: 80%; text-align: center; line-height: 20px">
          {{ $t(item) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const LISTDATA = {
  recAmount: "app.topup",
  cashAmount: "app.withdrawal",
  // taskAward: 'app.taskAward',
  recNum: "app.czrs",
  recCount: "app.frequency",
  taskNum: "app.quantity",
  // rebate: 'app.rebate',
  // brokerage: 'app.brokerage',
  // activity: 'app.activity',
  // pump: 'app.pump',
  // revokeTask: 'app.revokeTask',
  teamNum: "app.teamNum",
};
const LEVELIST = [
  {
    leve: "app.LevelOne",
    id: "0",
    name: "subOneList",
  },
  {
    leve: "app.LevelTwo",
    id: "1",
    name: "subTwoList",
  },
  {
    leve: "app.LevelThree",
    id: "2",
    name: "subThreeList",
  },
];
export default {
  props: {
    oneDate: {
      type: String,
      default: "",
    },
    temData: {
      type: Object,
      default: () => {},
    },
    twoDate: {
      type: String,
      default: "",
    },
    fatherMethod: {
      type: Function,
      require: true,
      default: null,
    },
  },
  data() {
    return {
      listdata: Object.freeze(LISTDATA),
      levelist: Object.freeze(LEVELIST),
    };
  },
  methods: {
    sousuo() {
      this.$emit("sousuo");
    },
    selectFn(num) {
      this.$emit("setDate", num);
    },
    leveClick(id, title) {
      if (id === 0) {
        this.fatherMethod(1);
      } else if (id === 1) {
        this.fatherMethod(2);
      } else if (id === 2) {
        this.fatherMethod(3);
      }
    },
    // async _getTeamReport () {
    //     const { data } = await getTeamReport({ accno: this.temData.accno })
    //     console.log(data)
    // }
  },
  // created () {
  //     this._getTeamReport()
  // }
};
</script>

<style lang='scss' scoped>
@import "@/styles/vant.scss";

.dateWrap {
  position: relative;
  margin-top: 8px;
  padding: 10px;
  background-color: $bg2;
  border-bottom: 1px solid $bg2;
  .inp {
    border: 1px solid $color2;
    text-align: center;
    width: 100px;
    height: 23px;
    border-radius: 5px;
    background: $bg2;
  }
  .btn {
    position: absolute;
    right: 10px;
    border-radius: 3px;
    width: 48px;
    height: 24px;
    line-height: 24px;
    text-align: center;
  }
}
.itemWrap {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
  justify-content: space-between;
  .item {
    width: 49.8%;
    height: 70px;
    background-color: $bg1;
    border-bottom: 1px solid $bg2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > div {
      margin-top: 8px;
    }
  }
}
::v-deep .van-tab {
  .van-tab__text {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-align: center;
  }
}
</style>
