<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-31 23:50:53
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-01 17:24:14
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
    }
};
</script>

<style lang="scss">
.info {
    &__item {
        margin-bottom: 1em;
        text-align: center;

        input {
            margin-left: 1em;
            outline: none;
            border-radius: 4px;
            border: 1px solid #939aa3;
            padding: 4px 4px;

            &:focus {
                border-color: #1d7dfa;
            }
        }
    }
}
</style>