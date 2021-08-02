<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-11 10:17:33
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-31 10:05:00
-->
<template>
  <div class="data-info">
    <el-card shadow="never">
      <template #header>
        <el-page-header
          @back="goBack"
          title="返回"
          content="数据列表"
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
                >搜素</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-button type="success" plain @click="resetList"
                >重置</el-button
              >
            </el-col>

            <el-col :span="1.5">
              <el-button type="danger" plain @click="addDataInfo"
                >上传</el-button
              >
            </el-col>
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
            ref="multipleTable"
            :data="tableData"
            border
            stripe
            style="width: 100%; margin: 0.5em 0"
            height="680"
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
                  round
                  @click="queryDataInfo(scope.row.id)"
                  >查看</el-button
                >

                <el-button
                  type="primary"
                  size="small"
                  round
                  @click="upDataInfo(scope.row.id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  round
                  @click="delDataInfo(scope.row.id)"
                  >删除</el-button
                >
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

export default {
  name: "DataList",
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
    });

    onMounted(() => {
      init(state.pageSize, state.currentPage);
      state.categorys = [
        { label: "国家2000", value: "1" },
        { label: "西安80", value: "2" },
        { label: "北京54", value: "3" },
        { label: "其他", value: "4" },
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
      router.push({
        path: "data-details",
        query: { id: id, type: "query" },
      });
      // console.log(id);
    };

    // 添加
    const addDataInfo = () => {
      router.push({ path: "data-add", query: { type: "add" } });
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
      router.push({
        path: "data-edit",
        query: { id: id, type: "edit" },
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
    };
  },
};
</script>

<style lang="scss">
@import "../assets/css/common.css";

.data-info {
  .content-main {
    .table-image {
      width: 45px;
      height: 45px;
    }
  }
}
</style>