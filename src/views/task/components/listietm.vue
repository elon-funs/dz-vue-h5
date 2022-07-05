<template>
  <div>
    <div
      class="itemWrap"
      v-for="(item, index) in listArr"
      :key="index"
      @click="goTaskClaimDetails(item)"
    >
      <div class="head">
        <img :src="item.icon" />
        <span class="font fs16">{{ item.categoryName }}</span>
        <!-- <van-icon
          v-if="status === 1"
          name="cross"
          @click.stop="closeTask(item)"
        /> -->
      </div>
      <div class="bom">
        <!-- <div class="taskyq">{{ $t("app.task_yq") }}：{{ item.task.title }}</div> -->
        <div class="tasklj">
          <!-- {{ $t("app.task_url") }}：<span class="font_ellipsis urlclass">{{
            item.task.taskUrl || ""
          }}</span> -->
          USDT:<span class="money">{{ item.usdt }}<span></span></span>

          <!-- 复制 -->
          <!-- <span
            class="copylj fs14"
            @click.stop="copyValue(item.task.taskUrl)"
            >{{ $t("app.copy_url") }}</span
          > -->
        </div>
        <div class="mar">
          {{ $t("app.created") }}：{{ sjcFn(item.createTime) }}
        </div>
        <div class="mar">
          {{ $t("app.invalid") }}：{{ sjcFn(item.task.finishDate) }}
        </div>
        <div class="sheng">
          <span v-if="item.remark">{{ $t("app.sh") }}：{{ item.remark }}</span>
          <!-- <span class="money"
            >{{ item.task.price }}<span>{{ $t("app.yuan") }}</span></span
          > -->
        </div>
        <!-- <van-field v-if="status == 1" name="uploader" :label="$t('app.complete_jt') + '：'" @click.stop>
                    <template #input>
                        <van-uploader v-model="item.uploader"
                            :max-count="3"
                            :after-read="(file, detail) => afterRead(file, detail, index)"
                            :before-delete="(file, detail) => bz_closeImg(file, detail, index)"
                            :before-read="beforeRead"
                        />
                    </template>
                </van-field> -->
        <!-- 提交完成任务 -->
        <div class="btns">
          <!-- 打开 -->
          <span class="openlj fs14" @click.stop="openUrl(item, index)">{{
            $t("app.openurl")
          }}</span>
          <!-- <div
            v-if="status === 1"
            class="btn fs12"
            @click.stop="postTask(item)"
          >
            {{ $t("app.submit_ok_task") }}
          </div> -->
          <van-button
            v-if="status === 1"
            class="btn fs12"
            :disabled="item.disabled"
            :border="false"
            @click.stop="postTask(item)"
          >
            {{ $t("app.submit_ok_task") }}</van-button
          >
        </div>
        <div v-if="status === 2" class="sh"><img :src="bg" /></div>
        <div v-if="status === 3" class="sh">
          <img src="@/assets/img/task_ywc.png" />
        </div>
        <div v-if="status === 4" class="sh">
          <img src="@/assets/img/task_ysb.png" />
        </div>
        <div v-if="status === 5" class="sh">
          <img src="@/assets/img/task_eyd.png" />
        </div>
        <div v-if="status === 6" class="sh">
          <img src="@/assets/img/task_yfq.png" />
        </div>
      </div>
    </div>
    <div class="noData">{{ $t("app.nodata_l") }}</div>
  </div>
</template>

<script>
import {
  submitTask,
  uploadsImg,
  editTaskOrder,
  openLink,
  getMemberCredit,
} from "@/api";
import { browserVersion1, pay } from "@/utils";
export default {
  props: {
    listArr: {
      type: Array,
      default: () => [],
    },
    status: Number,
  },
  data() {
    return {
      // uploader: []
      isdisabled: true,
      creditRatingList: 0,
    };
  },

  computed: {
    bg() {
      const img = require(`@/assets/img/audit/${this.$i18n.locale}.png`);
      return img;
    },
  },

  created() {
    getMemberCredit().then((res) => {
      this.creditRatingList = res.data;
    });
  },
  methods: {
    closeTask(i) {
      const obj = {
        id: i.taskOrderId,
        taskId: i.task.id,
        taskOrderStatus: "ABANDON",
      };
      editTaskOrder(obj).then((res) => {
        this.$toast({
          message: `${this.$t("app.giveup_task")}！`,
        });
        this.$emit("updateList");
      });
    },
    afterRead(file, detail, index) {
      console.log(file.file.size);
      file.status = "uploading";
      file.message = "";
      if (/\/(?:jpeg|png)/i.test(file.file.type) && file.file.size > 512000) {
        // 创建Canvas对象(画布)
        const canvas = document.createElement("canvas");
        // 获取对应的CanvasRenderingContext2D对象(画笔)
        const context = canvas.getContext("2d");
        // 创建新的图片对象
        const img = new Image();
        // 指定图片的DataURL(图片的base64编码数据)
        img.src = file.content;
        // 监听浏览器加载图片完成，然后进行进行绘制
        img.onload = () => {
          // 指定canvas画布大小，该大小为最后生成图片的大小
          canvas.width = 350;
          canvas.height = 650;
          // drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
          // 如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/
          context.drawImage(img, 0, 0, 350, 650);
          // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
          file.content = canvas.toDataURL(file.file.type, 0.5);
          // 最后将base64编码的图片保存到数组中，留待上传。
          this.$set(
            this.listArr[index].uploader[detail.index],
            "content",
            file.content
          );
        };
      }
      const params = new FormData();
      params.append("file", file.file);
      uploadsImg(params).then((result) => {
        this.$toast({
          message: `${this.$t("app.post_success")}！`,
        });
        file.status = "";
        this.listArr[index].imgUrl.push({ img: result.result });
      });
    },
    beforeRead(file) {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/gif" &&
        file.type !== "image/jpg"
      ) {
        this.$toast({
          message: `${this.$t("app.pls_tips_photo")}！`,
        });
        return false;
      }
      if (file.size >= 2048000) {
        this.$toast({
          message: "请上传2m内大小图片",
        });
        return false;
      }
      return true;
    },
    bz_closeImg(file, detail, index) {
      this.listArr[index].uploader.splice(detail.index, 1);
      this.listArr[index].imgUrl.splice(detail.index, 1);
    },
    sjcFn(i) {
      return this.$monent(new Date(i)).format("YYYY-MM-DD hh:mm:ss");
    },
    copyValue(i) {
      var input = document.createElement("input");
      input.value = i;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      this.$toast({
        message: `${this.$t("app.copy_success")}！`,
      });
      document.body.removeChild(input);
    },
    openUrl(item, index) {
      openLink({ taskOrderId: item.taskOrderId }).then((res) => {});
      this.$emit("updateStatus", { index, item });

      if (browserVersion1().android) {
        window.android.pay(item.task.taskUrl);
      } else if (browserVersion1().ios) {
        pay(item.task.taskUrl);
      } else {
        window.open(item.task.taskUrl);
      }

      // if (item.categoryName == '快手') {
      //     window.location.href = item.task.taskUrl
      // } else {
      //     window.location.href = item.task.sendSdkUrl
      // }
    },
    postTask(i) {
      // if (i.imgUrl.length <= 0) {
      //     this.$toast({
      //         message: `${this.$t('app.pls_tips_photo_jt')}！`
      //     })
      //     return
      // }
      if (this.creditRatingList < 60) {
        this.$dialog
          .confirm({
            title: `${this.$t("app.tips")}`,
            message: `${this.$t("app.SubmitTask")}`,
          })
          .then(() => {})
          .catch(() => {});
      } else {
        const obj = {
          taskOrderId: i.taskOrderId,
          submitSample: JSON.stringify(i.imgUrl),
        };
        submitTask(obj).then((res) => {
          if (res.status == 1) {
            this.$toast({
              message: `${this.$t("app.submit_success")}！`,
            });
            this.$emit("updateList");
          }
        });
      }
    },
    goTaskClaimDetails(item) {
      item.task.updateTime = item.updateTime;
      // this.$router.push({
      //     path: '/taskClaimDetails',
      //     query: { item: item.task, status: this.status }
      // })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

::v-deep .van-button--default {
  border: none;
}

.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .openlj {
    display: flex;
    align-items: center;
    background: $color1;
    padding: 0 10px;
    border-radius: 5px;
    height: 25px;
  }
}

.sh {
  position: absolute;
  bottom: 10px;
  right: 60px;
  width: 58px;
  height: 50px;
  img {
    width: 100%;
  }
}
.noData {
  text-align: center;
  padding: 15px 0;
}
.itemWrap {
  border-radius: 5px;
  overflow: hidden;
  background-color: $bg1;
  color: $color2;
  margin: 10px 10px;
  .head {
    position: relative;
    padding: 7px 10px;
    background: $bg4;
    height: 39px;
    line-height: 39px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    img {
      width: 25px;
      height: 25px;
    }
    .van-icon {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 16px;
    }
    .font {
      padding-left: 10px;
      color: #343434;
    }
  }
  .bom {
    padding: 10px 10px 10px;
    position: relative;
    .taskyq {
      margin: 10px 0;
    }
    .tasklj {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      span {
        margin: 0 5px;
        padding: 0 5px;
        display: inline-block;
        // text-align: center;
        line-height: 25px;
        border-radius: 5px;
        width: 66px;
        height: 25px;
        color: #fff;
      }

      .copylj {
        background: $color1;
      }
    }
    .mar {
      margin-bottom: 10px;
    }
    .sheng {
      position: relative;
      .money {
        // position: absolute;
        // right: 10px;
        // top: -25px;
        font-size: 30px;
        z-index: 3;
        color: $color2;
        span {
          font-size: 14px;
        }
      }
    }
    ::v-deep.van-cell {
      padding: 0;
      .van-cell__title {
        display: flex;
        align-items: center;
      }
      .van-cell__value {
        padding-top: 10px;
        padding-right: 100px;
      }
      .van-uploader__preview-image {
        width: 40px;
        height: 40px;
      }
      .van-uploader__upload {
        width: 40px;
        height: 40px;
      }
    }
    ::v-deep.van-cell::after {
      border: none;
    }
    .btn {
      box-sizing: border-box;
      // position: absolute;
      padding: 0 10px;
      height: 25px;
      border-radius: 5px;
      background-color: #ff3434;
      padding: 8px 10px;
      color: #fff;
      // right: 10px;
      // bottom: 10px;
    }
  }
}
.urlclass {
  font-size: 14px;
  width: 70px !important;
  padding: 0 !important;
  text-align: left !important;
  vertical-align: bottom;
}
</style>
