<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footerbar></footerbar>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";
import footerbar from "./components/footerbar.vue";

export default {
  name: "App",
  components: {
    navbar,
    footerbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
}
* {
  margin: 0;
  padding: 0;
}
*::-webkit-scrollbar{
  width: 10px;
}
*::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background: #bbbbbb;
}
a{
  text-decoration: none;
}
</style>
