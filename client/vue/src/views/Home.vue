<!--
 * @Author: your name
 * @Date: 2021-09-04 13:06:59
 * @LastEditTime: 2021-09-04 15:39:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \lotteryMeanage\client\vue\src\views\Home.vue
-->
<template>
    <div class="home is-flex is-column is-middle">
        <div class="home__title">
            <img
                draggable="false"
                width="400"
                src="@/assets/img/title.png"
                alt=""
            />
        </div>
        <div class="home__container is-flex">
            <div class="container_left">
                <Module title="幸运抽奖">
                    <Lottery  />
                </Module>
            </div>

            <div class="container-right">
                <Module title="我的待收货奖品">
                    <Prize  />
                </Module>

                <Module title="抽奖纪录">
                    <Record  />
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
            lotteryList: [],
            isRefresh: false,
        };
    },
    async created() {
        let userId = await this.getUserInfo();
        this.userId = userId;
    },
    methods: {
        // 获取用户信息
        async getUserInfo() {
            let userId = localStorage.getItem("userId");
            if (!userId) {
                userId = await this.createUser();
                location.reload();
            }
            return userId;
        },
        // 创建用户
        createUser() {
            return new Promise((resolve) => {
                this.$axios.get("/api/user/create").then((res) => {
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
@import "./Home.scss";
</style>
