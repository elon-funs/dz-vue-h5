<template>
  <div>
    <!-- <van-tabs @click="onClick" :border="false"> -->
    <!-- <van-tab :title="$t('app.team_report')"> -->
    <team
      @setDate="setDate"
      :oneDate="oneDate"
      :twoDate="twoDate"
      @sousuo="sousuoFn"
      :temData="temData"
      :fatherMethod="_getTeamReport"
    ></team>
    <!-- </van-tab> -->
    <!-- <van-tab :title="$t('app.myteam')">
        <my
          @setDate="setDate"
          :oneDate="oneDate2"
          :twoDate="twoDate2"
          @sousuo="sousuoFn"
          :tuanduiData="tuanduiData"
          :lodding="lodding"
          @lazyFn="lazyFn"
        >
        </my>
      </van-tab> -->
    <!-- </van-tabs> -->
    <van-action-sheet v-model="showSelectDate">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :title="$t('app.selectTime')"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmDate"
        @cancel="showSelectDate = false"
      />
    </van-action-sheet>
  </div>
</template>

<script>
import { getTeamReport, myTuandui } from "@/api";
import team from "./components/team";
import my from "./components/my";
export default {
  name: "Teamreports",
  data() {
    return {
      flag: 0,
      showSelectDate: false,
      valueJudge: "",
      oneDate: "",
      twoDate: "",
      oneDate2: "",
      twoDate2: "",
      minDate: new Date(2020, 1, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      temData: {},
      tuanduiData: [],
      pageNo: 1,
      lodding: false,
      isLastPage: false,
    };
  },
  components: {
    team,
    my,
  },
  methods: {
    sousuoFn() {
      if (this.flag === 0) {
        this._getTeamReport();
      } else {
        this._myTuandui();
      }
    },
    setDate(num) {
      this.showSelectDate = true;
      this.valueJudge = num;
    },
    confirmDate() {
      this.showSelectDate = false;
      // 团队报表时间设置
      if (this.flag == 0) {
        if (this.valueJudge == 1) {
          this.oneDate = this.$monent(this.currentDate).format("YYYY-MM-DD");
        }
        if (this.valueJudge == 2) {
          this.twoDate = this.$monent(this.currentDate).format("YYYY-MM-DD");
        }
      }
      // 我的团队时间设置
      if (this.flag == 1) {
        if (this.valueJudge == 1) {
          this.oneDate2 = this.$monent(this.currentDate).format("YYYY-MM-DD");
        }
        if (this.valueJudge == 2) {
          this.twoDate2 = this.$monent(this.currentDate).format("YYYY-MM-DD");
        }
      }
    },
    onClick(id, title) {
      this.flag = id;
      this.pageNo = 1;
      // console.log(id, title)
    },
    // 分页加载
    lazyFn() {
      if (this.isLastPage) return;
      this.lodding = true;
      this.pageNo++;
      const obj = {
        startTime: this.oneDate2,
        endTime: this.twoDate2,
        pageNo: this.pageNo,
        pageSize: 20,
        accno: this.$storage.lsGet("userInfo").accno,
      };
      myTuandui(obj).then((res) => {
        if (res.status == "1") {
          this.isLastPage = res.data.isLastPage;
          this.lodding = false;
          res.data.list.forEach((item) => {
            this.tuanduiData.push(item);
          });
        }
      });
    },
    // 团队报表
    async _getTeamReport(value) {
      const obj = {
        startTime: this.oneDate,
        endTime: this.twoDate,
        level: value || 1,
      };
      const { data } = await getTeamReport(obj);
      this.temData = data;
    },
    // 我的团队
    async _myTuandui() {
      const obj = {
        startTime: this.oneDate2,
        endTime: this.twoDate2,
        pageNo: this.pageNo,
        pageSize: 20,
        accno: this.$storage.lsGet("userInfo").accno,
      };
      const { data } = await myTuandui(obj);
      this.isLastPage = data.isLastPage;
      this.tuanduiData = data.list;
    },
  },
  created() {
    this.oneDate = this.$monent(new Date(this.currentDate)).format(
      "YYYY-MM-DD"
    );
    this.twoDate = this.$monent(new Date(this.currentDate)).format(
      "YYYY-MM-DD"
    );
    this.oneDate2 = this.$monent(new Date(this.currentDate)).format(
      "YYYY-MM-DD"
    );
    this.twoDate2 = this.$monent(new Date(this.currentDate)).format(
      "YYYY-MM-DD"
    );
    this._getTeamReport();
    // this._myTuandui();
  },
};
</script>

<style lang='scss' scoped>
// ::v-deep.van-tabs__wrap {
//     margin-bottom: 8px;
// }
</style>
