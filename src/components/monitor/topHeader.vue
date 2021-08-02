<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-01-08 19:25:55
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-12 16:12:39
-->
<template>
  <div id="top-header">
    <dv-decoration-8 class="header-left-decoration" />
    <dv-decoration-5 class="header-center-decoration" />
    <dv-decoration-8 class="header-right-decoration" :reverse="true" />
    <div class="center-title">
      <!-- <a href="/mongeostore" style="color: #ffffff">武甲图纸管理系统数据中心</a> -->
      <p style="color: #ffffff">武甲图纸数据管理中心</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
};
</script>

<style lang="scss">
#top-header {
  position: relative;
  width: 100%;
  // height: 100px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;

  .header-center-decoration {
    width: 40%;
    height: 60px;
    margin-top: 30px;
  }

  .header-left-decoration,
  .header-right-decoration {
    width: 25%;
    height: 60px;
  }

  .center-title {
    position: absolute;
    font-size: 30px;
    font-weight: bold;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
  }
}
</style>
