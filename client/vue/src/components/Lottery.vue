<!--
 * @Author       : xiaolin
 * @Date         : 2021-08-26 19:21:01
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-03 11:06:52
 * @Description  : 抽奖
 * @FilePath     : \lotteryMeanage\client\vue\src\components\Lottery.vue
-->
<template>
    <div>
        <div class="header">当前矿石数：{{ oreNumber }}</div>
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
            // lotteryList: [
            //   { id: 1, name: "奖品1", order: 0 },
            //   { id: 2, name: "奖品2", order: 7 },
            //   { id: 3, name: "奖品3", order: 6 },
            //   { id: 4, name: "奖品4", order: 1 },
            //   { id: -1, name: "点击抽奖", order: -1 },
            //   { id: 5, name: "奖品5", order: 5 },
            //   { id: 6, name: "奖品6", order: 2 },
            //   { id: 7, name: "奖品7", order: 3 },
            //   { id: 8, name: "奖品8", order: 4 },
            // ],
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

            orderList: [0, 7, 6, 1, -1, 5, 2, 3, 4],
            oreNumber: 0, // 剩余矿石数量
        };
    },
    computed: {},
    async created() {
        this.getLotteryList();
        let userId = localStorage.getItem("userId");
        this.userId = userId;
        this.getOreNumber(userId);
    },
    methods: {
        // 请求矿石数量
        getOreNumber(userId) {
            this.$axios
                .post("api/user/ore", {
                    userId,
                })
                .then((res) => {
                    this.oreNumber = res.data.data.number;
                });
        },
        // 获取奖品列表
        getLotteryList() {
            this.$axios.get("api/user/lotteryList").then((res) => {
                if (res.data.code == 200) {
                    let arr =
                        res.data.data.length >= 8
                            ? res.data.data.slice(0, 8)
                            : res.data.data;
                    // if (!arr) {
                    //   alert("奖品数量不足，请联系管理员添加奖品");
                    //   return;
                    // }
                    arr.splice(4, 0, { id: -1, name: "点击抽奖", order: -1 });
                    arr.forEach((item, index) => {
                        item.order = this.orderList[index];
                    });
                    this.lotteryList = arr;
                }
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
            let prizeId = this.lotteryResult.prizeId;
            let data = {
                name,
                phone,
                address,
                userId,
                prizeId,
            };
            this.$axios.post("api/user/address", data).then((res) => {
                if (res.data.code == 200) {
                    alert("添加收货地址成功");
                    this.dialog.flag = false;
                }
            });
        },
        handleLottery() {
            // 模拟获取抽奖结果
            let userId = localStorage.getItem("userId");
            if (!userId) {
                alert("未获取到用户信息");
                return;
            }
            this.start();
            this.getResult(userId);
        },
        async getResult(userId) {
            setTimeout(async () => {
                let lotteryResult = await this.getLotteryResult(userId);
                let res = this.lotteryList.find(
                    (item) => item._id === lotteryResult._id
                );
                this.lotteryResult = res;
                this.setPrize([res.order]);
                //抽一次，刷新奖品数据
                this.$emit("refresh");
            }, 2000);
        },

        // 获取抽奖结果
        getLotteryResult(userId) {
            return new Promise((resolve) => {
                this.$axios
                    .post("/api/user/lottery", {
                        userId,
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            resolve(res.data.data);
                        }
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
            if (lotteryResult._id === "612b6b9a6315d10255d12b86") {
                lotteryResult.desc = "本次抽中的矿石已累加到你的当前矿石数中";
            } else if (lotteryResult._id == "612b77fd29e75c0238ab1679") {
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
            this.ticketId = setTimeout(cb, interval);
        },
        getInterval() {
            let interval = this.interval;
            if (!this.times) {
                // 未出结果 加速动画效果
                interval =
                    this.interval > 20
                        ? (this.interval -= this.options.rate)
                        : 20;
            } else {
                // TODO 减速动画效果待优化
                interval =
                    this.options.interval *
                    Math.pow(this.options.rate, this.times / 10);
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
                    this.showDialog();
                    this.getOreNumber(this.userId);
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
            // console.log(this.options.interval);
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
@import "./Lottery.scss";
</style>
