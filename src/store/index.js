import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false
  },
  getters: {},
  mutations: {
    SET_ISCOLLAPSE(state, value) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {},
  modules: {}
});
