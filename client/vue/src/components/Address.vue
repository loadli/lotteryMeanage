<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-31 23:50:53
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-03 10:39:39
 * @Description  : 地址填写
 * @FilePath     : \lotteryMeanage\client\vue\src\components\Address.vue
-->
<template>
    <div>
        <div class="prize">
            <slot></slot>
        </div>
        <div class="info">
            <div class="info__item">
                <label>姓名</label><input v-model="value.name" type="text" />
            </div>
            <div class="info__item">
                <label>电话</label
                ><input v-model="value.phone" type="text" maxlength="11" />
            </div>
            <div class="info__item">
                <label>地址</label><input v-model="value.address" type="text" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Address",
    props: {
        value: {
            type: Object,
            default() {
                return {
                    name: null,
                    phone: null,
                    address: null,
                };
            },
        },
    },
};
</script>

<style lang="scss">
@import "./Address.scss";
</style>
