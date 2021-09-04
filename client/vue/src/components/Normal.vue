<!--
 * @Author       : xiaolin
 * @Date         : 2021-09-01 16:06:07
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-04 22:01:14
 * @Description  : 普通中奖提示
 * @FilePath     : \lotteryMeanage\client\vue\src\components\Normal.vue
-->
<template>
    <div class="wrapper is-flex is-column is-middle">
        <img :src="image" alt="奖品图片" width="200" />
        <div class="title">{{ title }}</div>
        <div class="desc" v-show="desc">
            <p>{{ desc }}</p>
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
@import "./Normal.scss";
</style>
