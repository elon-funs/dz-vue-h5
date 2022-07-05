<template>
  <div class="table">
    <van-grid :column-num="1" :border="false">
      <van-grid-item v-for="(item, key) in objData" :key="key">
        <div style="text-align: center;">{{ $t(item) }}</div>
        <!-- <div class="mar">(RMB)</div> -->
        <div class="money fs16">{{ tableData[key] || 0 }}</div>
      </van-grid-item>
    </van-grid>
    <van-grid :column-num="2" :border="false">
      <van-grid-item>
        <div class="mar2" style="text-align: center;">
          {{ $t("app.today_oktask") }}
        </div>
        <span class="money fs16">{{ tableData.todayFinish || 0 }}</span>
      </van-grid-item>
      <van-grid-item>
        <div class="mar2" style="text-align: center;">
          {{ $t("app.today_sytask") }}
        </div>
        <span class="money fs16">{{ tableData.todaySurplus || 0 }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
const TABLEDATA = {
    jtsy: 'app.jtsy',
    ztsy: 'app.ztsy',
    bzsy: 'app.bzsy',
    // bysy: 'app.bysy',
    // sysy: 'app.sysy',
    // zsy: 'app.zsy'
}
export default {
    props: {
        tableData: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            objData: Object.freeze(TABLEDATA)
        }
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.table {
  margin: 8px 0;
  .mar {
    margin: 3px 0;
  }
  // .mar2 {
  //   margin-bottom: 5px;
  // }
  .money {
    margin-top: 5px;
    color: $color1;
  }
}
::v-deep .van-grid-item__content {
  padding: 20px 10px !important;
}

::v-deep .van-grid-item__content {
  background: $bg1;
  color: $color2;
  border: 0.5px solid $bg2;
}
</style>
