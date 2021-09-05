/*
 * @Author       : xiaolin
 * @Date         : 2021-09-05 14:53:20
 * @LastEditors  : xiaolin
 * @LastEditTime : 2021-09-05 18:39:09
 * @Description  : 轮盘动画相关
 * @FilePath     : \lotteryMeanage\client\vue\src\components\Lottery.js
 */

// data部分
const animationOptions = {
    defaultOption: {
        startIndex : 1,      // 初始位置
        pits       : 8,      // 格子数
        interval   : 100,    // 初始间隔
        rate       : 2.5,    // 系数
        cycle      : 1,      // 转动基本次数：即至少需要转动多少次再进入抽奖环节
        getInterval: null,   // 自定义旋转间隔函数
    },
    options: {
        startIndex: 1,     // 初始位置
        pits      : 8,     // 格子数
        interval  : 100,   // 初始间隔
        rate      : 5,     // 系数
        cycle     : 2,     // 转动基本次数：即至少需要转动多少次再进入抽奖环节
    },
    ticketId       : null,    // 定时器ID
    prizeIndexes   : null,    // 奖项
    times          : 0,       // 转动次数
    index          : 1,       // 当前位置
    animatingResult: false,   //  模拟结束
    cycle          : 2,       // 实际的转动基本次数
    processing     : false,   // 进行中
    lastTime       : null,    // 上次转动时间
    interval       : 100,
    orderList      : [0, 7, 6, 1, -1, 5, 2, 3, 4],
};

// methods部分
const animationMethods = {
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
                this.fetchOreNumber(this.userId);
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
}

export { animationOptions,animationMethods }
