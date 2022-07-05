<template>
    <div>
        <van-overlay :show="show">
            <div class="wrapper" @click.stop>
                <div class="block" @click="show = false">
                    <van-icon size="0.7rem" color="#fff" name="close" />
                    <div class="title fs18">【{{$t('app.new_notive')}}】</div>
                    <div class="font fs14">
                        {{notice[0].notebody}}
                    </div>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
export default {
    props: {
        notice: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            show: true
        }
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
.van-overlay {
    z-index: 999;
    background-color: rgba(0,0,0,.5);
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    position: relative;
    width: 270px;
    height: 330px;
    background: url('../../../assets/img/gg.png');
    background-size: contain;
    .van-icon {
        position: absolute;
        right: 10px;
        top: 25px;
    }
    .title {
        margin-top: 130px;
        text-align: center;
        color: #1A8AFA;
    }
    .font {
        padding: 20px;
        color: #666666;
        line-height: 1.4;
    }
}
</style>
