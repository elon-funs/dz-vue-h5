<template>
  <div class="home">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      :loop="true"
      :touchable="false"
    >
      <van-swipe-item v-for="(item, index) of lunboData" :key="index">
        <img :src="item.bndispicurl" @click="golunbo(item)" />
      </van-swipe-item>
    </van-swipe>
    <!-- 消息推送 -->
    <van-notice-bar
      background="#191919"
      color="#C8A76A"
      left-icon="volume-o"
      :text="textObj"
    />
    <!-- <noticeBar :ggArr="ggArr"></noticeBar> -->
    <!-- 导航 -->
    <homeNav :videourl="videourl" :groupUrl='groupUrl'></homeNav>
    <div class="guanggao" @click="goUrl()">
      <img src="@/assets/imgs/service/Telegram@1x.png" />
      <span>{{ $t("app.telegraph") }}</span>
      <!-- <img :src="bg" /> -->
    </div>
    <homeTask :taskList="taskList"></homeTask>
    <homeSwitch :paihangData="paihangData"></homeSwitch>
    <gg v-if="notice.length > 0" :notice="notice"></gg>
    <drag-ball :value="message" @click="goKefu">
      <div slot="value">
        <img class="bgimg" src="../../assets/img/kefu.png" alt="" srcset="" />
        <!-- <span class="fs10 font">{{$t('app.zxkf')}}</span> -->
      </div>
    </drag-ball>
  </div>
</template>

<script>
// import noticeBar from './components/noticeBar'
import homeNav from './components/homeNav'
import homeTask from './components/homeTask'
import homeSwitch from './components/homeSwitch'
import { i18n, vantLocales } from '@/lang/index'
import { mapMutations } from 'vuex'
import gg from './components/gg'
import { browserVersion1, pay } from '@/utils'
import {
    categoryList,
    InfSysnoticeList,
    ranking,
    systemConfig,
    getSysNotice
} from '@/api'
const HEADERIMG = [
    require('@/assets/img/touxiang.png'),
    require('@/assets/img/touxiang1.png'),
    require('@/assets/img/touxiang2.png'),
    require('@/assets/img/touxiang3.png'),
    require('@/assets/img/touxiang4.png'),
    require('@/assets/img/touxiang5.png'),
    require('@/assets/img/touxiang6.png'),
    require('@/assets/img/touxiang7.png'),
    require('@/assets/img/touxiang8.png'),
    require('@/assets/img/touxiang9.png')
]

const banner = {
    zh: [
        {
            bndispicurl: require('@/assets/imgs/banner/one-zh.png')
        },
        {
            bndispicurl: require('@/assets/imgs/banner/two-zh.png')
        }
    ],
    en: [
        {
            bndispicurl: require('@/assets/imgs/banner/one-en.png')
        },
        {
            bndispicurl: require('@/assets/imgs/banner/two-en.png')
        }
    ],
    es: [
        {
            bndispicurl: require('@/assets/imgs/banner/one-es.png')
        },
        {
            bndispicurl: require('@/assets/imgs/banner/two-es.png')
        }
    ],
    ar: [
        {
            bndispicurl: require('@/assets/imgs/banner/one-ar.png')
        },
        {
            bndispicurl: require('@/assets/imgs/banner/two-ar.png')
        }
    ],
    fr: [
        {
            bndispicurl: require('@/assets/imgs/banner/one-fr.png')
        },
        {
            bndispicurl: require('@/assets/imgs/banner/two-fr.png')
        }
    ]
}

const lang = {
    zh: 'zh',
    en: 'en',
    es: 'sp',
    ar: 'ab',
    fr: 'fn'
}
export default {
    name: 'Home',
    data () {
        return {
            taskList: {},
            notice: [],
            paihangData: [],
            lunboData: [],
            ggArr: ['请按照教学流程完成任务，恶意提交审核的，将永久取消兼职资格'],
            message: '',
            systemConfig: '',
            videourl: 'https://download.smart-parttime.com',
            textObj: '',
            tetUrl: '',
            groupUrl: ''
        }
    },
    components: {
    // noticeBar,
        homeNav,
        homeTask,
        homeSwitch,
        gg
    },
    computed: {
        bg () {
            const img = require(`@/assets/imgs/banner/banners/${this.$i18n.locale}.png`)
            return img
        }
    },
    watch: {
        '$i18n.locale' (val) {
            this._categoryList()
            this.lunboData = banner[val]
        }
    },
    methods: {
        tetUrlList () {
            systemConfig({ pcode: 'service_group_url' }).then((res) => {
                this.tetUrl = res.data.busparamname
            })
        },

        goUrl () {
            if (browserVersion1().android) {
                window.android.pay(this.tetUrl)
            } else if (browserVersion1().ios) {
                pay(this.tetUrl)
            } else {
                window.location.href = this.tetUrl
            }
        },
        async _systemConfig () {
            const { data } = await systemConfig({ pcode: 'h5_language' })
            if (data) {
                this.$nextTick(() => {
                    this.set_language(data.busparamname)
                    i18n.locale = data.busparamname
                    vantLocales(data.busparamname)
                })
            }
        },
        golunbo (item) {
            if (item.bndlink.indexOf('http') != -1) {
                window.top.location.href = item.bndlink
            }
        },
        goKefu () {
            this.$router.push({ path: '/customerService' })
        },
        async _categoryList () {
            this.$storage.ssRm('taskApp/categoryList')
            const { data } = await categoryList({
                language: lang[i18n.locale]
            })
            delete data.storeTask
            // data.storeTask.forEach((item, index) => {
            //     if (item.isSend != 1) {
            //         data.storeTask.splice(index, 1)
            //     }
            // })
            this.taskList = Object.freeze(data)
        },
        // 弹屏公告
        indexNotice () {
            if (!this.$storage.ssGet('notice')) {
                InfSysnoticeList({ type: 3 }).then((res) => {
                    this.notice = res.data
                    this.$storage.ssSet('notice', true)
                })
            }
        },
        // 滚动公告
        gdnoticeFn () {
            getSysNotice({
                type: 1
            }).then((res) => {
                if (this.$i18n.locale === 'en') {
                    this.textObj = res.data[0].enNotice
                } else if (this.$i18n.locale === 'es') {
                    this.textObj = res.data[0].spNotice
                } else if (this.$i18n.locale === 'ar') {
                    this.textObj = res.data[0].abNotice
                } else if (this.$i18n.locale === 'fr') {
                    this.textObj = res.data[0].fnNotice
                } else {
                    this.textObj = res.data[0].enNotice
                }
            })
            if (this.$storage.lsGet('isFirstLogin')) {
                getSysNotice({
                    type: 2
                }).then((res) => {
                    let languAge = ''
                    if (this.$i18n.locale === 'en') {
                        languAge = res.data[0].enNotice
                    } else if (this.$i18n.locale === 'es') {
                        languAge = res.data[0].spNotice
                    } else if (this.$i18n.locale === 'ar') {
                        languAge = res.data[0].abNotice
                    } else if (this.$i18n.locale === 'fr') {
                        languAge = res.data[0].fnNotice
                    } else {
                        languAge = res.data[0].enNotice
                    }
                    this.$dialog
                        .alert({
                            title: this.$t('app.announcement'),
                            message: languAge,
                            confirmButtonText: this.$t('app.Got_it'),
                            confirmButtonColor: '#C8A76A'
                        })
                        .then(() => {
                            this.$storage.lsRm('isFirstLogin')
                        })
                })
            }
        },
        // 排行榜
        async _ranking () {
            const { data } = await ranking()
            if (!data) return
            data.forEach((item) => {
                const sj = ~~(Math.random() * 10)
                item.imgurl = HEADERIMG[sj]
            })
            this.paihangData = data
        },
        ...mapMutations(['set_language'])
    },
    created () {
    // this._systemConfig()
        this.gdnoticeFn()
        // lunboList({ seatcode: 'app' }).then(res => {
        // this.lunboData = res.data.data
        // })
        this.tetUrlList()
        this._categoryList()
        this.indexNotice()
        this._ranking()
        systemConfig({ pcode: 'video_url' }).then((res) => {
            this.videourl = res.data.busparamname
        })
        systemConfig({ pcode: 'group_act_url' }).then((res) => {
            this.groupUrl = res.data.busparamname
        })
        this.lunboData = banner[this.$i18n.locale]
    }
}
</script>
<style lang="scss" scoped>
@import "@/styles/theme.scss";

::v-deep.drag-ball {
  position: fixed;
  border-radius: 0;
  width: 55px;
  height: 55px;
  padding: 0;
  background: transparent;
  box-shadow: none;
  z-index: 10;
  .drag-content {
    letter-spacing: 0;
  }
  .bgimg {
    display: block;
    margin: 0 auto;
    width: 40px;
    height: 40px;
  }
  .font {
    color: $color2;
  }
}
::v-deep.van-swipe {
  height: 160px;
  .van-swipe-item {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.home {
  position: relative;
  width: 100%;
  // height: 100%;
}
.overlay {
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9;
  width: 100%;
  height: 100%;
  .logo {
    position: absolute;
    color: white;
    text-align: center;
    line-height: 20px;
    width: 20px;
    height: 20px;
    border: 1.5px solid #fff;
    border-radius: 10px;
    right: 20px;
    top: 10px;
  }
}
.imgWrap {
  width: 100%;
  height: 160px;
  img {
    width: 100%;
  }
}
.guanggao {
  box-sizing: border-box;
  width: 100%;
  height: 52px;
  overflow: hidden;
  padding: 0 5px;
  display: flex;
  img {
    margin-top: 6px;
    margin-left: 30px;
    width: 40px;
    height: 40px;
  }
  span {
    font-size: 18px;
    width: 80%;
    text-align: center;
    margin: auto;
    color: #ff0707;
  }
}
</style>
