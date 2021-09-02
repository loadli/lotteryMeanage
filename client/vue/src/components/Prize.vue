<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:36:18
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-02 10:02:41
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
          v-for="(item,index) in priceInfo"
          :key="index"
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
  props: {
    isRefresh: Boolean

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
  watch: {
    isRefresh(val){
      if(val){
        this.fetchPriceInfo();
      }

    }

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
        this.$axios.post("api/user/my", 
          {userId: "612b6d0129e75c0238ab1651"}
        ).then((res= {})=> {
          console.log(11,res);
          if(res.data.code ==200) {
            this.priceInfo = res.data.data||[]
          }

        })
    },
    handleChange(direction) {
      let len = this.priceInfo.length;

      if (direction == "left") {
        if (this.cLeftDisabled) return;

        if (this.index == 0 || this.index < 3) {
          this.diatance +=  88;
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
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  
  .btn {
    position: relative;
    display: inline-block;
    cursor: pointer;
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
      border-right-color: #fff;
      position: absolute;
      left: 7px;
      top: 50px;
      overflow: hidden;
    }
    .icon:after {
      border-right-color: #3D83E9;
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
      border-left-color: #fff;
      position: absolute;
      left: 22px;
      top: 50px;
      overflow: hidden;
    }
    .icon:after {
      border-left-color: #3D83E9;
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
