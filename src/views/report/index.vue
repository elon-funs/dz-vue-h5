<template>
    <div>
        <div class="top">
            <div class="top_t">
                <span class="fs16 text1">{{$t('app.zsy')}}:  {{listData.agentTaskProfit + listData.taskProfit}} USDT</span><span style="color: #999999; float: right;">{{$t('app.today')}}</span>
            </div>
            <div class="top_b">
                <div class="bor">
                    <span class="fs16 text1">{{listData.finshTaskNum || 0}}</span>
                    <div class="fontCenter">{{$t('app.report_wdrw')}}</div>
                </div>
                <div>
                    <span class="fs16 text1">{{listData.taskProfit || 0}}</span>
                    <div class="fontCenter">{{$t('app.report_wdsy')}}</div>
                </div>
                <div class="bor">
                    <span class="fs16 text1">{{listData.agentFinshTaskNum || 0}}</span>
                    <div class="fontCenter">{{$t('app.report_xjrw')}}</div>
                </div>
                <div>
                    <span class="fs16 text1">{{listData.agentTaskProfit || 0}}</span>
                    <div class="fontCenter">{{$t('app.report_xjfy')}}</div>
                </div>
            </div>
        </div>
        <!-- <div class="rjbb">
            <span class="fs16" style="color: #1989FB;">日结报表</span><span style="color: #999999; float: right;">最近30天</span>
        </div>
        <div class="tanhead">
            <div v-for="item of tabHead" :key="item">{{item}}</div>
        </div>
        <ul class="tabContent">
            <li v-for="(item, index) of listData" :key="index">
                <td>{{item.sl}}</td>
                <td style="color: #1989FB;">{{item.task}}</td>
                <td>{{item.xj}}</td>
                <td style="color: #1989FB;">{{item.xf}}</td>
                <td>{{item.date}}</td>
            </li>
        </ul> -->
    </div>
</template>

<script>
import { todayReport } from '@/api'
// const TABHEAd = ['数量', '任务', '下级', '消费', '日期']
// const DATA = [
//     {
//         sl: '1',
//         task: '10.00',
//         xj: '5.72',
//         xf: '0.00',
//         date: '09-11'
//     },
//     {
//         sl: '1',
//         task: '10.00',
//         xj: '5.72',
//         xf: '0.00',
//         date: '09-11'
//     },
//     {
//         sl: '1',
//         task: '10.00',
//         xj: '5.72',
//         xf: '0.00',
//         date: '09-11'
//     }
// ]
export default {
    name: 'Report',
    data () {
        return {
            // tabHead: Object.freeze(TABHEAd),
            listData: {}
        }
    },
    methods: {

    },
    created () {
        todayReport().then(res => {
            if (res.status == '1') {
                this.listData = res.data
            }
        })
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/vant.scss';

.top {
    margin: 10px 0 5px;
    background-color: $bg1;
    .top_t {
        padding: 15px 10px;
        border-bottom: 1px solid $bg2;
    }
    .top_b {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        >div {
            height: 70px;
            width: 49.5%;
            border-bottom: 1px solid $bg2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            >div {
                color: #999999;
                margin-top: 10px;
            }
        }
        .bor {
            border-right: 1px solid $bg2;
        }
    }
}
.rjbb {
    background-color: #fff;
    padding: 15px 10px;
    border-bottom: 1px solid $bg2;
}
.tanhead {
    display: flex;
    padding: 15px 0;
    >div {
        width: 20%;
        text-align: center;
    }
}
.tabContent {
    background-color: #fff;
    >li {
        display: flex;
        border-bottom: 1px solid #eeeeee;
        padding: 10px 0;
        td {
            width: 20%;
            text-align: center;
        }
    }
}
.fontCenter {
    text-align: center;
}
</style>
