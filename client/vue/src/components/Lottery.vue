<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:21:01
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-26 19:31:38
 * @Description  : 抽奖
 * @FilePath     : \lottery\src\components\lottery.vue
-->
<template>
  <div>
    <div class="header">当前矿石数：</div>
    <div class="lottery">
      <div class="turntable-box">
        <!-- <div class="top-border"></div>
        <div class="bottom-border"></div>
        <div class="left-border"></div>
        <div class="right-border"></div> -->

        <div class="blocks">
          <div class="item-container">
            <div
              v-for="item in lotteryList"
              :class="[
                'turntable-item item',
                index === item.order ? 'chosen' : '',
              ]"
              :key="item.id"
            >
              <template v-if="item.id < 0">
                <div class="lottery-btn" @click="handleLottery">
                  <div class="lottery-text">抽奖</div>
                  <div class="text">200矿石/次</div>
                </div>
              </template>
              <template v-else>
                <div class="">
                  <LotteryItem
                    :image="item.image"
                    :name="item.name"
                  ></LotteryItem>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Dialog
      :visible.sync="dialog.flag"
      v-if="dialog.flag"
      @closeDialog="closeDialog"
    ></Dialog>
  </div>
</template>

<script>
import LotteryItem from "@/components/LotteryItem.vue";
import Dialog from "@/components/Dialog.vue";
export default {
  name: "Lottery",
  components: {
    LotteryItem,
    Dialog,
  },
  data() {
    return {
      dialog: {
        flag: false,
      },
      lotteryList: [
        { id: 1, name: "奖品1", order: 0 },
        { id: 2, name: "奖品2", order: 7 },
        { id: 3, name: "奖品3", order: 6 },
        { id: 4, name: "奖品4", order: 1 },
        { id: -1, name: "点击抽奖", order: -1 },
        { id: 5, name: "奖品5", order: 5 },
        { id: 6, name: "奖品6", order: 2 },
        { id: 7, name: "奖品7", order: 3 },
        { id: 8, name: "奖品8", order: 4 },
      ],
      defaultOption: {
        startIndex: 1, // 初始位置
        pits: 8, // 格子数
        interval: 100, // 初始间隔
        rate: 2.5, // 系数
        cycle: 2.5, //转动基本次数：即至少需要转动多少次再进入抽奖环节
        getInterval: null, // 自定义旋转间隔函数
      },
      options: {
        startIndex: 1, // 初始位置
        pits: 8, // 格子数
        interval: 100, // 初始间隔
        rate: 5, // 系数
        cycle: 4, //转动基本次数：即至少需要转动多少次再进入抽奖环节
      },
      ticketId: null, // 定时器ID
      prizeIndexes: null, // 奖项
      times: 0, // 转动次数
      index: 1, // 当前位置
      animatingResult: false, //  模拟结束
      cycle: 4, // 实际的转动基本次数
      processing: false, // 进行中
      lastTime: null, // 上次转动时间
      interval: 100,

      lotteryResult: null, // 结果
    };
  },

  methods: {
    closeDialog(cb) {
      this.initLottery(this.options);
      if (cb === "again") {
        this.handleLottery();
      }
    },
    handleLottery() {
      this.start();
      this.getResult();
    },
    getResult() {
      // 模拟获取抽奖结果

      setTimeout(() => {
        let random = Math.floor(Math.random() * 7) + 1;
        console.log(random);
        let res = this.lotteryList.find((item) => item.id === random);
        this.lotteryResult = res;
        this.setPrize([res.order]);
      }, 2000);
    },

    // 初始化轮盘
    initLottery(options) {
      this.originOptions = options;
      this.options = Object.assign({}, this.defaultOption, options);

      // 定时器Id
      this.ticketId = null;
      // 奖项
      this.prizeIndexes = null;
      // 转动次数
      this.times = 0;
      // 当前位置
      this.index = 0;
      // 模拟结果
      this.animatingResult = false;
      // 实际的转动基本次数, 大于开始中奖
      this.cycle = this.options.cycle;
      // 进行中
      this.processing = false;
      // 上次转动时间
      this.lastTime = null;
    },

    // 开始转动
    start() {
      if (this.processing) {
        return;
      }
      this.processing = true;
      // 增加随机数
      this.cycle = this.options.cycle + Math.floor(Math.random() * 10);

      this.lastTime = Date.now();
      let that = this;
      this.innerStart(function (next) {
        if (that.animatingResult) {
          that.times++;
        }
        that.index = (that.index + 1) % that.options.pits;

        let continu = that.judge();
        if (!continu) {
          that.stop();
          // 停止转动，弹出中奖弹窗
          that.dialog.flag = true;
          return;
        }

        // that.printInfo();
        next();
      });
    },
    innerStart(cb) {
      var that = this;
      var next = function () {
        that.next(function () {
          cb && cb(next);
        });
      };
      next();
    },
    next(cb) {
      let interval = this.getInterval();
      console.log("interval:", interval, this.times);
      this.ticketId = setTimeout(cb, interval);
    },
    getInterval() {
      let interval = this.interval;
      if (!this.times) {
        // 未出结果 加速动画效果
        interval =
          this.interval > 20 ? (this.interval -= this.options.rate) : 20;
      } else {
        // TODO 减速动画效果待优化
        interval =
          this.options.interval * Math.pow(this.options.rate, this.times / 10);
      }
      this.interval = interval > 900 ? 900 : Math.floor(interval);
      return this.interval;
    },
    judge() {
      let cycle = this.cycle;
      let times = this.times;

      // 到达旋转次数
      if (times > cycle) {
        // 没有设置奖项
        if (!Array.isArray(this.prizeIndexes)) {
          return false;
        }

        if (this.prizeIndexes.includes(this.index)) {
          console.log("End", this.prizeIndexes, this.index);
          return false;
        }
      }
      return true;
    },
    stop() {
      this.clearJob();
      this.animatingResult = false;
      this.ticketId = null;
      this.prizeIndexes = null;
      this.times = 0;
      this.processing = false;
      this.interval = this.options.interval;
      console.log(this.options.interval);
    },
    setPrize(prizeIndexes) {
      if (this.animatingResult) {
        return;
      }
      this.prizeIndexes = prizeIndexes;
      // 设置值后, 开始模拟中奖
      this.animatingResult = true;
    },
    printInfo() {
      var now = Date.now();
      console.log(
        "index:",
        this.index,
        "times:",
        this.times,
        "cycle:",
        this.cycle,
        "interval:",
        now - this.lastTime
      );
      this.lastTime = now;
    },

    clearJob() {
      clearTimeout(this.ticketId);
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
}
.lottery {
  width: 486px;
  height: 396px;
  .turntable-box {
    background: #fadd95;
    box-shadow: inset 0 0 16px #ff9a2e;
    border-radius: 12px;
    box-sizing: border-box;
    position: relative;
    padding: 24px;
    width: 100%;
    height: 100%;

    .blocks {
      width: 100%;
      height: 100%;
      .item-container {
        width: 100%;
        height: 100%;
        background: #e37815;
        border-radius: 8px;
        padding: 16px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-direction: column;
        align-content: space-between;
        .turntable-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fdf3f3;
          border-radius: 4px;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .item {
          width: calc(33.33333% - 5.33333px);
          height: calc(33.33333% - 5.33333px);
        }

        .lottery-btn {
          cursor: pointer;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .lottery-text {
            font-size: 32px;
            line-height: 42px;
            font-weight: 600;
            color: #a74b00;
          }
          .text {
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            color: #d25f00;
            max-width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .chosen {
          background: #ffcf8b;
        }
      }
    }
  }
}
</style>
