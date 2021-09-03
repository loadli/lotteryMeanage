<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:21:15
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-03 13:12:12
 * @Description  : 
 * @FilePath     : \lotteryMeanage\client\vue\src\components\LotteryItem.vue
-->
<template>
    <div class="lottery_item">
        <img :src="image" />
        <span class="text" :title="name" :style="{ color: color }">{{
            name
        }}</span>
    </div>
</template>

<script>
export default {
    name: "LotteryItem",
    props: {
        image: String,
        name: String,
        color: {
            type: String,
            default: "white",
        },
        userInfo: {
            type: Object,
            default() {
                return {};
            },
        },
    },
};
</script>

<style lang="scss">
@import "./LotteryItem.scss";
</style>
