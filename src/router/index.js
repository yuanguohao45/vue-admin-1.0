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
    path: "/Layout",
    name: "Layout",
    component: () => import("@/views/Layout"),
    children: [
      {
        path: "/Dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
