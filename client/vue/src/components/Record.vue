<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:33:25
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-26 19:34:46
 * @Description  : 抽奖纪录
 * @FilePath     : \lottery\src\components\Record.vue
-->
<template>
  <div class="record">
    <ul
      class="record_inner"
      :style="{ transform: 'translateY(' + distance + 'px)' }"
    >
      <li v-for="item in recordList" :key="item.recordId" class="record-item">
        <span
          >🎉 恭喜 <i>user</i> 抽中 <span>{{ item.name }}</span>
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
      distance: 0,
      recordList: [],
    };
  },
  methods: {
    fetchRecordList() {
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
    startScroll() {
      if (this.recordList.length <= 8) return;
      this.timer = setInterval(() => {
        this.distance += -3;
        if (this.distance % 30 == 0) {
          this.index++;
        }
        if (this.recordList.length - this.index < 10) {
          clearInterval(this.timer);
        }
      }, 100);
    },
  },

  created() {
    this.fetchRecordList();
    this.startScroll();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss">
.record {
  height: 250px;
  overflow: hidden;
  .record_inner {
    // animation: 10s rowup linear infinite normal;
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
