<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-14 10:22:41
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-09 09:29:49
-->
<template>
  <div class="home">
    <!-- 父子组件传值和vue2.0的几乎没差多少 -->
    <Test1 :msg="data.msg" @todata="todata" />
  </div>
</template>

<script>
// @ is an alias to /src
import Test1 from "@/views/Test1.vue";
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
  name: "Test",
  components: {
    Test1,
  },
  setup(props, context) {
    onBeforeMount(() => {
      console.log("父组件onBeforeMount");
    });
    onMounted(() => {
      console.log("父组件onMount");
    });
    // 使用todata来接收子组件传来的值 最后return一下 切记一定要return 否则template找不到
    const todata = (data) => {
      console.log(data);
    };
    const data = reactive({
      msg: "正在开发中，敬请期待！",
    });

    const mmm = reactive({
      list: [111, 222, 333],
    });

    provide("mmm", mmm.list);
    return { data, todata };
  },
};
</script>
