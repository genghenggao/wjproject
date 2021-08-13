<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-01-08 19:25:55
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-07 10:20:01
-->
<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance } from "vue";
export default {
  name: "ScrollBoard",
  // data() {
  //   return {
  //     config: {
  //       header: ["时间", "数据信息", "数量", "项目名称"],
  //       data: [
  //         ["2019-07-01 19:25:00", "某某成功上传文件", "1", "xxxxxxx"],
  //         ["2019-07-02 17:25:00", "某某成功下载文件", "3", "xxxxxxx"],
  //         ["2019-07-03 16:25:00", "某某成功下载文件", "6", "xxxxxxx"],
  //         ["2019-07-04 15:25:00", "某某成功下载文件", "2", "xxxxxxx"],
  //         ["2019-07-05 14:25:00", "某某成功下载文件", "1", "xxxxxxx"],
  //         ["2019-07-06 13:25:00", "某某成功上传文件", "3", "xxxxxxx"],
  //         ["2019-07-07 12:25:00", "某某成功上传文件", "4", "xxxxxxx"],
  //         ["2019-07-08 11:25:00", "某某成功上传文件", "2", "xxxxxxx"],
  //         ["2019-07-09 10:25:00", "某某成功上传文件", "5", "xxxxxxx"],
  //         ["2019-07-10 09:25:00", "某某成功上传文件", "5", "xxxxxxx"],
  //       ],
  //       index: true,
  //       columnWidth: [50, 170, 300],
  //       align: ["center"],
  //       rowNum: 7,
  //       headerBGC: "#1981f6",
  //       headerHeight: 45,
  //       oddRowBGC: "rgba(0, 44, 81, 0.8)",
  //       evenRowBGC: "rgba(10, 29, 50, 0.8)",
  //     },
  //   };
  // },
  setup() {
    let { proxy } = getCurrentInstance();
    const state = reactive({
      config: {
        header: ["时间", "数据信息", "数量", "项目名称"],
        data: [
          ["2019-07-01 19:25:00", "某某成功上传文件", "1", "xxxxxxx"],
          ["2019-07-02 17:25:00", "某某成功下载文件", "3", "xxxxxxx"],
          ["2019-07-03 16:25:00", "某某成功下载文件", "6", "xxxxxxx"],
          ["2019-07-04 15:25:00", "某某成功下载文件", "2", "xxxxxxx"],
          ["2019-07-05 14:25:00", "某某成功下载文件", "1", "xxxxxxx"],
          ["2019-07-06 13:25:00", "某某成功上传文件", "3", "xxxxxxx"],
          ["2019-07-07 12:25:00", "某某成功上传文件", "4", "xxxxxxx"],
          ["2019-07-08 11:25:00", "某某成功上传文件", "2", "xxxxxxx"],
          ["2019-07-09 10:25:00", "某某成功上传文件", "5", "xxxxxxx"],
          ["2019-07-10 09:25:00", "某某成功上传文件", "5", "xxxxxxx"],
        ],
        index: true,
        columnWidth: [50, 170, 200, 100],
        align: ["center"],
        rowNum: 7,
        headerBGC: "#1981f6",
        headerHeight: 45,
        oddRowBGC: "rgba(0, 44, 81, 0.8)",
        evenRowBGC: "rgba(10, 29, 50, 0.8)",
      },
    });
    //拿到字符串，转为json对象
    const dataview_tmp = JSON.parse(proxy.$store.state.dataupload);
    // console.log(dataview_tmp);
    state.config.data = [];
    for (let i = 0; i < dataview_tmp.length; i++) {
      // console.log(dataview_tmp[i]);
      const data_tmp = [
        dataview_tmp[i]["file_date"].split(".")[0].replace("T", " "),
        dataview_tmp[i]["data_admin"] + "上传了" + dataview_tmp[i]["data_name"],

        dataview_tmp[i]["file_lenght"] + "MB",
        dataview_tmp[i]["data_projectname"],
      ];
      state.config.data.push(data_tmp);
    }
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss">
#scroll-board {
  // width: 100%;
  width: 700px;
  box-sizing: border-box;
  margin-left: 10px;
  height: 100%;
  overflow: hidden;
}
</style>
