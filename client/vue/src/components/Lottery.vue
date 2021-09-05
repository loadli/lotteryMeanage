<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:21:01
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 16:21:58
 * @Description  : 抽奖
 * @FilePath     : \lotteryMeanage\client\vue\src\components\Lottery.vue
-->
<template>
    <div>
        <div class="header">当前矿石数：{{ oreNumber }}</div>
        <div class="lottery">
            <div class="turntable-box">
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
                                        color="#e37815"
                                    ></LotteryItem>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Dialog
            :title="dialog.title"
            :buttonText="dialog.isEntity ? '提交' : '再来一次'"
            :visible.sync="dialog.flag"
            v-if="dialog.flag"
            @close="closeDialog"
            @submit="dialog.isEntity ? submitAddress() : submitAgain()"
            :prizeInfo="dialog.prizeInfo"
        >
            <!-- 实物奖 -->
            <template v-if="dialog.isEntity">
                <Address v-model="dialog.addressInfo">
                    <Normal
                        :title="dialog.prizeInfo.name"
                        :image="dialog.prizeInfo.image"
                    />
                </Address>
            </template>
            <!-- 虚拟奖 -->
            <template v-else>
                <Normal
                    :title="dialog.prizeInfo.title"
                    :image="dialog.prizeInfo.image"
                    :desc="dialog.prizeInfo.desc"
                />
            </template>
        </Dialog>
    </div>
</template>

<script>
import LotteryItem from "@/components/LotteryItem.vue";
import Dialog from "@/components/Dialog.vue";
import Address from "@/components/Address.vue";
import Normal from "@/components/Normal.vue";
import { eventBus } from "../main";
import Api from "@/common/api.js";
import { animationOptions, animationMethods } from "@/components/Lottery.js";

export default {
    name: "Lottery",
    components: {
        LotteryItem,
        Dialog,
        Address,
        Normal,
    },
    data() {
        return {
            userId: null,
            ID_66ORE: "612b6b9a6315d10255d12b86",
            ID_BUG: "612b77fd29e75c0238ab1679",
            dialog: {
                flag: false,
                isEntity: true, // true 实物；false 虚拟
                addressInfo: {
                    name: "",
                    phone: "",
                    address: "",
                },
                prizeInfo: {
                    _id: "",
                    image: "",
                    name: "",
                },
            },
            lotteryList: [],
            lotteryResult: null, // 结果
            oreNumber: 0, // 剩余矿石数量
            oreUse: 9999, // 单次使用矿石
            // 引入动画参数
            ...animationOptions,
        };
    },
    computed: {},
    async created() {
        this.fetchLotteryList();
        let userId = localStorage.getItem("userId");
        this.userId = userId;
        this.fetchOreNumber(userId);
        this.fetchOreUse();
    },
    methods: {
        // 请求矿石数量
        fetchOreNumber(userId) {
            Api.getOreNumber({ userId }).then((res) => {
                this.oreNumber = res.data.number;
            });
        },
        // 请求矿石使用
        fetchOreUse() {
            Api.getOreUseNumber().then((res) => {
                this.oreUse = res.data.oreUse;
            });
        },
        // 获取奖品列表
        fetchLotteryList() {
            Api.getLotteryList().then((res) => {
                let arr =
                    res.data.length >= 8 ? res.data.slice(0, 8) : res.data;
                // if (!arr) {
                //   alert("奖品数量不足，请联系管理员添加奖品");
                //   return;
                // }
                arr.splice(4, 0, { id: -1, name: "点击抽奖", order: -1 });
                arr.forEach((item, index) => {
                    item.order = this.orderList[index];
                });
                this.lotteryList = arr;
            });
        },
        closeDialog() {
            this.dialog.flag = false;
            this.initLottery(this.options);
        },
        // 再来一次
        submitAgain() {
            this.closeDialog();
            this.handleLottery();
        },
        // 提交地址
        submitAddress() {
            let { name, phone, address } = this.dialog.addressInfo;
            let userId = localStorage.getItem("userId");
            let prizeId = this.lotteryResult._id;
            const params = {
                name,
                phone,
                address,
                userId,
                prizeId,
            };

            Api.submitAddress(params)
                .then((res) => {
                    alert("添加收货地址成功");
                    this.dialog.flag = false;
                    //抽一次，刷新奖品数据
                    this.$emit("refresh");
                    eventBus.$emit("refresh");
                })
                .catch((err) => {
                    alert("出问题了呢，要不咱下次再送？😜");
                });
        },
        handleLottery() {
            // 模拟获取抽奖结果
            let userId = localStorage.getItem("userId");
            if (!userId) {
                alert("未获取到用户信息");
                return;
            }
            this.fetchOreNumber(userId);
            this.fetchOreUse();
            if (this.oreNumber < this.oreUse) {
                alert("矿石不足");
                return;
            }
            this.start();
            this.getResult(userId);
        },
        async getResult(userId) {
            setTimeout(async () => {
                let lotteryResult = await this.fetchLotteryResult(userId);
                let res = this.lotteryList.find(
                    (item) => item._id === lotteryResult._id
                );
                this.lotteryResult = res;
                this.setPrize([res.order]);
                //抽一次，刷新奖品数据
                this.$emit("refresh");
                eventBus.$emit("refresh");
            }, 2000);
        },

        // 获取抽奖结果
        fetchLotteryResult(userId) {
            return new Promise((resolve) => {
                Api.lotteryResult({ userId })
                    .then((res) => {
                        resolve(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                        this.stop();
                    });
            });
        },
        // 打开弹窗
        showDialog() {
            let lotteryResult = { ...this.lotteryResult };
            this.dialog.title = "恭喜中奖";
            lotteryResult.title = `恭喜获得${lotteryResult.name}`;
            if (lotteryResult._id === this.ID_66ORE) {
                lotteryResult.desc = "本次抽中的矿石已累加到你的当前矿石数中";
            } else if (lotteryResult._id === this.ID_BUG) {
                lotteryResult.desc =
                    "恭喜你抽中了一个bug，请保留好，敬请期待妙用";
                lotteryResult.title = "触发彩蛋";
                this.dialog.title = "触发彩蛋";
            }
            // 01 虚拟物品  02  真实物品
            this.dialog.isEntity = lotteryResult.type == "01" ? false : true;
            this.dialog.prizeInfo = lotteryResult;
            setTimeout(() => {
                this.dialog.flag = true;
            }, 800);
        },
        // 引入动画方法
        ...animationMethods,
    },
};
</script>

<style lang="scss" scoped>
@import "./Lottery.scss";
</style>
