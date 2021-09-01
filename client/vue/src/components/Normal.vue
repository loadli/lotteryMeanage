<!--
 * @Author       : xiaolin
 * @Date         : 2021-09-01 16:06:07
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-01 17:10:55
 * @Description  : 普通中奖提示
 * @FilePath     : \lotteryMeanage\client\vue\src\components\Normal.vue
-->
<template>
    <div class="wrapper is-flex is-column is-middle">
        <img :src="image" alt="奖品图片" />
        <div class="title">恭喜获得{{title}}</div>
        <div class="desc" v-show="desc">
            <p>{{desc}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Normal",
    props: {
        image: String,
        title: String,
        desc: String,
    },
};
</script>

<style lang="scss">
.wrapper {
    width: 100%;

    .title {
        padding-top: 20px;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        text-align: center;
        color: #d25f00;
        opacity: 0.8;
    }
    .desc {
        text-align: center;
        p {
            margin: 0;
            padding-top: 8px;
            font-size: 14px;
            line-height: 22px;
            color: #1d2129;
        }
    }
}
</style>