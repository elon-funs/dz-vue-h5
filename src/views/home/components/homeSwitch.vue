<template>
  <div class="switchWrap">
    <!-- <van-tabs @click="onClick">
            <van-tab :title="$t('app.membershipList')"> -->
    <div class="title">
      <div class="label"></div>
      <span>{{ $t("app.membershipList") }}</span>
    </div>
    <van-swipe
      style="height: 270px"
      vertical
      :autoplay="2500"
      :loop="true"
      :touchable="false"
      :show-indicators="false"
      :height="66"
      @change="onChange"
    >
      <van-swipe-item
        v-for="(item, index) of paihangData"
        :key="index"
        :initial-swipe="index"
      >
        <div class="itemWrap">
          <div class="img">
            <img :src="item.image" />
          </div>
          <div class="content">
            <div class="content-title">{{ $t("app.gx") }}</div>
            <div>{{ item.userName }}</div>
            <div class="font">
              <!-- {{ $t("app.today_complete") }}{{ item.taskNum
              }}{{ $t("app.dan") }} -->
            </div>
            <div class="icon">
              <!-- <i class="iconfont iconzhifu"></i> -->
              <img src="@/assets/imgs/金币@1x.png" alt="" />
              <span>{{ item.taskAmount }}</span>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- </van-tab> -->
    <!-- <van-tab :title="$t('app.listofmerchants')">
                <van-swipe style="height: 270px;" vertical :autoplay="2500" :loop='true' :touchable='false' :show-indicators='false' :height='66' @change="onChange">
                    <van-swipe-item v-for="(item, index) of paihangData" :key="index" :initial-swipe="index">
                        <div class="itemWrap">
                            <div class="img">
                                <img :src="item.imgurl" />
                            </div>
                            <div class="content">
                                <div class="title">{{$t('app.gx')}}***{{item.userName}}</div>
                                <div class="font">{{$t('app.today_complete')}}{{item.taskNum}}{{$t('app.dan')}}</div>
                                <div class="icon">
                                    <img src="@/assets/img/icon_money.png" />
                                    <span>{{item.taskAmount}}</span>
                                </div>
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </van-tab> -->
    <!-- </van-tabs> -->
  </div>
</template>

<script>
export default {
  props: {
    paihangData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    onChange(index) {
      // console.log(this.idArr.splice(index, 1))
      // this.idArr.splice(index, 1)
    },
    onClick(index) {
      console.log(index);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.switchWrap {
  padding: 0 5px 5px;

  ::v-deep .van-tabs__nav {
    background-color: $bg1;
  }
}

.title {
  margin-top: 5px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
  position: relative;
  background-color: $bg1;
  color: $color1;
  padding: 10px 23px;
  .label {
    position: absolute;
    border-radius: 1px;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    background-color: $color1;
    height: 15px;
  }
}

.itemWrap {
  text-transform: none;
  display: flex;
  align-items: center;
  width: 100%;
  height: 66px;
  background-color: $bg1;
  border-radius: 5px;
  margin-bottom: 3px;
  .img {
    width: 48px;
    height: 48px;
    margin-left: 12px;
    img {
      width: 100%;
    }
  }
  .content {
    flex: 1;
    position: relative;
    margin-left: 7px;
    .content-title {
      font-size: 14px;
      margin-bottom: 2px;
      color: $color2;
    }
    .font {
      font-size: 12px;
      color: #666;
    }
    .icon {
      position: absolute;
      top: 0;
      right: 10px;
      background: $bg3;
      color: $color2;
      border-radius: 20px;
      width: 65px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 16px;
        height: 16px;
      }
      span {
        padding-left: 3px;
      }
    }
  }
}
.itemWrap:nth-of-type(1) {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
.itemWrap:nth-last-of-type(1) {
  margin-bottom: 0;
}
</style>
