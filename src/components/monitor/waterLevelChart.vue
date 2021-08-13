<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-01-08 19:25:55
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-07 10:47:03
-->
<template>
  <div id="water-level-chart">
    <div class="water-level-chart-title">数据库总数据占比量</div>

    <div class="water-level-chart-details">
      目前数据总量<span>{{ use_data }}</span
      >GB
    </div>

    <div class="chart-container">
      <dv-water-level-pond :config="config" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance } from "vue";
export default {
  name: "WaterLevelChart",
  setup() {
    let { proxy } = getCurrentInstance();
    const state = reactive({
      config: {
        data: [45],
        shape: "round",
        waveHeight: 25,
        waveNum: 2,
      },
      use_data: "",
      dataview: "",
    });

    //拿到字符串，转为json对象
    const dataview_tmp = JSON.parse(proxy.$store.state.datatop);

    // console.log(dataview_tmp);
    state.use_data = Math.round(dataview_tmp["fsUsedSize"] / 1024);

    state.config.data = [
      parseInt(
        (dataview_tmp["fsUsedSize"] / dataview_tmp["fsTotalSize"]) * 100
      ),
    ];
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
#water-level-chart {
  width: 20%;
  box-sizing: border-box;
  margin-left: 10px;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  display: flex;
  flex-direction: column;

  .water-level-chart-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
    justify-content: center;
  }

  .water-level-chart-details {
    height: 15%;
    display: flex;
    justify-content: center;
    font-size: 17px;
    align-items: flex-end;

    span {
      font-size: 35px;
      font-weight: bold;
      color: #58a1ff;
      margin: 0 5px;
      margin-bottom: -5px;
    }
  }

  .chart-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dv-water-pond-level {
    max-width: 90%;
    width: 200px;
    height: 200px;
    border: 10px solid #19c3eb;
    border-radius: 50%;

    ellipse {
      stroke: transparent !important;
    }

    text {
      font-size: 40px;
    }
  }
}
</style>
