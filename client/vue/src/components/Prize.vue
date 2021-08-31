<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:36:18
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-26 19:38:39
 * @Description  : 奖品
 * @FilePath     : \lottery\src\components\Prize.vue
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
          v-for="item in priceInfo"
          :key="item.recordId"
          v-bind="item"
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
import img1 from "@/assets/img/assets_1.png";
import img2 from "@/assets/img/assets_2.png";
import img3 from "@/assets/img/assets_3.png";
import LotteryItem from "@/components/LotteryItem";

export default {
  name: "Prize",
  components: {
    LotteryItem,
  },
  data() {
    return {
      right_disabled: false, //左侧按钮禁用
      left_disabled: false, //右侧按钮禁用
      index: 0,
      distance: 0, //滑动距离
      priceInfo: [], //中奖列表
    };
  },
  computed: {
    cLeftDisabled() {
      return this.index == 0 || this.index < 3 ? true : false;
    },
    cRightDisabled() {
      return this.priceInfo.length - this.index >= 3 ? false : true;
    },
  },
  methods: {
    fetchPriceInfo() {
      this.priceInfo = [
        {
          image: img1,
          name: "杯子",
          recordId: 1,
        },
        {
          image: img2,
          name: "switch",
          recordId: 2,
        },
        {
          image: img3,
          name: "t恤",
          recordId: 3,
        },
        {
          image: img1,
          name: "杯子",
          recordId: 4,
        },
        {
          image: img2,
          name: "switch",
          recordId: 5,
        },
        {
          image: img3,
          name: "t恤",
          recordId: 6,
        },
        {
          image: img1,
          name: "杯子",
          recordId: 7,
        },
        {
          iamge: img2,
          name: "switch",
          recordId: 8,
        },
        {
          image: img3,
          name: "t恤",
          recordId: 9,
        },
        {
          src: img3,
          name: "t恤",
          recordId: 10,
        },
      ];
    },
    handleChange(direction) {
      let len = this.priceInfo.length;

      if (direction == "left") {
        if (this.cLeftDisabled) return;

        if (this.index == 0 || this.index < 3) {
          this.diatance += this.index * 88;
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
    this.fetchPriceInfo();
  },
};
</script>

<style lang="scss">
.prize {
  margin-right: 1em;
  background: rgba(255, 247, 232, 0.3);
  display: flex;
  .btn {
    position: relative;
    display: inline-block;
  }
  .btn-left {
    margin-right: 48px;
    .icon:before,
    .icon:after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border: 7px solid transparent;
      border-right-color: #737c8c;
      position: absolute;
      left: 7px;
      top: 33px;
      overflow: hidden;
    }
    .icon:after {
      border-right-color: #fff;
      left: 9px;
    }
  }
  .btn-right {
    margin-right: 48px;
    .icon:before,
    .icon:after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border: 7px solid transparent;
      border-left-color: #737c8c;
      position: absolute;
      left: 22px;
      top: 33px;
      overflow: hidden;
    }
    .icon:after {
      border-left-color: #fff;
      left: 20px;
    }
  }
  .is_active {
    cursor: not-allowed;
  }

  .content {
    display: flex;
    width: 250px;
    overflow: hidden;
    .content_inner {
      display: flex;
      transition: transform 0.5s;
    }
    .content-item {
      margin-right: 12px;
    }
  }
}
</style>
