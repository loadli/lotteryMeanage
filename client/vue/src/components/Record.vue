<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:33:25
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 17:25:37
 * @Description  : 抽奖纪录
 * @FilePath     : \lotteryMeanage\client\vue\src\components\Record.vue
-->
<template>
    <div class="record">
        <ul class="record_inner" v-if="recordList.length">
            <template v-for="item in recordList">
                <li :key="item._id" class="record-item">
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
            </template>
            <!-- <template v-for="item in recordList">
                <li :key="item._id + '_2'" class="record-item">
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
            </template> -->
        </ul>
        <div class="no_data_tip" v-else>暂无内容</div>
    </div>
</template>

<script>
import { eventBus } from "../main";
import Api from "@/common/api.js";
export default {
    name: "Record",
    data() {
        return {
            recordList: [], //抽奖记录列表
        };
    },
    methods: {
        //获取奖品记录
        fetchRecordList() {
            let userId = localStorage.getItem("userId");
            Api.getRecordList({ userId }).then((res) => {
                this.recordList = res.data || [];
            });
        },
    },

    created() {
        this.fetchRecordList();
        eventBus.$on("refresh", () => {
            this.fetchRecordList();
        });
    },
};
</script>

<style lang="scss">
@import "./Record.scss";
</style>
