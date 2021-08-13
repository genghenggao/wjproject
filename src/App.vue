<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-10 16:55:38
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-11 19:55:17
-->
<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <!-- <router-view /> -->
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
import {
  reactive,
  onMounted,
  onBeforeMount,
  toRefs,
  getCurrentInstance,
  defineEmits,
  provide,
} from "vue";
export default {
  setup() {
    let { proxy } = getCurrentInstance();
    const state = reactive({
      isRouterAlive: true,
    });

    const reload = () => {
      state.isRouterAlive = false;
      proxy.$nextTick(() => (state.isRouterAlive = true));
    };

    provide("reload", reload);

    return {
      ...toRefs(state),
      reload,
    };
  },
};
</script>


<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
#nprogress .bar {
  /*自定义进度条颜色*/
  background: #d9393b !important;
}
</style>
