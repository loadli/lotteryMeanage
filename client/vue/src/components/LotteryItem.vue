<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:21:15
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-26 19:31:34
 * @Description  : 
 * @FilePath     : \lottery\src\components\lotteryItem.vue
-->
<template>
  <div class="lottery_item">
    <img :src="image" />
    <span class="text" :title="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: "LotteryItem",
  props: {
    image: String,
    name: String,
    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss">
.lottery_item {
  width: 76px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 64px;
    height: 64px;
    padding: 10px;
    box-sizing: border-box;
  }

  .text {font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #d25f00;
    max-width: 100%;
    white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
  }
}
</style>
