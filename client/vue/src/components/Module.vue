<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:10:29
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-03 10:45:53
 * @Description  : 模块
 * @FilePath     : \lotteryMeanage\client\vue\src\components\Module.vue
-->
<template>
    <div class="module">
        <div class="module__title">
            <span class="text is-flex is-middle">{{ title }}</span>
        </div>
        <div class="module__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Module",
    props: {
        title: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang="scss">
@import "./Module.scss";
</style>
