<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-14 10:22:41
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-07 15:07:17
-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { watch, inject, onBeforeMount, onMounted } from "vue";
export default {
  name: "Test1",
  //如果不需要处理父组件的值直接写着一段即可，
  props: {
    msg: String,
  },
  setup(props, ctx) {
    onBeforeMount(() => {
      console.log("子组件onBeforeMount");
    });
    onMounted(() => {
      console.log("子组件onMount");
    });
    const list = inject("mmm");
    console.log(list);
    //因为想监听一下这个父组件的值 所以需要在setup里面写一个props参数用来获取父组件传来的值
    const msg = props.msg;
    console.log(msg);
    // 监听一下子组件的值
    watch(msg, (oldVal, newVal) => {
      console.log(oldVal);
      console.log(newVal);
    });
    //传值给父组件使用的方法 和vue2.0的$emit使用方法一样，vue3的emit没有$，别搞混了
    ctx.emit("todata", { msg: "ylg" });
    return {
      list,
    };
  },
};
</script>