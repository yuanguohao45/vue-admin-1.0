import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "Login"
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login")
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: () => import("@/views/Layout")
  }
];

const router = new VueRouter({
  routes
});

export default router;
