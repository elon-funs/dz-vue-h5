<template>
  <div>
    <wallettop :yue="yue"></wallettop>
    <walletbottom
      :listdata="listdata"
      @changFn="changFn"
      ref="data"
    ></walletbottom>
  </div>
</template>

<script>
import wallettop from "./components/wallettop";
import walletbottom from "./components/walletbottom";
import {
  withdrawalOrderList,
  rechargeOrderList,
  orderList,
  doReflushGoldnumBalance,
} from "@/api";

export default {
  name: "Wallet",
  data() {
    return {
      listdata: [],
      accno: this.$storage.lsGet("userInfo").accno,
      recordtype: 60,
      yue: 0,
    };
  },
  components: {
    wallettop,
    walletbottom,
  },
  methods: {
    // 获取余额
    async _doReflushGoldnumBalance() {
      const { data } = await doReflushGoldnumBalance();
      this.yue = data.goldnum;
    },
    changFn(id) {
      this.listdata = [];
      if (id * 1 === 1 || id * 1 === 60) {
        this.recordtype = id;
        this._getAccountRecord();
      } else if (id * 1 === 2) {
        this._orderList();
      } else {
        this._withdrawalorderList();
      }
    },
    // 线下充值审核
    async _orderList() {
      const obj = {
        pageNumber: 1,
        pageSize: 10,
      };
      const { data } = await orderList(obj);
      this.listdata = data.pageInfo.data;
      this.$refs.data.isLoading = false;
    },
    // 提现审核
    async _withdrawalorderList() {
      const obj = {
        pageNumber: 1,
        pageSize: 50,
      };
      const { data } = await withdrawalorderList(obj);
      this.listdatad = data.data.data;
      this.$refs.data.isLoading = false;
    },
    // 充值提现完成记录
    async _getAccountRecord() {
      const obj = {
        pageNo: 1,
        pageSize: 50,
      };
      if (this.recordtype === 60 || this.recordtype === "60") {
        var { data } = await withdrawalOrderList(obj);
      } else if (this.recordtype === "1") {
        var { data } = await rechargeOrderList(obj);
      }
      this.listdata = data.data;
      this.$refs.data.isLoading = false;
    },
  },
  created() {
    this._doReflushGoldnumBalance();
    this._getAccountRecord();
  },
};
</script>

<style lang='scss' scoped>
</style>
