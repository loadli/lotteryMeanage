/*
 * @Author: your name
 * @Date: 2021-09-04 16:04:03
 * @LastEditTime: 2021-09-04 17:58:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lotteryMeanage\client\vue\src\common\api.js
 */
import { $$axios } from "./utils.js"
export default ({
  //获取奖品记录
  getRecordList(options) {
    return $$axios({
      url: "history",
      data: { userId: options.userId || "" }
    })
  },

  //获取待发货记录
  getPrizeList(options) {
    return $$axios({
      url: "history",
      data: { userId: options.userId || "" }
    })

  }


})

