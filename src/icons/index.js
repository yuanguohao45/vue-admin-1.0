import Vue from "vue";
import SvgIcon from "./SvgIcon.vue";
Vue.component("svg-icon", SvgIcon);
/**
 * require.context 读取目录文件
 * 第一个：目录
 * 第二个：是否遍历子目录
 * 第三个：定义遍历文件规则
 */
const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);
