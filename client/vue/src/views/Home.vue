<template>
  <div class="home">
    <div class="container_left">
      <Module title="幸运抽奖">
        <Lottery />
      </Module>
    </div>

    <div class="container-right">
      <Module title="我的奖品">
        <Prize />
      </Module>

      <Module title="抽奖纪录">
        <Record />
      </Module>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Module from "@/components/Module.vue";
import Lottery from "@/components/Lottery.vue";
import Record from "@/components/Record.vue";
import Prize from "@/components/Prize.vue";
export default {
  name: "Home",
  components: {
    Module,
    Lottery,
    Record,
    Prize,
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 24px 48px;
  display: flex;
  justify-content: center;
  .container_left {
    width: 486px;
    margin-right: 32px;
  }
  .container_right {
  }
}
</style>
