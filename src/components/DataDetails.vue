<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-17 21:31:46
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-30 17:33:15
-->
<template>
  <div class="data-info">
    <el-card shadow="never">
      <template #header>
        <el-page-header
          @back="goBack"
          title="返回"
          content="数据详情"
        ></el-page-header>
      </template>

      <div class="maincontent">
        <section>
          <el-table
            :show-header="false"
            :data="tableData"
            :span-method="objectSpanMethod"
            border
            :cell-style="columnStyle"
            style="width: 100%; margin-top: 10px"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <el-table-column prop="id" label="ID" width="540">
              <!-- <template slot-scope="scope">
                <div>
                  <img :src="scope.row.id | setPicUrl" />
                </div>
              </template> -->
              <div
                v-if="show"
                style="
                  width: 500px;
                  height: 700px;
                  display: table-cell;
                  vertical-align: middle;
                  text-align: center;
                "
              >
                <!-- <img src="../assets/logo1.png" alt="" /> -->

                <!-- <viewer :images="images">
                  <img
                    :src="'data:image/png;base64,' + img_io"
                    class="avatar"
                    height="60"
                    alt="图片名"
                /></viewer> -->

                <viewer :images="images">
                  <img
                    v-for="src in images"
                    :src="src"
                    :key="src"
                    class="avatar"
                    height="200"
                    alt="图片名"
                /></viewer>
              </div>
              <div
                v-else
                style="width: 500px; height: 700px; padding-right: 20px"
              >
                <PDFView @click="fullScreenView" />
                <!-- <div class="pdfcontainer" @click="fullScreenView">
                  <pdf
                    :url="pdfUrl"
                    :type="'canvas'"
                    :pdfjsDistPath="'/static'"
                    :data-page-number="1"
                  />
                </div> -->
              </div>
            </el-table-column>
            <el-table-column width="180" prop="keyword1"></el-table-column>
            <el-table-column prop="valueparam1"></el-table-column>
            <el-table-column width="180" prop="keyword2"></el-table-column>
            <el-table-column prop="valueparam2"></el-table-column>
          </el-table>
          <el-drawer
            title="PDF预览"
            v-model="drawer"
            :direction="direction"
            :with-header="false"
            size="50%"
          >
            <div class="overflowAuto" style="paddinf-right: 5px">
              <!-- canvas渲染方式 -->
              <pdf :url="pdfUrl" :type="'canvas'" :pdfjsDistPath="'/static'" />
            </div>
          </el-drawer>
        </section>
      </div>
      <el-form-item style="padding-top: 5px; padding-left: 700px">
        <el-button type="info" plain @click="preBtn">上一条</el-button>
        <el-button type="info" plain @click="nextBtn">下一条</el-button>
      </el-form-item>
    </el-card>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox, ElNotification } from "element-plus";
import pdf from "@/components/pdf/pdf";
import PDFView from "@/components/PDFView";
export default {
  components: {
    pdf,
    PDFView,
  },
  setup() {
    let { proxy } = getCurrentInstance();
    const router = useRouter();
    const state = reactive({
      img_io: "",
      tableData: [],
      currentid: "",
      loading: true,
      images: [],
      pdfUrl: "",
      show: true,
      dialogPDFVisible: false,
      drawer: false,
      direction: "ltr",
    });

    onMounted(() => {
      init();
    });

    // 初始化数据
    const init = () => {
      state.tableData = [
        {
          //   id: this.dataForm.headImg,
          id: 1,
          keyword1: "ID",
          valueparam1: 123,
          keyword2: "文件名称",
          valueparam2: 312321321,
        },
        {
          id: 1,
          keyword1: "档案号",
          valueparam1: 32132,
          keyword2: "原始格式",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "项目名称",
          valueparam1: 32132,
          keyword2: "制图单位",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "制图人员",
          valueparam1: 32132,
          keyword2: "拟编人员",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "审核人员",
          valueparam1: 32132,
          keyword2: "比例尺",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "制图日期",
          valueparam1: 32132,
          keyword2: "坐标系统",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "入库人员",
          valueparam1: 32132,
          keyword2: "入库地点",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "入库单位",
          valueparam1: 32132,
          keyword2: "关键词1",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "关键词2",
          valueparam1: 32132,
          keyword2: "关键词3",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "左下角X",
          valueparam1: 32132,
          keyword2: "左下角Y",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "右下角X",
          valueparam1: 32132,
          keyword2: "右下角Y",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "附属图ID",
          valueparam1: 32132,
          keyword2: "源文件ID",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "备注",
          valueparam1: 32132,
        },
      ];
      console.log(proxy.$route.query.id);
      let query_id = proxy.$route.query.id;
      let url = `/api/wjproject/query`;
      proxy.$axios
        .get(url, {
          params: {
            _id: query_id,
            type: "QUERY",
          },
        })
        .then(({ data }) => {
          // 将json字符串转为json对象
          const data_json = JSON.parse(data);
          console.log(data_json);
          state.tableData = [
            {
              //   id: this.dataForm.headImg,
              id: 1,
              keyword1: "ID",
              valueparam1: data_json.id,
              keyword2: "文件名称",
              valueparam2: data_json.dataName,
            },
            {
              id: 1,
              keyword1: "档案号",
              valueparam1: data_json.dataNumber,
              keyword2: "原始格式",
              valueparam2: data_json.dataFormat,
            },
            {
              id: 1,
              keyword1: "项目名称",
              valueparam1: data_json.dataprojectname,
              keyword2: "制图单位",
              valueparam2: data_json.dataCompany,
            },
            {
              id: 1,
              keyword1: "制图人员",
              valueparam1: data_json.dataMaker2,
              keyword2: "拟编人员",
              valueparam2: data_json.dataMaker,
            },
            {
              id: 1,
              keyword1: "审核人员",
              valueparam1: data_json.dataMaker3,
              keyword2: "比例尺",
              valueparam2: data_json.dataScale,
            },
            {
              id: 1,
              keyword1: "制图日期",
              valueparam1: data_json.dataDate,
              keyword2: "坐标系统",
              valueparam2: data_json.dataCoordinate,
            },
            {
              id: 1,
              keyword1: "入库人员",
              valueparam1: data_json.dataAdmin,
              keyword2: "入库单位",
              valueparam2: data_json.dataStorageCompany,
            },
            {
              id: 1,
              keyword1: "入库地点",
              valueparam1: data_json.dataStorageLocation,
              keyword2: "关键词1",
              valueparam2: data_json.dataKeyWord1,
            },
            {
              id: 1,
              keyword1: "关键词2",
              valueparam1: data_json.dataKeyWord2,
              keyword2: "关键词3",
              valueparam2: data_json.dataKeyWord3,
            },
            {
              id: 1,
              keyword1: "左下角X",
              valueparam1: data_json.dataLeftX,
              keyword2: "左下角Y",
              valueparam2: data_json.dataLeftY,
            },
            {
              id: 1,
              keyword1: "右下角X",
              valueparam1: data_json.dataRightX,
              keyword2: "右下角Y",
              valueparam2: data_json.dataRightY,
            },
            {
              id: 1,
              keyword1: "附属图ID",
              valueparam1: data_json.imgList,
              keyword2: "源文件ID",
              valueparam2: data_json.fileList,
            },
            {
              id: 1,
              keyword1: "备注",
              valueparam1: data_json.dataIntro,
            },
          ];
          //   获取Base64
          // state.img_io = data_json["img_obj"]["$binary"];
          // 根据后缀名判断是PDF还是图片
          if (data_json.img_name.split(".")[1] == "pdf") {
            console.log("PDF");
            state.show = false;
            state.pdfUrl = "/api/wjproject/media/" + data_json.img_name;
            // state.pdfUrl = "/api/wjproject/media/" + "开发文档.pdf";
          } else {
            console.log("图片");
            state.show = true;
          }
          // 获取服务器URL
          state.images = ["/api/wjproject/media/" + data_json.img_name];
          state.currentid = data_json.id;
        });
      state.loading = false;
    };
    // // 自定义列背景色
    const columnStyle = ({ row, column, rowIndex, columnIndex }) => {
      if (columnIndex == 0 || columnIndex == 1 || columnIndex == 3) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc; font-weight:bold";
      } else {
        return "background:#ffffff;";
      }
    };
    // 和并列
    const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
      if (columnIndex === 0) {
        if (rowIndex % 13 === 0) {
          return {
            rowspan: 13,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      } else {
      }
    };

    // 上一条数据
    const preBtn = () => {
      console.log(state.currentid);
      state.tableData = [
        {
          //   id: this.dataForm.headImg,
          id: 1,
          keyword1: "ID",
          valueparam1: 123,
          keyword2: "文件名称",
          valueparam2: 312321321,
        },
        {
          id: 1,
          keyword1: "档案号",
          valueparam1: 32132,
          keyword2: "原始格式",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "项目名称",
          valueparam1: 32132,
          keyword2: "制图单位",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "制图人员",
          valueparam1: 32132,
          keyword2: "拟编人员",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "审核人员",
          valueparam1: 32132,
          keyword2: "比例尺",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "制图日期",
          valueparam1: 32132,
          keyword2: "坐标系统",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "入库人员",
          valueparam1: 32132,
          keyword2: "入库地点",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "入库单位",
          valueparam1: 32132,
          keyword2: "关键词1",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "关键词2",
          valueparam1: 32132,
          keyword2: "关键词3",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "左下角X",
          valueparam1: 32132,
          keyword2: "左下角Y",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "右下角X",
          valueparam1: 32132,
          keyword2: "右下角Y",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "附属图ID",
          valueparam1: 32132,
          keyword2: "源文件ID",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "备注",
          valueparam1: 32132,
        },
      ];
      let query_id = state.currentid;
      let url = `/api/wjproject/prequery`;
      proxy.$axios
        .get(url, {
          params: {
            _id: query_id,
            type: "PREQUERY",
          },
        })
        .then(({ data }) => {
          // 将json字符串转为json对象
          const data_json = JSON.parse(data);
          state.tableData = [
            {
              //   id: this.dataForm.headImg,
              id: 1,
              keyword1: "ID",
              valueparam1: data_json.id,
              keyword2: "文件名称",
              valueparam2: data_json.dataName,
            },
            {
              id: 1,
              keyword1: "档案号",
              valueparam1: data_json.dataNumber,
              keyword2: "原始格式",
              valueparam2: data_json.dataFormat,
            },
            {
              id: 1,
              keyword1: "项目名称",
              valueparam1: data_json.dataprojectname,
              keyword2: "制图单位",
              valueparam2: data_json.dataCompany,
            },
            {
              id: 1,
              keyword1: "制图人员",
              valueparam1: data_json.dataMaker2,
              keyword2: "拟编人员",
              valueparam2: data_json.dataMaker,
            },
            {
              id: 1,
              keyword1: "审核人员",
              valueparam1: data_json.dataMaker3,
              keyword2: "比例尺",
              valueparam2: data_json.dataScale,
            },
            {
              id: 1,
              keyword1: "制图日期",
              valueparam1: data_json.dataDate,
              keyword2: "坐标系统",
              valueparam2: data_json.dataCoordinate,
            },
            {
              id: 1,
              keyword1: "入库人员",
              valueparam1: data_json.dataAdmin,
              keyword2: "入库单位",
              valueparam2: data_json.dataStorageCompany,
            },
            {
              id: 1,
              keyword1: "入库地点",
              valueparam1: data_json.dataStorageLocation,
              keyword2: "关键词1",
              valueparam2: data_json.dataKeyWord1,
            },
            {
              id: 1,
              keyword1: "关键词2",
              valueparam1: data_json.dataKeyWord2,
              keyword2: "关键词3",
              valueparam2: data_json.dataKeyWord3,
            },
            {
              id: 1,
              keyword1: "左下角X",
              valueparam1: data_json.dataLeftX,
              keyword2: "左下角Y",
              valueparam2: data_json.dataLeftY,
            },
            {
              id: 1,
              keyword1: "右下角X",
              valueparam1: data_json.dataRightX,
              keyword2: "右下角Y",
              valueparam2: data_json.dataRightY,
            },
            {
              id: 1,
              keyword1: "附属图ID",
              valueparam1: data_json.imgList,
              keyword2: "源文件ID",
              valueparam2: data_json.fileList,
            },
            {
              id: 1,
              keyword1: "备注",
              valueparam1: data_json.dataIntro,
            },
          ];
          //   获取Base64
          // state.img_io = data_json["img_obj"]["$binary"];
          // 获取服务器URL
          if (data_json.img_name.split(".")[1] == "pdf") {
            console.log("PDF");
            state.show = false;
            state.pdfUrl = "/api/wjproject/media/" + data_json.img_name;
            // state.pdfUrl = "/api/wjproject/media/" + "开发文档.pdf";
          } else {
            console.log("图片");
            state.show = true;
          }
          // 获取服务器URL
          state.images = ["/api/wjproject/media/" + data_json.img_name];
          state.currentid = data_json.id;
        });
      state.loading = false;
    };
    // 下一条数据
    const nextBtn = () => {
      console.log("下一条");
      console.log(state.currentid);
      state.tableData = [
        {
          //   id: this.dataForm.headImg,
          id: 1,
          keyword1: "ID",
          valueparam1: 123,
          keyword2: "文件名称",
          valueparam2: 312321321,
        },
        {
          id: 1,
          keyword1: "档案号",
          valueparam1: 32132,
          keyword2: "原始格式",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "项目名称",
          valueparam1: 32132,
          keyword2: "制图单位",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "制图人员",
          valueparam1: 32132,
          keyword2: "拟编人员",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "审核人员",
          valueparam1: 32132,
          keyword2: "比例尺",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "制图日期",
          valueparam1: 32132,
          keyword2: "坐标系统",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "入库人员",
          valueparam1: 32132,
          keyword2: "入库地点",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "入库单位",
          valueparam1: 32132,
          keyword2: "关键词1",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "关键词2",
          valueparam1: 32132,
          keyword2: "关键词3",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "左下角X",
          valueparam1: 32132,
          keyword2: "左下角Y",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "右下角X",
          valueparam1: 32132,
          keyword2: "右下角Y",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "附属图ID",
          valueparam1: 32132,
          keyword2: "源文件ID",
          valueparam2: 323213,
        },
        {
          id: 1,
          keyword1: "备注",
          valueparam1: 32132,
        },
      ];
      let query_id = state.currentid;
      let url = `/api/wjproject/prequery`;
      proxy.$axios
        .get(url, {
          params: {
            _id: query_id,
            type: "NEXTQUERY",
          },
        })
        .then(({ data }) => {
          // 将json字符串转为json对象
          const data_json = JSON.parse(data);
          state.tableData = [
            {
              //   id: this.dataForm.headImg,
              id: 1,
              keyword1: "ID",
              valueparam1: data_json.id,
              keyword2: "文件名称",
              valueparam2: data_json.dataName,
            },
            {
              id: 1,
              keyword1: "档案号",
              valueparam1: data_json.dataNumber,
              keyword2: "原始格式",
              valueparam2: data_json.dataFormat,
            },
            {
              id: 1,
              keyword1: "项目名称",
              valueparam1: data_json.dataprojectname,
              keyword2: "制图单位",
              valueparam2: data_json.dataCompany,
            },
            {
              id: 1,
              keyword1: "制图人员",
              valueparam1: data_json.dataMaker2,
              keyword2: "拟编人员",
              valueparam2: data_json.dataMaker,
            },
            {
              id: 1,
              keyword1: "审核人员",
              valueparam1: data_json.dataMaker3,
              keyword2: "比例尺",
              valueparam2: data_json.dataScale,
            },
            {
              id: 1,
              keyword1: "制图日期",
              valueparam1: data_json.dataDate,
              keyword2: "坐标系统",
              valueparam2: data_json.dataCoordinate,
            },
            {
              id: 1,
              keyword1: "入库人员",
              valueparam1: data_json.dataAdmin,
              keyword2: "入库单位",
              valueparam2: data_json.dataStorageCompany,
            },
            {
              id: 1,
              keyword1: "入库地点",
              valueparam1: data_json.dataStorageLocation,
              keyword2: "关键词1",
              valueparam2: data_json.dataKeyWord1,
            },
            {
              id: 1,
              keyword1: "关键词2",
              valueparam1: data_json.dataKeyWord2,
              keyword2: "关键词3",
              valueparam2: data_json.dataKeyWord3,
            },
            {
              id: 1,
              keyword1: "左下角X",
              valueparam1: data_json.dataLeftX,
              keyword2: "左下角Y",
              valueparam2: data_json.dataLeftY,
            },
            {
              id: 1,
              keyword1: "右下角X",
              valueparam1: data_json.dataRightX,
              keyword2: "右下角Y",
              valueparam2: data_json.dataRightY,
            },
            {
              id: 1,
              keyword1: "附属图ID",
              valueparam1: data_json.imgList,
              keyword2: "源文件ID",
              valueparam2: data_json.fileList,
            },
            {
              id: 1,
              keyword1: "备注",
              valueparam1: data_json.dataIntro,
            },
          ];
          //   获取Base64
          // state.img_io = data_json["img_obj"]["$binary"];
          // 获取服务器URL
          if (data_json.img_name.split(".")[1] == "pdf") {
            console.log("PDF");
            state.show = false;
            state.pdfUrl = "/api/wjproject/media/" + data_json.img_name;
            // state.pdfUrl = "/api/wjproject/media/" + "开发文档.pdf";
          } else {
            console.log("图片");
            state.show = true;
          }
          // 获取服务器URL
          state.images = ["/api/wjproject/media/" + data_json.img_name];
          state.currentid = data_json.id;
        });
      state.loading = false;
    };

    // 全屏查看PDF
    const fullScreenView = () => {
      // alert("sucess");
      // state.dialogPDFVisible = true;
      state.drawer = true;
    };
    // 返回
    const goBack = () => {
      router.go(-1);
    };
    return {
      ...toRefs(state),
      proxy,
      goBack,
      init,
      columnStyle,
      objectSpanMethod,
      preBtn,
      nextBtn,
      fullScreenView,
    };
  },
};
</script>

<style lang="scss" scoped>
.pdfcontainer {
  width: 520px;
  height: 680px;
}
.overflowAuto {
  overflow-y: auto;
  position: absolute;
  width: 100%;
  height: 100%;
}
.overflowAuto::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.overflowAuto::-webkit-scrollbar-thumb {
  background: rgb(224, 214, 235);
}
</style>