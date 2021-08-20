<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-11 14:30:34
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-17 22:52:20
-->
<template>
  <div>
    <span>{{ dataForm }}</span>
    <el-button @click="producedata">生成</el-button>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, watch, reactive, toRefs } from "vue";
export default {
  name: "UserSetting",
  setup() {
    const state = reactive({
      dataForm: 100,
    });
    watch(state, (newvalue, oldvalue) => {
      console.log(newvalue, oldvalue);
      deep: true; //深度监听
    });
    const producedata = () => {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          state.dataForm = i;
        }, i*1000);
      }
    };
    return {
      ...toRefs(state),
      producedata,
    };
  },
};
</script>

<style scoped>
</style>