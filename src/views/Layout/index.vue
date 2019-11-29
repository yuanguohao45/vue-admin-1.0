<template>
  <div>
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
</style>