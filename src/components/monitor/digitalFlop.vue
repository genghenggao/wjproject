<template>
  <div id="digital-flop">
    <div
      class="digital-flop-item"
      v-for="item in digitalFlopData"
      :key="item.title"
    >
      <div class="digital-flop-title">{{ item.title }}</div>
      <div class="digital-flop">
        <dv-digital-flop
          :config="item.number"
          style="width: 100px; height: 50px"
        />
        <div class="unit">{{ item.unit }}</div>
      </div>
    </div>

    <dv-decoration-10 />
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance, onMounted } from "vue";
export default {
  name: "DigitalFlop",
  setup() {
    let { proxy } = getCurrentInstance();
    const state = reactive({
      digitalFlopData: [],
    });

    onMounted(() => {
      createData_pre();
      setTimeout(createData, 500);
    });
    const createData_pre = () => {
      state.digitalFlopData = [
        {
          title: "平台设计容量",
          number: {
            number: [randomExtend(100, 200)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#4d99fc",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
        {
          title: "总数据量",
          number: {
            number: [randomExtend(20, 50)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#f46827",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
        {
          title: "图纸数据",
          number: {
            number: [randomExtend(20, 30)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#40faee",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
        {
          title: "文字报告",
          number: {
            number: [randomExtend(10, 20)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#4d99fc",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
        {
          title: "报表数据",
          number: {
            number: [randomExtend(10, 20)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#f46827",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
        {
          title: "其他数据",
          number: {
            number: [randomExtend(20, 40)],
            content: "{nt}",
            textAlign: "right",
            style: {
              fill: "#40faee",
              fontWeight: "bold",
            },
          },
          unit: "GB",
        },
      ];
    };
    const createData = () => {
      // 获取数据库信息
      let url = `/api/wjproject/databaseinfo/`;
      // console.log(proxy.$axios);
      proxy.$axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          // console.log(data.data.list);
          if (res.data != null) {
            const dataview_tmp = res.data.dataview;
            const datatop_tmp = res.data.datatop;
            state.digitalFlopData = [
              {
                title: "平台设计容量",
                number: {
                  number: [datatop_tmp["fsTotalSize"] / 1024],
                  content: "{nt}",
                  textAlign: "right",
                  style: {
                    fill: "#4d99fc",
                    fontWeight: "bold",
                  },
                },
                unit: "GB",
              },
              {
                title: "总数据量",
                number: {
                  number: [datatop_tmp["dataSize"]],
                  content: "{nt}",
                  textAlign: "right",
                  style: {
                    fill: "#f46827",
                    fontWeight: "bold",
                  },
                },
                unit: "MB",
              },
              {
                title: "图纸数据",
                number: {
                  number: [dataview_tmp[0]["filesize"]],
                  content: "{nt}",
                  textAlign: "right",
                  style: {
                    fill: "#40faee",
                    fontWeight: "bold",
                  },
                },
                unit: "MB",
              },
              {
                title: "文字报告",
                number: {
                  number: [dataview_tmp[1]["filesize"]],
                  content: "{nt}",
                  textAlign: "right",
                  style: {
                    fill: "#4d99fc",
                    fontWeight: "bold",
                  },
                },
                unit: "MB",
              },
              {
                title: "报表数据",
                number: {
                  number: [dataview_tmp[2]["filesize"]],
                  content: "{nt}",
                  textAlign: "right",
                  style: {
                    fill: "#f46827",
                    fontWeight: "bold",
                  },
                },
                unit: "MB",
              },
              {
                title: "其他数据",
                number: {
                  number: [datatop_tmp["fsUsedSize"] / 1024],
                  content: "{nt}",
                  textAlign: "right",
                  style: {
                    fill: "#40faee",
                    fontWeight: "bold",
                  },
                },
                unit: "GB",
              },
            ];
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
      createData_pre,
      createData,
      randomExtend,
    };
  },
};
</script>

<style lang="scss">
#digital-flop {
  position: relative;
  height: 15%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.5);

  .dv-decoration-10 {
    position: absolute;
    width: 95%;
    left: 2.5%;
    height: 5px;
    bottom: 0px;
  }

  .digital-flop-item {
    width: 11%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 3px solid rgb(6, 30, 93);
    border-right: 3px solid rgb(6, 30, 93);
  }

  .digital-flop-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .digital-flop {
    display: flex;
  }

  .unit {
    margin-left: 10px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 13px;
  }
}
</style>
