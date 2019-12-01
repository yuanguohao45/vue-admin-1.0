<template>
  <div id="layout">
    <Header></Header>
    <Main></Main>
    <Nav></Nav>
  </div>
</template>

<script>
import { reactive, ref, onMounted, toRefs } from "@vue/composition-api";

import Nav from "./Components/Nav";
import Header from "./Components/Header";
import Main from "./Components/Main";

export default {
  name: "Layout",
  components: { Nav, Header, Main }
};
</script>

<style lang="scss" scoped>
#layout {
  background-color: #f7f7f7;
}
</style>