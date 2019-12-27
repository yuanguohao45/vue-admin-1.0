import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/router/routingGuard";

// 自定义全局方法
// import pubMethod from "@/utils/public"; // 误用保留字 public static ...
// 自定义全局组件
import "@/icons";

// Vue.use(pubMethod);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
