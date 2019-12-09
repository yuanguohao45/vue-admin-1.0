<template>
  <div id="layout" :class="menuStatus?'close':'open'">
    <Header></Header>
    <Main></Main>
    <Nav></Nav>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  onMounted,
  toRefs,
  computed
} from "@vue/composition-api";

import Nav from "./Components/Nav";
import Header from "./Components/Header";
import Main from "./Components/Main";

export default {
  name: "Layout",
  components: { Nav, Header, Main },
  setup(props, { root }) {
    /**
     * computed 监听
     */
    const menuStatus = computed(() => root.$store.state.app.isCollapse);
    return {
      menuStatus
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#layout {
  background-color: #f7f7f7;
  @include webkit(transition, all 0.3s ease 0s);
}
.close {
  #nav-wrap {
    width: $navMenuMin;
    /deep/ .logo {
      img {
        width: 60% !important;
      }
    }
  }
  #header-wrap {
    left: $navMenuMin;
  }
  /deep/ .main-content {
    padding-left: $navMenuMin + 30px;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
  #header-wrap {
    left: $navMenu;
  }
  /deep/.main-content {
    padding-left: $navMenu + 30px;
  }
}
</style>