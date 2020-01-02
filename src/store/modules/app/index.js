import { Login, Register } from "@/api/login";
import {
  setToken,
  setUserName,
  getToken,
  getUserName,
  removeToKen,
  removeUserName
} from "@/utils/app";

// import Cookie from "cookie_js";
// set 、get 、removue ----携带请求头 cookie 业务需求
// sessionStorage --- 5M/客户端/限字符串类型
// localStorage --- 较长时间/小的交互
// setItem 、getItem 、removueItem、clear

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false
  token: getToken() || "",
  userName: getUserName() || ""
};

const getters = {
  isCollapse: state => state.isCollapse,
  token: state => state.token,
  userName: state => state.userName
};

// 必须的 同步 不需要回调
const mutations = {
  SET_ISCOLLAPSE(state, value) {
    state.isCollapse = !state.isCollapse;
    // sessionStorage----localStorage
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USERNAME(state, value) {
    state.userName = value;
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
          let json = res.data;
          content.commit("SET_TOKEN", json.token);
          content.commit("SET_USERNAME", json.username);
          setToken(json.token);
          setUserName(json.username);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  exit({ commit }) {
    return new Promise((resolve, reject) => {
      removeToKen();
      removeUserName();
      commit("SET_TOKEN", "");
      commit("SET_USERNAME", "");
      resolve();
    });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
