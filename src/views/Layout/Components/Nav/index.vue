<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="@/assets/logo.png" alt=""></h1>
    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="transparent" text-color="#fff" active-text-color="#fff" :collapse="isCollapse" router>
      <template v-for="(item,index) in routers">
        <el-submenu :index="index + ''" v-if="!item.hidden" :key="item.id">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
            <span>{{item.meta.name}}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  computed,
  isRef,
  toRefs,
  onMounted
} from "@vue/composition-api";
export default {
  name: "Nav",
  setup(props, { root }) {
    /**
     * data
     */
    const routers = reactive(root.$router.options.routes);
    /**
     * computed监听
     */
    const isCollapse = computed(() => root.$store.state.isCollapse);
    /**
     * method
     */

    return {
      isCollapse,
      routers
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  .logo {
    text-align: center;
    img {
      width: 92px;
      margin: 28px auto 26px;
    }
  }
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
</style>