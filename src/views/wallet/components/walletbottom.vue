<template>
  <div class="wrap">
    <van-tabs @click="onClick" v-model="active" :border="false">
      <van-tab :title="$t('app.txjl')" name="60">
        <van-loading size="24px" vertical v-if="isLoading"
          >{{ $t("app.lodding_z") }}...</van-loading
        >
        <item :listdata="listdata" :active="active"></item>
      </van-tab>
      <van-tab :title="$t('app.czjl')" name="1">
        <van-loading size="24px" vertical v-if="isLoading"
          >{{ $t("app.lodding_z") }}...</van-loading
        >
        <item :listdata="listdata" :active="active"></item>
      </van-tab>
      <!-- <van-tab :title="$t('app.czsh')" name='2'>
                <van-loading size="24px" vertical v-if="isLoading">{{$t('app.lodding_z')}}...</van-loading>
                <item :listdata='listdata' :active='active'></item>
            </van-tab> -->
      <!-- <van-tab :title="$t('app.txsh')" name='3'>
                <van-loading size="24px" vertical v-if="isLoading">{{$t('app.lodding_z')}}...</van-loading>
                <item :listdata='listdata' :active='active'></item>
            </van-tab> -->
    </van-tabs>
    <div class="mar" v-if="listdata.length == 0 && !isLoading">
      {{ $t("app.no_data") }}
    </div>
  </div>
</template>

<script>
import item from "./item";
export default {
  props: {
    listdata: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: 1,
      isLoading: true,
    };
  },
  components: {
    item,
  },
  methods: {
    onClick(id) {
      this.isLoading = true;
      this.$emit("changFn", id);
    },
    // handelCilck (i) {
    //     if (this.active * 1 === 1) {
    //         this.$router.push({
    //             path: '/recharge',
    //             query: {
    //                 money: i.quantity,
    //                 num: i.snowsn
    //             }
    //         })
    //     }
    // }
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/vant.scss";

.mar {
  margin-top: 20px;
  text-align: center;
}

.wrap {
  margin: 0 5px;
  height: 100%;
}
</style>
