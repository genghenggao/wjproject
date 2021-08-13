<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-01-08 19:25:55
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-07 10:46:51
-->
<template>
  <div id="ranking-board">
    <div class="ranking-board-title">数据库总数据数</div>
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, getCurrentInstance } from "vue";
export default {
  name: "RankingBoard",
  setup() {
    let { proxy } = getCurrentInstance();

    const state = reactive({
      config: {
        data: [
          {
            name: "xxxx项目数据",
            value: 55,
          },
          {
            name: "xxxx项目数据",
            value: 120,
          },
          {
            name: "xxxx项目数据",
            value: 78,
          },
          {
            name: "xxxx项目数据",
            value: 66,
          },
          {
            name: "xxxx项目数据",
            value: 80,
          },
          {
            name: "xxxx项目数据",
            value: 500,
          },
          {
            name: "xxxx项目数据",
            value: 10,
          },
          {
            name: "xxxx项目数据",
            value: 29,
          },
          {
            name: "xxxx项目数据",
            value: 29,
          },
        ],
        rowNum: 9,
      },
    });
    //拿到字符串，转为json对象
    const dataview_tmp = JSON.parse(proxy.$store.state.datanum);
    // console.log(dataview_tmp);
    state.config.data = dataview_tmp;
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
#ranking-board {
  width: 20%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  box-sizing: border-box;
  padding: 0px 30px;

  .ranking-board-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  .dv-scroll-ranking-board {
    flex: 1;
  }
}
</style>
