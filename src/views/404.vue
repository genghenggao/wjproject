<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-11 14:37:36
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-26 09:59:16
-->
<template>
  <div class="container-404" :style="defaultHeight">
    <h1>404哦！</h1>
    <div class="text">找不到页面</div>
    <div class="text">但我们现在正在进行一些维护。</div>
    <div class="text">
      找不到您要查找的页面，请与<a href="#">我们联系</a>以报告此问题。
    </div>
    <div class="text team">—— 系统开发团队</div>
    <div>
      <el-button icon="el-icon-back" round @click="goBack">返回</el-button>
      <el-button type="danger" icon="el-icon-s-home" round @click="goHome"
        >首页</el-button
      >
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      defaultHeight: {
        height: "",
      },
    });

    onBeforeMount(() => {
      state.defaultHeight.height = document.body.clientHeight + "px";
    });

    const goBack = () => {
      router.go(-1);
    };

    const goHome = () => {
      router.push({ path: "/home" });
    };

    return {
      ...toRefs(state),
      goBack,
      goHome,
    };
  },
};
</script>

<style lang="scss">
.container-404 {
  height: 100%;
  margin: 0 auto;
  padding-top: 15%;
  text-align: center;
  color: #494b52;
  background: #17191c;
  font-weight: 400;
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  letter-spacing: 0.3px;
  .text {
    margin-bottom: 0.5em;
  }
  .team {
    margin: 1.2em 0;
  }
  a {
    text-decoration: none;
    color: #007bff;
  }
}
</style>