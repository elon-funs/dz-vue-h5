<template>
  <div class="noticeBar">
    <van-cell @click.native="toNoticeInfo" :border="false">
      <template v-slot:icon>
        <!-- <img class="icon" src="@/assets/img/laba.png" /> -->
        <i class="iconfont icon004laba-1 iconstyle"></i>
      </template>
      <div>text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"</div>
      <van-swipe
        :autoplay="3000"
        :vertical="true"
        :touchable="false"
        :show-indicators="false"
        @change="i => (index = i)"
      >
        <van-swipe-item v-for="(item, index) of ggArr" :key="index">
          {{ item }}
        </van-swipe-item>
      </van-swipe>
    </van-cell>
  </div>
</template>

<script>
export default {
    props: {
        ggArr: {
            type: Array,
            defualt: () => []
        }
    },
    data () {
        return {}
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.noticeBar {
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  display: flex;
  .icon {
    height: 20px;
    display: block;
    margin: 7px 5px 0 0;
  }
  .van-swipe {
    height: 100%;
    font-size: 16px;
  }
  .van-cell {
    padding: 0 10px;
    background-color: $bg1;
    color: $color2;
    display: flex;
    align-items: center;
  }
  .van-swipe-item {
    font-size: 13px;
    height: 35px;
    line-height: 35px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
.iconstyle {
  color: $color1;
  font-size: 22px;
  line-height: 35px;
}
</style>
