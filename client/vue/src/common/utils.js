/*
 * @Author: mujiao
 * @Date: 2021-09-04 15:57:14
 * @LastEditTime : 2021-09-05 11:11:50
 * @LastEditors  : xiaolin
 * @Description: In User Settings Edit
 * @FilePath     : \lotteryMeanage\client\vue\src\common\utils.js
 */

import axios from "axios";
function $$axios(options) {
    let promise,
        me = this;
    console.log(this);
    promise = new Promise((resolve, reject) => {
        let url = `/api/${options.url.replace(/^\//, "")}`;
        let method = options?.method || "post";

        axios({
            url: url,
            method: method,
            data: options.data,
        }).then(
            (res) => {
                let data = res.data;
                console.log(res);
                if (res.data.code == 200 && res.status == 200) {
                    resolve(data);
                } else {
                    reject(res.statusText);
                }
            },
            (err) => {
                reject(err);
            }
        );
    });
    return promise;
}
export { $$axios };
export default { $$axios };
