<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:33:25
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-31 23:47:57
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
                    >🎉 恭喜抽中 <span>{{ item.name }}</span>
                </span>
                <span>{{ item.date }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Record",
    data() {
        return {
            index: 0,
            timer: null,
            recordList: [],
        };
    },
    methods: {
    fetchRecordList() {

      return new Promise((resolve, reject) => {
        this.$axios.post("api/user/history", 
          {userId: "612b6d0129e75c0238ab1651"}
        ).then((res = {}) => {
            console.log(res)
          if(res.data.code == 200) {
            this.recordList = res.data.data || [];
          }
        });
      });





            this.recordList = [
                {
                    name: "矿石1",
                    recordId: 1,
                    date: "2021-8-29",
                },
                {
                    name: "矿石",
                    recordId: 2,
                    date: "2021-8-29",
                },
                {
                    name: "矿石",
                    recordId: 3,
                    date: "2021-8-29",
                },
                {
                    name: "矿石",
                    recordId: 4,
                    date: "2021-8-29",
                },
                {
                    name: "矿石",
                    recordId: 5,
                    date: "2021-8-29",
                },
                {
                    name: "矿石",
                    recordId: 6,
                    date: "2021-8-29",
                },
                {
                    name: "矿石",
                    recordId: 7,
                    date: "2021-8-29",
                },
                {
                    name: "矿石",
                    recordId: 8,
                    date: "2021-8-29",
                },
                {
                    name: "矿石",
                    recordId: 9,
                    date: "2021-8-29",
                },
                {
                    name: "矿石",
                    recordId: 10,
                    date: "2021-8-29",
                },
                {
                    name: "矿石",
                    recordId: 11,
                    date: "2021-8-29",
                },
                {
                    name: "矿石2",
                    recordId: 12,
                    date: "2021-8-29",
                },
            ];

            // this.recordList =this.recordList.concat(this.recordList)
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
.record {
    height: 250px;
    overflow: auto;
    .record_inner {
        position: relative;
    }
    .record-item {
        width: 320px;
        display: flex;
        justify-content: space-between;
        line-height: 32px;
    }
}
</style>
