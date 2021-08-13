<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-12 11:10:52
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-04 21:06:37
-->
<template>
  <div class="user-list">
    <el-card shadow="never">
      <template #header>
        <div class="clearfix">
          <el-image
            class="icon"
            :src="require('@/assets/image/icon/list.png')"
          />
          <span>数据总览</span>
        </div>
      </template>
      <div class="content" style="height: 600px">
        <template>
          <index />
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>
import index from "./index";
export default {
  name: "DataMonitor",
  components: { index },
};
</script>

<style lang="scss">
// @import "../assets/css/common.css";
</style>