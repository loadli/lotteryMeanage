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
            
        }
    },
    created() {
        let user_info = localStorage.getItem('user_info')
        if(!user_info) {
            this.createUser()
        }
        console.log(user_info)
    },
    methods: {
        // 创建用户
        createUser() {
            this.$axios.get('/user/create').then(res => {
                console.log(res)
            })
        }
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
