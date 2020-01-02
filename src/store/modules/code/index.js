import { getCategory } from "@/api/news";

const actions = {
  // content = { state, getters, commit, dispatch, rootGetters, rootState }
  classification({ commit }, data) {
    return new Promise((resolve, reject) => {
      getCategory({})
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
export default {
  namespaced: true,
  actions
};
