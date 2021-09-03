<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:36:18
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-03 10:44:28
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
        <div class="content">
            <div
                class="content_inner"
                :style="{ transform: 'translateX(' + distance + 'px)' }"
            >
                <lottery-item
                    v-for="(item, index) in prizeInfo"
                    :key="index"
                    :image="item.image"
                    :name="item.prizeName"
                    class="content-item"
                >
                </lottery-item>
            </div>
        </div>
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

export default {
    name: "Prize",
    components: {
        LotteryItem,
    },
    props: {
        isRefresh: Boolean,
    },
    data() {
        return {
            right_disabled: false, //左侧按钮禁用
            left_disabled: false, //右侧按钮禁用
            index: 0,
            distance: 0, //滑动距离
            prizeInfo: [], //中奖列表
        };
    },
    watch: {
        isRefresh(val) {
            if (val) {
                this.fetchprizeInfo();
            }
        },
    },
    computed: {
        cLeftDisabled() {
            return this.index == 0 || this.index < 3 ? true : false;
        },
        cRightDisabled() {
            return this.prizeInfo.length - this.index >= 3 ? false : true;
        },
    },
    methods: {
        fetchprizeInfo() {
            let userId = localStorage.getItem("userId");
            this.$axios
                .post("api/user/my", { userId: userId })
                .then((res = {}) => {
                    console.log(11, res);
                    if (res.data.code == 200) {
                        debugger;
                        this.prizeInfo = res.data.data || [];
                    }
                });
        },
        handleChange(direction) {
            let len = this.prizeInfo.length;

            if (direction == "left") {
                if (this.cLeftDisabled) return;

                if (this.index == 0 || this.index < 3) {
                    this.diatance += 88;
                } else {
                    this.index -= 3;
                    this.distance += 264;
                }
            } else {
                if (this.cRightDisabled) return;
                this.index += 3;
                len - this.index >= 3
                    ? (this.distance += -264)
                    : (this.distance += -(len % 3) * 88);
            }
        },
    },
    created() {
        this.fetchprizeInfo();
    },
};
</script>

<style lang="scss">
@import "./Prize.scss";
</style>
