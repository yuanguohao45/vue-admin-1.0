import { Login, Register } from "@/api/login";

// import Cookie from "cookie_js";
// set 、get 、removue ----携带请求头 cookie 业务需求
// sessionStorage --- 5M/客户端/限字符串类型
// localStorage --- 较长时间/小的交互
// setItem 、getItem 、removueItem、clear

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
  // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false
};

const getters = {};

// 必须的 同步 不需要回调
const mutations = {
  SET_ISCOLLAPSE(state, value) {
    state.isCollapse = !state.isCollapse;
    // sessionStorage----localStorage
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
  }
};

const actions = {
  // state, getters, commit, dispatch, rootGetters, rootState
  setMenuStatus({ state, getters, commit, dispatch }, data) {
    // commit("SET_ISCOLLAPSE");
  },
  login(content, data) {
    return new Promise((resolve, reject) => {
      let btnMethod = data.model === "login" ? Login : Register;
      btnMethod(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
