<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:10:29
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-08-26 19:35:44
 * @Description  : 模块
 * @FilePath     : \lottery\src\components\module.vue
-->
<template>
  <div class="module">
    <div class="module__title">
      <span class="text is-flex is-middle">{{ title }}</span>
    </div>
    <div class="module__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Module",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.module__title {
  margin-bottom: 2em;
  .text {
    &::before {
      content: "";
      display: inline-block;
      border-radius: 8px;
      width: 10px;
      height: 1em;
      margin-right: 10px;
      background-color: #e37815;
    }
  }
}
.module__body {
  margin-bottom: 2em;
}
</style>
