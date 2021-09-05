<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:36:18
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 12:28:28
 * @Description  : 奖品
 * @FilePath     : \lotteryMeanage\client\vue\src\components\Prize.vue
-->
<template>
    <div class="prize">
        <span
            :class="['btn', 'btn-left', cLeftDisabled ? 'is_active' : '']"
            @click="handleChange('left')"
        >
            <i class="icon"> </i>
        </span>
        <div class="content" v-if="prizeInfo.length">
            <div
                class="content_inner"
                :style="{ transform: 'translateX(' + distance + 'px)' }"
                v-if="prizeInfo.length"
            >
                <template v-for="(item, index) in prizeInfo">
                    <lottery-item
                        :key="index"
                        :image="item.image"
                        :name="item.name"
                        class="content-item"
                    />
                </template>
            </div>
        </div>
        <div class="no_data_tip" v-else>暂无内容</div>
        <span
            :class="['btn', 'btn-right', cRightDisabled ? 'is_active' : '']"
            @click="handleChange('right')"
        >
            <i class="icon"> </i>
        </span>
    </div>
</template>

<script>
import LotteryItem from "@/components/LotteryItem";
import { eventBus } from "../main";

import Api from "@/common/api.js";

export default {
    name: "Prize",
    components: {
        LotteryItem,
    },
    data() {
        return {
            right_disabled: false, //左侧按钮禁用
            left_disabled: false, //右侧按钮禁用
            index: 0, //左侧已划入的个数
            distance: 0, //滑动距离
            prizeInfo: [], //中奖列表
        };
    },
    computed: {
        cLeftDisabled() {
            return this.index == 0;
        },
        cRightDisabled() {
            return this.prizeInfo.length - this.index > 3 ? false : true;
        },
    },
    methods: {
        //获取待收货奖品列表
        fetchprizeInfo() {
            let userId = localStorage.getItem("userId");
            Api.getPrizeList({ userId }).then((res) => {
                this.recordList = res.data || [];
            });
        },
        //左右切换按钮
        handleChange(direction) {
            let len = this.prizeInfo.length;
            if (direction == "left") {
                if (this.cLeftDisabled) return;
                this.distance += this.index < 3 ? this.index * 88 : 264;
                this.index -= this.index >= 3 ? 3 : this.index;
            } else {
                if (this.cRightDisabled) return;
                this.index += len - this.index - 3 >= 3 ? 3 : len % 3;
                this.distance +=
                    parseInt(this.index % 3) == 0 ? -264 : -(len % 3) * 88;
            }
        },
    },
    created() {
        this.fetchprizeInfo();
        eventBus.$on("refresh", () => {
            this.fetchprizeInfo();
        });
    },
};
</script>

<style lang="scss">
@import "./Prize.scss";
</style>
