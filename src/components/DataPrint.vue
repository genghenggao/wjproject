<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-08-09 09:49:08
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-18 10:04:08
-->
<template>
  <div class="data-info">
    <el-card shadow="never">
      <template #header>
        <el-page-header
          @back="goBack"
          title="返回"
          content="数据打印"
        ></el-page-header>
      </template>
      <div class="content">
        <div class="content-header">
          <el-row :gutter="20" style="">
            <el-col :span="4" :offset="13">
              <el-input
                v-model="keyword"
                placeholder="请输入文件名称"
              ></el-input>
            </el-col>

            <el-col :span="1.5">
              <el-button type="primary" plain @click="searchDataInfo"
                >搜索</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-button type="success" plain @click="resetList"
                >重置</el-button
              >
            </el-col>

            <el-col :span="1.5">
              <el-button type="danger" plain @click="printDataMore"
                >打印表格</el-button
              >
            </el-col>
            <!-- <el-col :span="1.5">
              <el-button type="danger" plain @click="addDataInfo"
                >上传</el-button
              >
            </el-col> -->
            <el-col :span="2.5">
              <el-button
                type="text"
                @click="dialogFormVisible = true"
                style="font-size: 18px; padding-top: 10px"
                >高级检索<i class="el-icon-view el-icon--right"></i
              ></el-button>
            </el-col>
          </el-row>
        </div>
        <div class="content-main">
          <el-table
            id="myTable"
            ref="multipleTable"
            :data="tableData"
            border
            stripe
            style="width: 100%; margin: 0.5em 0"
            @selection-change="handleSelectionChange"
            height="620"
            v-loading="loading"
            element-loading-text="拼命加载中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              fixed
              prop="dataName"
              label="文件名称"
              align="center"
              show-overflow-tooltip
            />

            <el-table-column
              prop="dataFormat"
              label="数据格式"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="dataprojectname"
              label="项目名称"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="dataCompany"
              label="制图单位"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="dataMaker2"
              label="制图人员"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              label="制图日期"
              align="center"
              show-overflow-tooltip
            >
              <template #default="scope">
                <span>{{ scope.row.dataDate }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="dataAdmin"
              label="入库人员"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="dataStorageCompany"
              label="入库单位"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column
              prop="dataKeyWord1"
              label="关键词1"
              align="center"
              show-overflow-tooltip
            />
            <el-table-column label="操作" align="center" width="210">
              <template #default="scope">
                <el-button
                  size="small"
                  type="danger"
                  plain
                  @click="queryDataInfo(scope.row.id)"
                  >打印数据</el-button
                >
                <!-- <el-button
                  size="small"
                  type="success"
                  plain
                  @click="printJson(scope)"
                  >打印</el-button
                > -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="padding-left: 550px"
            @size-change="sizeChange"
            @current-change="currentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            :total="total"
          />
          <el-dialog title="高级检索" v-model="dialogFormVisible" center>
            <el-form
              :model="dataForm"
              :rules="rules"
              ref="validateForm"
              label-width="100px"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="文件名称" prop="dataName">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataName"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="档案号" prop="dataNumber">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataNumber"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="原始格式" prop="dataFormat">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataFormat"
                      maxlength="20"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="项目名称" prop="dataprojectname">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataprojectname"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="制图单位" prop="dataCompany">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataCompany"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="拟编人员" prop="dataMaker">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataMaker"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="制图人员" prop="dataMaker2">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataMaker2"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="审核人员" prop="dataMaker3">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataMaker3"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="比例尺" prop="dataScale">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataScale"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="制图日期" prop="dataDate">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataDate"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="坐标系统" prop="dataCoordinate">
                    <el-select
                      class="input-size"
                      v-model="dataForm.dataCoordinate"
                      filterable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(category, c) in categorys"
                        :key="c"
                        :label="category.label"
                        :value="category.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="入库人员" prop="dataAdmin">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataAdmin"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="数据审核" prop="dataReview">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataReview"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="入库单位" prop="dataStorageCompany">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataStorageCompany"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="入库地点" prop="dataStorageLocation">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataStorageLocation"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="关键词1" prop="dataKeyWord1">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataKeyWord1"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="关键词2" prop="dataKeyWord2">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataKeyWord2"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="关键词3" prop="dataKeyWord3">
                    <el-input
                      class="input-size"
                      v-model="dataForm.dataKeyWord3"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="border-radius: 2px">
                <el-col :span="8">
                  <el-form-item label="左下角X" prop="dataLeftX">
                    <el-input
                      v-model="dataForm.dataLeftX"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="左下角Y" prop="dataLeftY">
                    <el-input
                      v-model="dataForm.dataLeftY"
                      controls-position="right"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="右下角X" prop="dataRightX">
                    <el-input
                      v-model="dataForm.dataRightX"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="右下角Y" prop="dataRightY">
                    <el-input
                      v-model="dataForm.dataRightY"
                      maxlength="20"
                      minlength="4"
                      autocomplete="off"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="备注信息" prop="dataIntro">
                <el-input
                  class="input-size"
                  type="textarea"
                  v-model="dataForm.dataIntro"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  maxlength="180"
                  show-word-limit
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="info" plain @click="resetForm"
                  >重 置</el-button
                >
                <el-button
                  @click="dialogFormVisible = false"
                  type="warning"
                  plain
                  >取 消</el-button
                >
                <el-button type="danger" plain @click="advanceSearch"
                  >检 索</el-button
                >
              </span>
            </template>
          </el-dialog>
          <el-dialog
            title="打印字段信息"
            v-model="dialogPrintVisible"
            width="36%"
            center
          >
            <el-transfer
              v-model="value"
              :data="select_data"
              :titles="select_field"
            />
            <div style="padding-top: 20px; padding-left: 480px">
              <el-button type="danger" plain @click="printData"
                >确认打印</el-button
              >
            </div>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
  ref,
  unref,
} from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox, ElNotification, ElMessage } from "element-plus";
import print from "vue3-print-nb";
import pdf from "@/components/pdf/pdf";
import PDFView from "@/components/PDFView";
import printJS from "print-js";

export default {
  name: "DataList",
  components: {
    pdf,
    PDFView,
  },
  directives: {
    print,
  },
  setup() {
    let { proxy } = getCurrentInstance();
    const router = useRouter();
    const validateForm = ref(null);
    const state = reactive({
      keyword: "",
      loading: true,
      tableData: [],
      currentPage: 1,
      pageSizes: [10, 20, 50, 100],
      pageSize: 10,
      total: 100,
      dialogFormVisible: false,
      dataForm: {
        dataName: "", // 文件名称
        dataNumber: "", // 档案号
        dataFormat: "", // 原始格式
        dataprojectname: "", //项目名称
        dataCompany: "", // 制图单位
        dataMaker: "", // 拟编人员
        dataMaker2: "", // 制图人员
        dataMaker3: "", // 审核人员
        dataDate: "", //制图日期
        dataScale: "", //比例尺
        dataCoordinate: "", // 坐标系统
        dataAdmin: "", // 入库人员
        dataReview: "", // 数据审核
        dataStorageCompany: "", //入库单位
        dataStorageLocation: "", //入库地点
        dataKeyWord1: "", //关键词1
        dataKeyWord2: "", //关键词2
        dataKeyWord3: "", //关键词3
        dataLeftX: "", // 左下角X
        dataLeftY: "", // 左下角Y
        dataRightX: "", // 右下角X
        dataRightY: "", // 右下角Y
        dataIntro: "", //备注信息
      },
      formLabelWidth: "120px",
      // 西安80参数选择
      categorys: [],
      isSearch: false, //用于判断是否点击过搜索
      isAdvanceSearch: false, //用于判断是否点击过搜索
      //   打印参数
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
      printObj: {
        beforeOpenCallback(vue) {
          vue.printLoading = true;
          console.log("打开之前");
        },
        openCallback(vue) {
          vue.printLoading = false;
          console.log("执行了打印");
        },
        closeCallback(vue) {
          console.log("关闭了打印工具");
        },
      },
      dataprintinfo: "",
      multipleSelection: [], //选中表格
      dialogPrintVisible: false,
      select_data: [], //穿梭框数据表1
      value: [2, 3, 4, 5], //穿梭框表2
      select_field: ["可选字段", "已选字段"],
      select_print: "",
    });

    onMounted(() => {
      init(state.pageSize, state.currentPage);
      state.categorys = [
        { label: "国家2000", value: "1" },
        { label: "西安80", value: "2" },
        { label: "北京54", value: "3" },
        { label: "其他", value: "4" },
      ];
      //   generateData(); //   初始化穿梭框数据
      state.select_data = [
        {
          key: 1,
          label: `ID`,
        },
        {
          key: 2,
          label: `文件名称`,
          disabled: true,
        },
        {
          key: 3,
          label: `档案号`,
        },
        {
          key: 4,
          label: `原始格式`,
        },

        {
          key: 5,
          label: `制图单位`,
        },
        {
          key: 6,
          label: `制图人员`,
        },
        {
          key: 7,
          label: `拟编人员`,
        },
        {
          key: 8,
          label: `审核人员`,
        },
        {
          key: 9,
          label: `比例尺`,
        },
        {
          key: 10,
          label: `制图日期`,
        },
        {
          key: 11,
          label: `坐标系统`,
        },
        {
          key: 12,
          label: `入库人员`,
        },
        {
          key: 13,
          label: `入库单位`,
        },
        {
          key: 14,
          label: `入库地点`,
        },
        {
          key: 15,
          label: `关键词1`,
        },
        {
          key: 16,
          label: `关键词2`,
        },
        {
          key: 17,
          label: `关键词3`,
        },
        {
          key: 18,
          label: `项目名称`,
        },
        {
          key: 19,
          label: `左下角X`,
        },
        {
          key: 20,
          label: `左下角Y`,
        },
        {
          key: 21,
          label: `右下角X`,
        },
        {
          key: 22,
          label: `右下角Y`,
        },
        {
          key: 23,
          label: `附属图ID`,
        },
        {
          key: 24,
          label: `源文件ID`,
        },
        {
          key: 25,
          label: `备注`,
        },
      ];
    });

    // 初始化数据
    const init = (n1, n2) => {
      console.log(
        "currentPage:" + state.currentPage + ",pageSize:" + state.pageSize
      );
      state.tableData = [
        {
          dataName: "文件1",
          dataFormat: "CAD",
          dataprojectname: "武甲",
          dataCompany: "武甲",
          dataMaker2: "张先生",
          dataDate: "2016-05-02",
          dataAdmin: "张先生",
          dataStorageCompany: "武甲",
          dataKeyWord1: "图",
        },
        {
          dataName: "文件1",
          dataFormat: "CAD",
          dataprojectname: "武甲",
          dataCompany: "武甲",
          dataMaker2: "张先生",
          dataDate: "2016-05-02",
          dataAdmin: "张先生",
          dataStorageCompany: "武甲",
          dataKeyWord1: "图",
        },
      ];
      let url = `/api/wjproject/`;
      // console.log(proxy.$axios);
      proxy.$axios
        .get(url, {
          params: {
            pageSize: n1,
            currentPage: n2,
          },
        })
        .then(({ data }) => {
          // console.log(data);
          // console.log(data.data.list);
          if (data.data.list != null) {
            state.tableData = data.data.list;
            state.total = data.data.count;
          }
        })
        .catch((errot) => {
          console.log("网络错误");
        });

      state.loading = false;
    };

    // 详情
    const queryDataInfo = (id) => {
      localStorage.query_id = id;
      router.push({
        path: "/data-details",
        // query: { id: id, type: "query" },
      });
      // console.log(id);
    };
    // 打印详情
    const printDataInfo = (id) => {
      localStorage.query_id = id;
      console.log(id);
      state.printObj = {
        id: "print_demo",
        popTitle: "打印的标题",
        extraCss:
          "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      };
    };

    // 选择数据
    const handleSelectionChange = (val) => {
      // 将选中的值添加到multipleSelection中
      //   console.log(val);
      state.select_print = val;
      //   state.multipleSelection = [];
      //   for (let key in val) {
      //     // console.log(val[key].id);
      //     state.multipleSelection.push(val[key].id);
      //   }
    };

    // 批量打印选中
    const printDataMore = () => {
      // console.log(state.multipleSelection);
      // 获取选中的值multipleSelection
      if (state.select_print.length == 0) {
        ElMessage.error("请至少选择一个文件！");
      } else {
        //   选择打印字段
        state.dialogPrintVisible = true;
      }
    };
    // 确认打印
    const printData = () => {
      console.log(state.select_print);
      console.log(state.value);
      //   根据value获取字段
      const print_field = [
        "ID",
        "文件名称",
        "档案号",
        "原始格式",
        // "项目名称",
        `制图单位`,
        `制图人员`,
        `拟编人员`,
        `审核人员`,
        `比例尺`,
        `制图日期`,
        `坐标系统`,
        `入库人员`,
        `入库单位`,
        `入库地点`,
        `关键词1`,
        `关键词2`,
        `关键词3`,
        "项目名称",
        `左下角X`,
        `左下角Y`,
        `右下角X`,
        `右下角Y`,
        `附属图ID`,
        `源文件ID`,
        `备注`,
      ];
      //   获取数据对应key值，与state.value-1
      const print_field_sure = Object.keys(state.select_print[0]);
      //   console.log(print_field_sure);
      const print_arr = [];
      for (var i = 0; i < state.value.length; i++) {
        // console.log(state.value[i]);
        const print_field_name = print_field_sure[state.value[i] - 1];
        const print_field_tmp = print_field[state.value[i] - 1];
        const printjson = {
          field: print_field_name,
          displayName: print_field_tmp,
          columnSize: 1,
        };
        // console.log(printjson);
        print_arr.push(printjson);
      }

      printJS({
        printable: state.select_print,
        properties: print_arr,
        type: "json",
        header: "武甲图纸管理系统",
        // 样式设置
        gridStyle: "border: 2px solid #3971A5;",
        gridHeaderStyle: "color: red;  border: 2px solid #3971A5;",
      });
    };

    const printJson = async (scope) => {
      console.log(scope);
      console.log(scope.row);

      let id = "myTable";
      const html = document.querySelector("#" + id).innerHTML;
      // 新建一个 DOM
      const div = document.createElement("div");
      const printDOMID = "printDOMElement";
      div.id = printDOMID;
      div.innerHTML = html;

      // 提取第一个表格的内容 即表头
      const ths = div.querySelectorAll(".el-table__header-wrapper th");
      const ThsTextArry = [];
      for (let i = 0, len = ths.length; i < len; i++) {
        if (ths[i].innerText !== "") ThsTextArry.push(ths[i].innerText);
      }

      // 删除多余的表头
      div.querySelector(".hidden-columns").remove();
      // 第一个表格的内容提取出来后已经没用了 删掉
      div.querySelector(".el-table__header-wrapper").remove();

      // 将第一个表格的内容插入到第二个表格
      let newHTML = "<tr>";
      for (let i = 0, len = ThsTextArry.length; i < len; i++) {
        newHTML +=
          '<td style="text-align: center; font-weight: bold">' +
          ThsTextArry[i] +
          "</td>";
      }

      newHTML += "</tr>";
      div
        .querySelector(".el-table__body-wrapper table")
        .insertAdjacentHTML("afterbegin", newHTML);
      // 将新的 DIV 添加到页面 打印后再删掉
      document.querySelector("body").appendChild(div);

      printJS({
        printable: printDOMID,
        type: "html",
        scanStyles: false,
        style: "table { border-collapse: collapse }", // 表格样式
      });

      div.remove();
    };
    // 添加
    const addDataInfo = () => {
      // router.push({ path: "data-add", query: { type: "add" } });
      router.push({ path: "/doc-add" });
    };

    // 删除
    const delDataInfo = (id) => {
      ElMessageBox.confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: (action) => {
          if ("confirm" == action) {
            console.log("提交：" + id);
            let url = `/api/wjproject/query/`;
            // 获取数据返回
            proxy.$axios
              .delete(url, {
                data: { _id: id },
              })
              .then(({ data }) => {
                console.log(data);
              });
            init();
            ElNotification({
              title: "成功",
              message: "删除成功！",
              duration: 2000,
              type: "success",
            });
          }
        },
      });
    };

    // 编辑
    const upDataInfo = (id) => {
      localStorage.edit_id = id;
      router.push({
        path: "/data-edit",
        // query: { id: id, type: "edit" },
      });
      console.log(id);
    };

    // 搜索
    const searchDataInfo = (n1, n2) => {
      console.log("搜索");
      let keyword = state.keyword;
      if (keyword == null || keyword == "") {
        keyword = null;
        ElMessage.error("请输入需要查询的文件名！");
      } else {
        console.log(keyword);
        let url = `/api/wjproject/searchdatainfo/`;
        // console.log(proxy.$axios);
        proxy.$axios
          .get(url, {
            params: {
              pageSize: n1,
              currentPage: n2,
              // 搜索字段
              search_key: keyword,
            },
          })
          .then(({ data }) => {
            console.log(data);
            // console.log(data.data.list);
            state.tableData = data.data.list;
            state.total = data.data.count;
            state.currentPage = 1;
            // 判断是否检索
            state.isSearch = true;
          });
      }
    };

    // 高级检索
    const advanceSearch = (n1, n2) => {
      state.dialogFormVisible = false;
      console.log("高级检索");
      console.log(state.dataForm);
      let url = `/api/wjproject/advancesearch/`;
      // console.log(proxy.$axios);
      proxy.$axios
        .get(url, {
          params: {
            pageSize: n1,
            currentPage: n2,
            // 搜索字段
            data: state.dataForm,
          },
        })
        .then(({ data }) => {
          // console.log(data);
          // console.log(data.data.list);
          state.tableData = data.data.list;
          state.total = data.data.count;
          state.currentPage = 1;
          // 判断是否检索
          state.isSearch = true;
          state.isAdvanceSearch = true;
        });
    };

    const sizeChange = (val) => {
      console.log(`每页 ${val} 条`);
      state.pageSize = val;
      console.log(state.pageSize);
      console.log(state.currentPage);
      if (!state.isSearch) {
        init(val, state.currentPage);
      } else {
        if (!state.isAdvanceSearch) {
          searchDataInfo(val, 1);
        } else {
          advanceSearch(val, 1);
        }
        // searchDataInfo(val, state.currentPage);
      }
    };

    const currentChange = (val) => {
      console.log(`当前页: ${val}`);
      state.currentPage = val;
      // console.log(state.currentPage);
      if (!state.isSearch) {
        init(state.pageSize, val);
      } else {
        if (!state.isAdvanceSearch) {
          searchDataInfo(state.pageSize, val);
        } else {
          advanceSearch(state.pageSize, val);
        }
        // searchDataInfo(state.pageSize, val);
      }
    };
    // 重置高级搜索字段
    const resetForm = () => {
      const form = unref(validateForm);
      // console.log(form);
      form.resetFields(); //清空字段
    };
    // 重置表格数据
    const resetList = () => {
      console.log("重置表格");
      state.isSearch = false;
      state.isAdvanceSearch = false;
      state.currentPage = 1;
      state.pageSize = 10;
      init(10, 1);
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
    // 返回
    const goBack = () => {
      router.go(-1);
    };
    return {
      ...toRefs(state),
      goBack,
      init,
      validateForm,
      queryDataInfo,
      addDataInfo,
      delDataInfo,
      upDataInfo,
      sizeChange,
      currentChange,
      resetForm,
      resetList,
      searchDataInfo,
      advanceSearch,
      columnStyle,
      objectSpanMethod,
      printDataInfo,
      printJson,
      handleSelectionChange,
      printJS,
      printDataMore,
      printData,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/common.css";

.data-info {
  padding-bottom: 4em;
  .content-main {
    .table-image {
      width: 45px;
      height: 45px;
    }
  }
}
</style>