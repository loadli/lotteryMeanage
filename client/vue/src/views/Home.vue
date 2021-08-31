<template>
  <div class="home is-flex is-column is-middle">
    <div class="home__title">
      <img draggable="false" width="400" src="@/assets/img/title.png" alt="" />
    </div>
    <div class="home__container is-flex">
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
  data() {
    return {
      userId: null,
    };
  },
  async created() {
    let userId = await this.getUserInfo();
    this.userId = userId;
    this.getOreNumber(userId);
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      let userId = localStorage.getItem("userId");
      if (!userId) {
        userId = await this.createUser();
      }
      return userId;
    },
    // 请求矿石数量
    getOreNumber(userId) {
      if (!userId) {
        alert("未找到用户");
      }
      return new Promise((resolve, reject) => {
        this.$axios
          .post("api/user/ore", {
            userId,
          })
          .then((res) => {
            console.log(res);
          });
      });
    },
    // 创建用户
    createUser() {
      return new Promise((resolve, reject) => {
        this.$axios.get("api/user/create").then((res) => {
          let { data } = res;
          if (data.code == 200) {
            localStorage.setItem("userId", data.data.id);
            resolve(data.data.id);
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
.home {
  height: 100vh;
  background-color: #4976e7;
  background-repeat: no-repeat;
  background-image: url("../assets/img/background.png");
  background-position: top;
  background-size: cover;
  position: relative;
  color: white;

  &__title {
    padding: 2em;
    margin-bottom: 2em;
  }

  .container_left {
    width: 486px;
    margin-right: 32px;
  }
  .container_right {
  }
}
</style>
