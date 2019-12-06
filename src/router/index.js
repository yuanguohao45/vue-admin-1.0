import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入布局组件
import Layout from "@/views/Layout";

const routes = [
  {
    path: "/",
    redirect: "Login",
    meta: {
      name: "主页"
    },
    hidden: true
  },
  {
    path: "/Login",
    name: "Login",
    meta: {
      name: "登录"
    },
    hidden: true,
    component: () => import("@/views/Login")
  },
  {
    path: "/Layout",
    name: "Layout",
    meta: {
      name: "控制台",
      icon: "dashboard"
    },
    redirect: "Dashboard",
    hidden: false,
    component: Layout,
    children: [
      {
        path: "/Dashboard",
        name: "Dashboard",
        meta: {
          name: "首页"
        },
        hidden: false,
        component: () => import("@/views/Dashboard")
      }
    ]
  },
  {
    path: "/Info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "info"
    },
    hidden: false,
    component: Layout,
    children: [
      {
        path: "/InfoList",
        name: "InfoList",
        meta: {
          name: "信息列表"
        },
        hidden: false,
        component: () => import("@/views/Info/InfoList")
      },
      {
        path: "/InfoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        hidden: false,
        component: () => import("@/views/Info/InfoCategory")
      }
    ]
  },
  {
    path: "/User",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "user"
    },
    hidden: false,
    component: Layout,
    children: [
      {
        path: "/UserList",
        name: "UserList",
        meta: {
          name: "用户列表"
        },
        hidden: false,
        component: () => import("@/views/User/UserList")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
