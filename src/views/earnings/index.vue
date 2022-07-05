<template>
    <div class="earnings" >
        <img class="img" :src="bg" alt="">
        <!-- <div class="topImg">
            <img src="@/assets/img/shouyi.png" />
        </div>
        <div class="wrap">
            <div class="table">
                <ul class="table_c">
                    <li class="item fs12" v-for="(item, index) of table_c" :key="index">
                        <td>{{item.leve}}</td>
                        <td>{{item.jiage}}</td>
                        <td>{{item.taskNum}}</td>
                        <td>{{item.monthly}}</td>
                        <td>{{item.year}}</td>
                    </li>
                </ul>
            </div>
            <div class="font">
                <p class="line fs12"><span>子爵：</span>需充值500，每天可领取20次任务，一次任务1.8元，一天36元，14天可回本，以后再做都是纯盈利，<span>一个月可盈利1080元，一年可盈利12960。</span></p>
                <p class="line fs12"><span>伯爵：</span>需充值1000，每天可领取40次任务，一次任务1.8元，一天72元，14天可回本，以后再做都是纯盈利，<span>一个月可盈利2160元，一年可盈利25920元。</span></p>
                <p class="line fs12"><span>侯爵：</span>需充值3000，每天可领取120次任务，一次任务2元，一天240元，13天可回本，以后再做都是纯盈利，<span>一个月可盈利7200元，一年可盈利86400元。</span></p>
                <p class="line fs12"><span>公爵：</span>需充值5000，每天可领取150次任务，一次任务2.5元，一天375元，13天可回本，以后再做都是纯盈利，<span>一个月可盈利11250元，一年可盈利135000元。</span></p>
                <p class="line fs12"><span>亲王：</span>需充值10000，每天可领取300次任务，一次任务2.8元，一天840元，12天可回本，以后再做都是纯盈利，<span>一个月可盈利25200元，一年可盈利302400元。</span></p>
            </div>
            <div class="lineTitle"><div class="lable"></div><span class="fs18">推荐下级首充收益</span></div>
            <div class="table">
                <ul class="table_c2">
                    <li class="item fs12" v-for="(item, index) of table_c2" :key="index">
                        <td>{{item.leve}}</td>
                        <td>{{item.tjleve}}</td>
                        <td>{{item.yiji}}</td>
                        <td>{{item.erji}}</td>
                        <td>{{item.sanji}}</td>
                    </li>
                </ul>
            </div>
            <div class="font">
                <p class="line fs12">推荐收益<span>（成为子爵、伯爵、侯爵、公爵、亲王后拥有新用户三级分销推荐奖）；</span>您直推A用户注册会员拥有学费的20%提成，A用户推荐B用户您拥有B用户学费的10%提成，B用户推荐，C用户您拥有C用户学费的5%提成；如您是1000的伯爵会员，您推荐的A用户注册成为10000亲王会员，您则只有1000的20%提成，因为低级不能拿高级的提成；若您是亲王会员推荐A用户也注册成为亲王会员，您将拿到10000的20%提成；若您不是会员推荐的A用户注册成为亲王会员，您将拿到10000的20%提成；所有的会员推荐只限推荐新注册会员第一次充值购买等级来算。</p><br/>
                <p class="line fs12">注：为防止提成的烧伤损失，直接成为亲王会员的推荐用户最为合适；亲王会员直接推荐亲王会员最佳。</p>
            </div>
            <div class="lineTitle"><div class="lable"></div><span class="fs18">推荐下级做任务收益</span></div>
            <div class="table">
                <ul class="table_c3">
                    <li class="item fs12" v-for="(item, index) of table_c3" :key="index">
                        <td>{{item.tjleve}}</td>
                        <td>{{item.shouyi}}</td>
                        <td>{{item.detail}}</td>
                    </li>
                </ul>
            </div>
            <div class="font">
                <p class="line fs12">开启三级代理模式，佣金轻松赚不停； 会员可通过推荐新人成为平台代理，代理可以获得额外的动态奖励，直推一级用户奖励<span>每天所得佣金的5%</span>，二级用户奖励为二级用户<span>每天所得佣金的2.2%</span>，三级用户奖励为三级用户<span>每天所得佣金的1.1%</span>，三级代理简介：三级代理能获取三级所得的佣金分成，超过三级部分不能获得佣金。</p>
            </div>
            <van-divider :style="{ color: '#333333', borderColor: '#333333', padding: '0 16px' }">举例</van-divider>
            <div class="font">
                <p class="line fs12">一人发展10人为例子，您的一级邀请会员有10人，二级100人，三级1000人，每人每天的收益是100元，您可以想象您每天的收益。</p>
                <p class="line fs12">一级：100*10*5%=50元</p>
                <p class="line fs12">二级：100*100*2.2%=220元 </p>
                <p class="line fs12">三级：100*1000*1.1%=1100元</p>
                <p class="line fs12">当天下级返佣收益为：50+220+1100=1370元</p>
            </div>
        </div> -->
        <div class="div"></div>
    </div>
</template>
<script>
import { TAB_CONTENT, TAB_CONTENT2, TAB_CONTENT3 } from './font'
export default {
    name: 'Earnings',
    data () {
        return {
            table_c: Object.freeze(TAB_CONTENT),
            table_c2: Object.freeze(TAB_CONTENT2),
            table_c3: Object.freeze(TAB_CONTENT3)
        }
    },
    computed: {
        bg () {
            const img = require(`@/assets/imgs/earnings/${this.$i18n.locale}.png`)
            return img
        }
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
.earnings {
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;

    .img {
        width: 100%;
        height: auto;
    }

    .div {
        height: 45px;
        width: 100%;
    }
}
.topImg {
    width: 100%;
    height: 265px;
    img {
        width: 100%;
    }
}
.wrap {
    padding: 0 10px 50px;
    .table {
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        .table_c {
            background-color: #DFE7FB;
            .item {
                display: flex;
                justify-content: space-around;
                text-align: center;
                border-bottom: 1px solid #D4DFEA;
                td:nth-of-type(1) {
                    width: 48px;
                    border-right: 1px solid #D4DFEA;
                    padding: 8px 0;
                }
                td:nth-of-type(2) {
                    width: 48px;
                    border-right: 1px solid #D4DFEA;
                    padding: 8px 0;
                }
                td:nth-of-type(3) {
                    width: 122px;
                    border-right: 1px solid #D4DFEA;
                    padding: 8px 0;
                }
                td:nth-of-type(4) {
                    width: 60px;
                    border-right: 1px solid #D4DFEA;
                    padding: 8px 0;
                }
                td:nth-of-type(5) {
                    padding: 8px 0;
                    width: 70px;
                }
            }
            .item:nth-of-type(1) {
                padding: 8px 0;
                background-color: #5382CF;
                border: none;
                color: #fff;
                td {
                    border: none;
                    padding: 0;
                }
            }
        }
        .table_c2 {
            background-color: #DFE7FB;
            .item {
                display: flex;
                justify-content: space-around;
                text-align: center;
                border-bottom: 1px solid #D4DFEA;
                td:nth-of-type(1) {
                    width: 50px;
                    border-right: 1px solid #D4DFEA;
                    padding: 8px 0;
                }
                td:nth-of-type(2) {
                    width: 70px;
                    border-right: 1px solid #D4DFEA;
                    padding: 8px 0;
                }
                td:nth-of-type(3) {
                    width: 70px;
                    border-right: 1px solid #D4DFEA;
                    padding: 8px 0;
                }
                td:nth-of-type(4) {
                    width: 70px;
                    border-right: 1px solid #D4DFEA;
                    padding: 8px 0;
                }
                td:nth-of-type(5) {
                    padding: 8px 0;
                    width: 70px;
                }
            }
            .item:nth-of-type(1) {
                padding: 8px 0;
                background-color: #5382CF;
                border: none;
                color: #fff;
                td {
                    border: none;
                    padding: 0;
                }
            }
        }
        .table_c3 {
            background-color: #DFE7FB;
            .item {
                display: flex;
                justify-content: space-around;
                text-align: center;
                border-bottom: 1px solid #D4DFEA;
                td:nth-of-type(1) {
                    width: 100px;
                    border-right: 1px solid #D4DFEA;
                    padding: 8px 0;
                }
                td:nth-of-type(2) {
                    width: 100px;
                    border-right: 1px solid #D4DFEA;
                    padding: 8px 0;
                }
                td:nth-of-type(3) {
                    width: 110px;
                    border-right: 1px solid #D4DFEA;
                    padding: 8px 0;
                }
            }
            .item:nth-of-type(1) {
                padding: 8px 0;
                background-color: #5382CF;
                border: none;
                color: #fff;
                td {
                    border: none;
                    padding: 0;
                }
            }
        }
    }
    .font {
        margin: 20px 0;
        .line {
            line-height: 1.4;
            span {
                font-weight: bold;
            }
        }
    }
    .lineTitle {
        margin: 10px 0;
        position: relative;
        span {
            padding-left: 20px;
        }
        .lable {
            position: absolute;
            left: 0;
            top: 0;
            width: 3px;
            height: 15px;
            background-color: #1989FA;
        }
    }
}
</style>
