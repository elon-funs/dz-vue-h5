<template>
    <div class="taskWrap">
        <div v-for="(list, type) in taskList" :key="type">
            <div class="title">
                <div class="label"></div>
                <span>{{type == 'ordinaryTask' ? $t('app.taskHall') : $t('app.businessReleaseHall')}}</span>
            </div>
            <div class="listWrap" >
                <div class="item" v-for="(item) of list" :key="item.id" @click="type == 'ordinaryTask' ? goMissionHall(item) : goShangJia(item)">
                    <div class="img">
                        <img :src="item.icon" />
                    </div>
                    <div class="detail">
                        <div class="font font_ellipsis">
                            {{item.name}}
                        </div>
                        <span class="type font_ellipsis">
                            {{item.homeInfo}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topvip from '@/mixin/topvip'

export default {
    props: {
        taskList: {
            type: Object,
            default: () => {}
        }
    },
    mixins: [topvip],
    data () {
        return {
        }
    },
    created () {

    },
    methods: {
        async goMissionHall ({ id }) {
            await this._memberLevel()
            this.$router.push({ path: '/taskList', query: { categoryId: id, levelSeq: this.userLevel.levelSeq } })
        },
        goShangJia (item) {
            this.$router.push({ path: '/posttask', query: { item } })
        }
    }
}
</script>

<style lang='scss' scoped>
@import "@/styles/theme.scss";

.taskWrap {
    box-sizing: border-box;
    padding: 0 5px 5px;

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
    .listWrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .item {
            display: flex;
            width: 181px;
            height: 64px;
            overflow: hidden;
            margin-top: 3px;
            border-radius: 5px;
            font-size: 14px;
            background-color: $bg1;
            color: $color2;

            .img {
                width: 40%;
                margin: auto;
                text-align: center;
                img {
                    width: 45px;
                    height: 45px;
                }
            }
            .detail {
                flex: 1;
                overflow: hidden;
                display: flex;
                align-items: center;
                // .font {
                    // padding: 17px 0 5px;
                // }
            }
        }
    }
}
</style>
