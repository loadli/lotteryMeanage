<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:33:25
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-03 13:45:21
 * @Description  : 抽奖纪录
 * @FilePath     : \lotteryMeanage\client\vue\src\components\Record.vue
-->
<template>
    <div class="record">
        <ul class="record_inner">
            <li
                v-for="item in recordList"
                :key="item.recordId"
                class="record-item"
            >
                <span
                    >🎉 恭喜抽中 <span>{{ item.prizeName }}</span>
                </span>
                <span>{{
                    new Date(item.datetime)
                        .toLocaleDateString()
                        .replace(/\//g, "-") +
                    " " +
                    new Date(item.datetime).toTimeString().substr(0, 8)
                }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Record",
    props: {
        isRefresh: Boolean,
    },
    data() {
        return {
            index: 0,
            timer: null,
            recordList: [],
        };
    },
    watch: {
        isRefresh(val) {
            if (val) {
                this.fetchRecordList();
            }
        },
    },
    methods: {
        fetchRecordList() {
            let userId = localStorage.getItem("userId");
            return new Promise(() => {
                this.$axios
                    .post("/api/user/history", { userId: userId })
                    .then((res = {}) => {
                        console.log(res);
                        if (res.data.code == 200) {
                            this.recordList = res.data.data || [];
                        }
                    });
            });
        },
    },

    created() {
        this.fetchRecordList();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
};
</script>

<style lang="scss">
@import "./Record.scss";
</style>
