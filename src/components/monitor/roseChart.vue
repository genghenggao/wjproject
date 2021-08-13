<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-01-08 19:25:55
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-09 09:08:16
-->
<template>
  <div id="rose-chart">
    <div class="rose-chart-title">地质数据类型分类</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  getCurrentInstance,
  onMounted,
  onUpdated,
} from "vue";
export default {
  name: "RoseChart",
  setup() {
    let { proxy } = getCurrentInstance();
    const state = reactive({
      option: {},
      allsize: 0,
      dataview: "",
    });
    onMounted(() => {
      createData_pre();
      // createData();
      setTimeout(createData, 500);
      // setInterval(createData, 30000);
    });

    //初始化数据，构建框架
    const createData_pre = () => {
      state.option = {
        series: [
          {
            type: "pie",
            radius: "50%",
            roseSort: false,
            data: [
              { name: "柱状图", value: randomExtend(40, 70) },
              { name: "剖面图", value: randomExtend(20, 30) },
              { name: "平面图", value: randomExtend(10, 50) },
              { name: "文字报告", value: randomExtend(5, 20) },
              { name: "报表", value: randomExtend(40, 50) },
              { name: "其他", value: randomExtend(20, 30) },
            ],
            insideLabel: {
              show: false,
            },
            outsideLabel: {
              formatter: "{name} {percent}%",
              labelLineEndLength: 20,
              style: {
                fill: "#fff",
              },
              labelLineStyle: {
                stroke: "#fff",
              },
            },
            roseType: true,
          },
        ],
        color: [
          "#da2f00",
          "#fa3600",
          "#ff4411",
          "#ff724c",
          "#541200",
          "#801b00",
          "#a02200",
          "#5d1400",
          "#b72700",
        ],
      };
    };

    // 更新数据
    const createData = () => {
      // 获取数据库信息
      let url = `/api/wjproject/databaseinfo/`;
      // console.log(proxy.$axios);
      proxy.$axios
        .get(url)
        .then((res) => {
          if (res.data != null) {
            console.log(res.data);
            const dataview_tmp = res.data.dataview;
            // 计算总数居
            for (let i = 0; i < dataview_tmp.length; i++) {
              // console.log("第" + i + "次");
              // dataview_tmp[i]["filesize"];
              state.allsize += dataview_tmp[i]["filesize"];
            }

            const data_arr = [];
            for (let i = 1; i < dataview_tmp.length; i++) {
              const data_json = {
                name: dataview_tmp[i]["datatype"],
                // 给一个很小的值，防止数据为0
                value: (dataview_tmp[i]["filesize"] / state.allsize) * 100,
              };
              // console.log(data_json);
              data_arr.push(data_json);
            }
            // console.log(data_arr);
            state.option = {
              series: [
                {
                  type: "pie",
                  radius: "50%",
                  roseSort: false,
                  data: data_arr,
                  insideLabel: {
                    show: false,
                  },
                  outsideLabel: {
                    formatter: "{name} {percent}%",
                    labelLineEndLength: 20,
                    style: {
                      fill: "#fff",
                    },
                    labelLineStyle: {
                      stroke: "#fff",
                    },
                  },
                  roseType: true,
                },
              ],
              color: [
                "#da2f00",
                "#fa3600",
                "#ff4411",
                "#ff724c",
                "#541200",
                "#801b00",
                "#a02200",
                "#5d1400",
                "#b72700",
              ],
            };
          }
        })
        .catch((errot) => {
          console.log("网络错误");
        });
    };

    const randomExtend = (minNum, maxNum) => {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10);
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      }
    };
    return {
      ...toRefs(state),
      randomExtend,
      createData_pre,
      createData,
    };
  },
};
</script>

<style lang="scss">
#rose-chart {
  width: 30%;
  height: 100%;
  background-color: rgba(6, 30, 93, 0.5);
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  box-sizing: border-box;
  .rose-chart-title {
    height: 50px;
    font-weight: bold;
    text-indent: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  .dv-charts-container {
    height: calc(100% - 50px);
  }
}
</style>
