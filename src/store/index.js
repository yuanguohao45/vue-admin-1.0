import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./modules/app";
import login from "./modules/login";
import code from "./modules/code";

export default new Vuex.Store({
  modules: {
    app,
    login,
    code
  }
});
