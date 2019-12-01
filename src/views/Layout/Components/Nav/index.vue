<template>
  <div id="nav-wrap">
    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="transparent" text-color="#fff" active-text-color="#fff" :collapse="isCollapse" @open="handleOpen" @close="handleClose" router>
      <template v-for="(item,index) in routers">
        <el-submenu :index="index" v-if="!item.hidden" :key="item.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.meta.name}}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "Nav",
  setup(props, { root }) {
    /**
     * data
     */
    const isCollapse = ref(false);
    const routers = reactive(root.$router.options.routes);
    console.log(routers);
    /**
     * method
     */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollapse,
      routers,

      handleOpen,
      handleClose
    };
  }
};
</script>

<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: #344a5f;
}
</style>