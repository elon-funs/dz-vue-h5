<template>
  <div class="task">
    <van-tabs @click="onClick" :border="false">
      <van-tab v-for="item of tablist" :title="$t(item.title)" :key="item.id">
        <van-loading v-if="lodding" type="spinner" vertical
          >{{ $t("app.lodding_z") }}...</van-loading
        >
        <listitem
          v-if="listArr.length > 0"
          @updateStatus="updateStatus"
          :listArr="listArr"
          @updateList="updateList"
          :status="status"
        ></listitem>
        <div class="nodata" v-if="!lodding && listArr.length == 0">
          {{ $t("app.no_data") }}
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import listitem from "./components/listietm";
import { memOrderList } from "@/api";
const TABLIST = [
  {
    title: "app.task_jxz",
    id: 1,
  },
  {
    title: "app.task_shz",
    id: 2,
  },
  // {
  //     title: 'app.task_ywc',
  //     id: 3
  // }
  // {
  //     title: 'app.task_ysb',
  //     id: 4
  // },
  // {
  //     title: 'app.task_eyd',
  //     id: 5
  // },
  // {
  //     title: 'app.task_yfq',
  //     id: 6
  // }
];
export default {
  name: "Task",
  data() {
    return {
      listArr: [],
      lodding: false,
      tablist: Object.freeze(TABLIST),
      status: 1,
      pageNo: 1,
      isLastPage: false,
    };
  },
  components: {
    listitem,
  },
  methods: {
    updateList() {
      this.listArr = [];
      this._postList();
    },
    updateStatus({ index, item }) {
      item.disabled = false;
      this.$set(this.listArr, index, item);
    },
    async _postList() {
      this.lodding = true;
      // if (this.status == 1) {
      const { data } = await memOrderList({
        status: this.status,
        pageNo: this.pageNo,
        pageSize: 10,
      });
      if (data && data.length) {
        this.isLastPage = true;
        this.listArr = data;
        this.listArr.forEach((item) => {
          this.$set(item, "uploader", []);
          if (item.taskType === 3) {
            item.disabled = false;
          } else {
            item.disabled = true;
          }
        });
        this.listArr.forEach((item) => {
          this.$set(item, "imgUrl", []);
        });
      }
      this.lodding = false;
    },
    // 滚动底部加载
    lazyLoading() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      if (this.isLastPage) {
        return;
      }
      if (scrollTop + clientHeight >= scrollHeight) {
        this.pageNo++;
        this.lodding = true;
        memOrderList({
          status: this.status,
          pageNo: this.pageNo,
          pageSize: 10,
        }).then((res) => {
          if (res.status == "1") {
            this.lodding = false;
            if (res.data.length < 1) {
              this.isLastPage = false;
              return;
            }
            res.data.list.forEach((item) => {
              this.listArr.push(item);
            });
          }
        });
      }
    },
    onClick(id, title) {
      this.pageNo = 1;
      this.listArr = [];
      this.status = this.tablist[id].id;
      this.lodding = true;
      this._postList();
    },
  },
  created() {
    // 滚动到底部，再加载的处理事件
    window.addEventListener("scroll", this.lazyLoading);
    this._postList();
  },
  destroyed() {
    // 页面离开后销毁，防止切换路由后上一个页面监听scroll滚动事件会在新页面报错问题
    window.removeEventListener("scroll", this.lazyLoading);
  },
};
</script>

<style lang='scss' scoped>
@import "@/styles/theme.scss";

::v-deep.van-tabs__wrap {
  position: fixed;
  width: 100%;
  top: 45px;
  left: 0;
  z-index: 100;
}
::v-deep.van-tabs__content {
  padding-top: 45px;
}
::v-deep .van-tabs__nav {
  background: $bg1;
  border: 1px solid $bg2;
}

::v-deep .van-tab--active {
  color: $color1 !important;
}
::v-deep .van-tabs__line {
  bottom: 20px;
  background-color: $color1 !important;
}
.task {
  position: relative;
}
::v-deep.van-loading--vertical {
  padding-top: 20px;
}
.nodata {
  text-align: center;
  margin: 30px 0;
}
</style>
