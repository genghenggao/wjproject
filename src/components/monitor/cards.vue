<template>
  <div id="cards">
    <div class="card-item" v-for="(card, i) in cards" :key="card.title">
      <div class="card-header">
        <div class="card-header-left">{{ card.title }}</div>
        <div class="card-header-right">{{ "0" + (i + 1) }}</div>
      </div>
      <dv-charts class="ring-charts" :option="card.ring" />
      <div class="card-footer">
        <div class="card-footer-item">
          <div class="footer-title">累计数据</div>
          <div class="footer-detail">
            <dv-digital-flop
              :config="card.total"
              style="width: 70%; height: 35px"
            />MB
          </div>
        </div>
        <div class="card-footer-item">
          <div class="footer-title">数据数</div>
          <div class="footer-detail">
            <dv-digital-flop
              :config="card.num"
              style="width: 70%; height: 35px"
            />幅
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  getCurrentInstance,
  inject,
  onMounted,
  onUpdated,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Cards",
  // props: ["msg"],
  // 如果不需要处理父组件的值直接写着一段即可，
  props: {
    msg: String,
  },

  setup(props, ctx) {
    // 接受父组件overviews.vue的值
    const list = inject("mmm");
    // console.log(list);

    //因为监听一下这个父组件的值 所以需要在setup里面写一个props参数用来获取父组件传来的值
    const msg = props.msg;
    // console.log(props.msg);
    let { proxy } = getCurrentInstance();

    const router = useRouter();
    const store = useStore();
    const state = reactive({
      cards: [],
      allsize: 0,
    });

    //传值给父组件使用的方法 和vue2.0的$emit使用方法一样，vue3的emit没有$，别搞混了
    ctx.emit("getdatabaseinfo", { msg: "ylg" });

    onMounted(() => {
      console.log("onMounted");
      createData_pre();
      setTimeout(createData, 500);
      // setInterval(createData, 30000);
    });
    // 先构建框架
    const createData_pre = () => {
      // const { randomExtend } = proxy;
      state.cards = new Array(5).fill(0).map((foo, i) => ({
        title: "测试研究数据" + (i + i),
        total: {
          number: [randomExtend(10, 30)],
          content: "{nt}",
          textAlign: "right",
          style: {
            fill: "#ea6027",
            fontWeight: "bold",
          },
        },
        num: {
          number: [randomExtend(30, 50)],
          content: "{nt}",
          textAlign: "right",
          style: {
            fill: "#26fcd8",
            fontWeight: "bold",
          },
        },
        ring: {
          series: [
            {
              type: "gauge",
              startAngle: -Math.PI / 2,
              endAngle: Math.PI * 1.5,
              arcLineWidth: 13,
              radius: "80%",
              data: [{ name: "数据占比", value: randomExtend(10, 30) }],
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              pointer: {
                show: false,
              },
              backgroundArc: {
                style: {
                  stroke: "#224590",
                },
              },
              details: {
                show: true,
                formatter: "数据占比{value}%",
                style: {
                  fill: "#1ed3e5",
                  fontSize: 20,
                },
              },
            },
          ],
          color: ["#03d3ec"],
        },
      }));
    };

    // 更新数据
    //拿到字符串，转为json对象
    const createData = () => {
      // 获取数据库信息
      let url = `/api/wjproject/databaseinfo/`;
      // console.log(proxy.$axios);
      proxy.$axios
        .get(url)
        .then((res) => {
          // console.log(res);
          // console.log(data.data.list);
          if (res.data != null) {
            const dataview_tmp = res.data.dataview;
            // 计算总数居
            for (let i = 1; i < dataview_tmp.length; i++) {
              // console.log("第" + i + "次");
              // dataview_tmp[i]["filesize"];
              state.allsize += dataview_tmp[i]["filesize"];
            }
            // console.log(state.allsize);
            // 初始化，防止不同的
            state.cards = [];
            for (let i = 1; i < dataview_tmp.length; i++) {
              // console.log("第" + i + "次");
              // console.log(dataview_tmp[i]["datatype"]);
              // console.log(dataview_tmp[i]["filesize"]);
              const tmp = {
                title: "测试研究数据" + (i + 1),
                title: dataview_tmp[i]["datatype"],
                total: {
                  number: [dataview_tmp[i]["filesize"]],
                  content: "{nt}",
                  textAlign: "right",
                  style: {
                    fill: "#ea6027",
                    fontWeight: "bold",
                  },
                },
                num: {
                  number: [dataview_tmp[i]["filenum"]],
                  content: "{nt}",
                  textAlign: "right",
                  style: {
                    fill: "#26fcd8",
                    fontWeight: "bold",
                  },
                },
                ring: {
                  series: [
                    {
                      type: "gauge",
                      startAngle: -Math.PI / 2,
                      endAngle: Math.PI * 1.5,
                      arcLineWidth: 13,
                      radius: "80%",
                      data: [
                        {
                          name: "数据占比",
                          value:
                            (dataview_tmp[i]["filesize"] / state.allsize) * 100,
                        },
                      ],
                      axisLabel: {
                        show: false,
                      },
                      axisTick: {
                        show: false,
                      },
                      pointer: {
                        show: false,
                      },
                      backgroundArc: {
                        style: {
                          stroke: "#224590",
                        },
                      },
                      details: {
                        show: true,
                        formatter: "数据占比{value}%",
                        style: {
                          fill: "#1ed3e5",
                          fontSize: 20,
                        },
                      },
                    },
                  ],
                  color: ["#03d3ec"],
                },
              };
              // console.log(tmp);
              state.cards.push(tmp);
            }
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
#cards {
  display: flex;
  justify-content: space-between;
  height: 45%;

  .card-item {
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, 0.5);
    // width: 19.5%;
    width: 19.5%;
    display: flex;
    flex-direction: column;
  }

  .card-header {
    display: flex;
    height: 20%;
    align-items: center;
    justify-content: space-between;

    .card-header-left {
      font-size: 18px;
      font-weight: bold;
      padding-left: 20px;
    }

    .card-header-right {
      padding-right: 2px;
      font-size: 40px;
      color: #03d3ec;
    }
  }

  .ring-charts {
    // height: 55%;
    // 固定高度，否则会出现比例不一致
    height: 170px;
  }

  .card-footer {
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .card-footer-item {
    padding: 5px 10px 0px 10px;
    box-sizing: border-box;
    width: 40%;
    background-color: rgba(6, 30, 93, 0.7);
    border-radius: 3px;

    .footer-title {
      font-size: 15px;
      margin-bottom: 5px;
    }

    .footer-detail {
      font-size: 20px;
      color: #1294fb;
      display: flex;
      font-size: 18px;
      align-items: center;

      .dv-digital-flop {
        margin-right: 5px;
      }
    }
  }
}
</style>
