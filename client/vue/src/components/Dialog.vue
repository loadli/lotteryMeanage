<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-30 23:10:29
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-03 10:40:25
 * @Description  : 弹窗模块
 * @FilePath     : \lotteryMeanage\client\vue\src\components\Dialog.vue
-->
<template>
    <div>
        <template v-if="visible">
            <div class="modal__mask"></div>
            <div class="modal__wrapper">
                <div class="modal__content">
                    <div class="modal__header">
                        <span class="modal__title">{{ title }}</span>
                        <span class="modal__headerbtn" @click="close()">X</span>
                    </div>
                    <div class="modal__body">
                        <div class="wrapper">
                            <slot></slot>
                        </div>
                    </div>
                    <div class="modal__foot">
                        <div class="submit__btn" @click="submit()">
                            {{ buttonText }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: "Dialog",
    props: {
        visible: Boolean,
        title: String,
        buttonText: String,
        prizeInfo: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {};
    },
    created() {},
    methods: {
        close() {
            this.$emit("update:visible", false);
            this.$emit("close");
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>

<style lang="scss">
@import "./Dialog.scss";
</style>
