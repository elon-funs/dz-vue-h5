<template>
  <div>
    <template v-if="active == '1' || active == '60'">
      <div class="item" v-for="(item, index) of listdata" :key="index">
        <div class="btm">
          <span class="fs14">{{ item.orderno }}</span>
          <span style="float: right; color: #4087f1">{{ item.realamt }}</span>
        </div>
        <div>
          <span
            v-if="item.orderstatus === 'ord12'"
            class="fs12"
            style="color: #999999"
            >{{ sjcFn(item.paydate) }}</span
          >
          <span
            v-else-if="active === '60' || item.orderstatus === 'ord08'"
            class="fs12"
            style="color: #999999"
            >{{ sjcFn(item.updateTime) }}</span
          >
          <span
            v-else-if="active === '1'"
            class="fs12"
            style="color: #999999"
            >{{ sjcFn(item.createdate) }}</span
          >
          <span class="fs12" style="float: right">{{
            $t(`app.${[item.orderstatus]}`)
          }}</span>
        </div>
      </div>
    </template>
    <template v-if="active == '2'">
      <div class="item" v-for="(item, index) of listdata" :key="index">
        <div class="btm">
          <span class="fs14">{{ item.orderno }}</span>
          <span style="float: right; color: #4087f1">{{ item.realamt }}</span>
        </div>
        <div>
          <span class="fs12" style="color: #999999">{{ item.createdate }}</span>
          <span class="fs12" style="float: right">{{
            status[item.orderstatus]
          }}</span>
        </div>
      </div>
    </template>
    <template v-if="active == '3'">
      <div class="item" v-for="(item, index) of listdata" :key="index">
        <div class="btm">
          <span class="fs14">{{ item.orderno }}</span>
          <span style="float: right; color: #4087f1">{{ item.realamt }}</span>
        </div>
        <div>
          <span class="fs12" style="color: #999999">{{
            item.finishTime || item.updateTime
          }}</span>
          <span class="fs12" style="float: right">{{
            status[item.orderstatus]
          }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
const STATUS = {
  // ord01: '新订单',
  ord04: "待付款",
  ord05: "提现申请",
  // ord06: '提现取消',
  ord07: "提現处理中",
  ord08: "已付款",
  // ord09: '用户取消',
  // ord10: '已评价',
  // ord11: '已退款',
  ord12: "已提現",
  // ord13: '充值失败',
  // ord14: '提现失败',
  // ord99: '已过期'
};

const statusText = {
  // 新订单: 'ord01',
  待付款: "ord04",
  提现申请: "ord05",
  // 提现取消: 'ord06',
  提現处理中: "ord07",
  已付款: "ord08",
  // 用户取消: 'ord09',
  // 已评价: 'ord10',
  // 已退款: 'ord11',
  已提現: "ord12",
  // 充值失败: 'ord13',
  // 提现失败: 'ord14',
  // 已过期: 'ord99'
};
export default {
  props: {
    listdata: {
      type: Array,
      default: () => [],
    },
    active: String,
  },
  data() {
    return {
      status: Object.freeze(STATUS),
      statusText,
    };
  },
  methods: {
    sjcFn(i) {
      return this.$monent(new Date(i)).format("YYYY-MM-DD hh:mm:ss");
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/vant.scss";

.item {
  // height: 66px;
  background: $bg1;
  border-bottom: 1px solid $bg2;
  padding: 12px 20px;
  .btm {
    margin-bottom: 15px;
  }
}
</style>
