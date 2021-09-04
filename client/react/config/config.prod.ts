/*
 * @Author: xiaorui
 * @Date: 2021-09-05 00:51:49
 * @LastEditors: xiaorui
 * @LastEditTime: 2021-09-05 00:55:38
 * @Description: 打包相关配置
 * @FilePath: /lotteryMeanage/client/react/config/config.prod.ts
 */
// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  extraBabelPlugins: ['babel-plugin-transform-remove-console'],
});
