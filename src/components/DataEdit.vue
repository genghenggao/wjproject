<template>
  <div class="data-add">
    <el-card shadow="never">
      <template #header>
        <el-page-header
          @back="goBack"
          title="返回"
          content="数据编辑"
        ></el-page-header>
      </template>
      <div class="content">
        <el-form
          :model="dataForm"
          :rules="rules"
          ref="validateForm"
          label-width="100px"
        >
          <!--  -->
          <div class="upload-excels">
            <div class="excel2">
              <el-upload
                class="upload-demo"
                action
                :on-change="handleChange"
                :show-file-list="true"
                :on-remove="handleRemove"
                :file-list="fileListUpload"
                :limit="1"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                :auto-upload="false"
              >
                <el-button size="small" type="primary">Excel数据导入</el-button>
                <div slot="tip" class="el-upload__tip">
                  注：只能上传xlsx/xls文件
                </div>
              </el-upload>
            </div>
          </div>

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
                  class="input-size"
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
                  class="input-size"
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
                  class="input-size"
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
                  class="input-size"
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

          <el-form-item>
            <el-button type="danger" @click="submitForm">立即提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
  unref,
} from "vue";
import { useRouter } from "vue-router";
import WangEditor from "@/components/WangEditor";
import { ElMessage } from "element-plus";
import plupload from "plupload";
import axios from "axios";
import { ElMessageBox, ElNotification } from "element-plus";

export default {
  components: {
    WangEditor,
  },

  setup() {
    let { proxy } = getCurrentInstance();
    const router = useRouter();
    const validateForm = ref(null);
    const tableData2 = ref(null); //Excel数据
    const state = reactive({
      uploadAction: "/api/wjproject/",
      dialogVisible: false,
      disabled: false,
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
        dataKeyWord2: "暂无", //关键词2
        dataKeyWord3: "暂无", //关键词3
        dataLeftX: "", // 左下角X
        dataLeftY: "", // 左下角Y
        dataRightX: "", // 右下角X
        dataRightY: "", // 右下角Y
        dataIntro: "", //备注信息
      },

      // 西安80参数选择
      categorys: [],
      uploder: "",
      toedit_id: "",
    });

    const rules = {
      dataName: [
        { required: true, message: "请输入文件名称", trigger: "blur" },
      ],
      dataNumber: [
        { required: true, message: "请输入档案号", trigger: "blur" },
      ],
      dataFormat: [
        { required: true, message: "请输入原始格式", trigger: "blur" },
      ],
      dataCompany: [
        { required: true, message: "请输入制图单位", trigger: "blur" },
      ],
      dataMaker: [
        { required: true, message: "请输入拟编人员", trigger: "blur" },
      ],
      dataMaker2: [
        { required: true, message: "请输入制图人员", trigger: "blur" },
      ],
      dataMaker3: [
        { required: true, message: "请输入审核人员", trigger: "blur" },
      ],
      dataDate: [
        {
          type: "date",
          required: true,
          message: "请选择日期",
          trigger: "change",
        },
      ],
      dataScale: [{ required: true, message: "请输入比例尺", trigger: "blur" }],
      dataIntro: [
        { required: true, message: "请输入报表描述", trigger: "blur" },
      ],
      dataCoordinate: [
        { required: true, message: "请选择坐标系统", trigger: "blur" },
      ],
      dataAdmin: [
        { required: true, message: "请输入入库人员", trigger: "blur" },
      ],
      dataReview: [
        { required: true, message: "请输入入库审核", trigger: "blur" },
      ],
      dataStorageCompany: [
        { required: true, message: "请输入入库单位", trigger: "blur" },
      ],
      dataStorageLocation: [
        { required: true, message: "请输入入库地点", trigger: "blur" },
      ],
      dataKeyWord1: [
        { required: true, message: "请输入关键词1", trigger: "blur" },
      ],
      dataKeyWord2: [
        { required: true, message: "请输入关键词2", trigger: "blur" },
      ],
      dataKeyWord3: [
        { required: true, message: "请输入关键词3", trigger: "blur" },
      ],
      dataprojectname: [
        { required: true, message: "请输入项目名称", trigger: "blur" },
      ],
      dataLeftX: [
        { required: true, message: "请输入左下角X", trigger: "blur" },
      ],
      dataLeftY: [
        { required: true, message: "请输入左下角Y", trigger: "blur" },
      ],
      dataRightX: [
        { required: true, message: "请输入右下角X", trigger: "blur" },
      ],
      dataRightY: [
        { required: true, message: "请输入右下角Y", trigger: "blur" },
      ],
    };

    onMounted(async () => {
      init();
      state.categorys = [
        { label: "国家2000", value: "1" },
        { label: "西安80", value: "2" },
        { label: "北京54", value: "3" },
        { label: "其他", value: "4" },
      ];
    });
    const init = () => {
      let url = `/api/wjproject/query`;
      let edit_id = proxy.$route.query.id;
      // 获取get数据返回
      proxy.$axios
        .get(url, {
          params: {
            _id: edit_id,
            type: "EDIT",
          },
        })
        .then(({ data }) => {
          console.log(data);
          const data_json = JSON.parse(data);
          console.log(data_json["id"]);
          state.toedit_id = data_json["id"];
          state.dataForm = data_json;
        });
    };
    // Excel
    const handleChange = async (file, fileList) => {
      const fileTemp = file.raw;
      if (fileTemp) {
        if (
          fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          fileTemp.type == "application/vnd.ms-excel"
        ) {
          importfxx(fileTemp);
        }
      }
    };

    const importfxx = async (obj) => {
      // console.log("test");
      // 通过DOM取文件数据
      // file = obj;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = obj;
      var reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function (f) {
        // console.log("demo");
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是读取excel内容之后输出的东西
          // console.log(outdata);
          // console.log(outdata[0].文件名称);
          const excel_data = outdata[0];
          // console.log(state.dataForm);
          state.dataForm.dataName = excel_data.文件名称;
          state.dataForm.dataNumber = excel_data.档案号;
          state.dataForm.dataFormat = excel_data.原始格式;
          state.dataForm.dataCompany = excel_data.制图单位;
          state.dataForm.dataMaker = excel_data.拟编人员;
          state.dataForm.dataMaker2 = excel_data.制图人员;
          state.dataForm.dataMaker3 = excel_data.审核人员;
          state.dataForm.dataDate = excel_data.制图日期;
          state.dataForm.dataScale = excel_data.比例尺;
          state.dataForm.dataIntro = excel_data.描述;
          state.dataForm.dataCoordinate = excel_data.坐标系统;
          state.dataForm.dataAdmin = excel_data.入库人员;
          state.dataForm.dataReview = excel_data.数据审核;
          state.dataForm.dataStorageCompany = excel_data.入库单位;
          state.dataForm.dataStorageLocation = excel_data.入库地点;
          state.dataForm.dataKeyWord1 = excel_data.关键词1;
          state.dataForm.dataKeyWord2 = excel_data.关键词2;
          state.dataForm.dataKeyWord3 = excel_data.关键词3;
          state.dataForm.dataprojectname = excel_data.项目名称;
          state.dataForm.dataLeftX = excel_data.左下角X;
          state.dataForm.dataLeftY = excel_data.左下角Y;
          state.dataForm.dataRightX = excel_data.右下角X;
          state.dataForm.dataRightY = excel_data.右下角Y;
          state.dataForm.dataRightY = excel_data.右下角Y;
          state.dataForm.dataIntro = excel_data.备注信息;
          // console.log(excel_data.制图日期);
          // console.log(state.dataForm);
          this.da = [...outdata];
          let arr = [];
          this.da.map((v) => {
            let obj = {};
            obj.ip = v["ip"]; //ip是表的标题
            arr.push(obj);
          });
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    };

    // 提交
    const submitForm = async (content) => {
      console.log("提交任务");
      const form = unref(validateForm);
      if (!form) {
        return;
      }
      await form.validate();
      //发送数据到后台
      // proxy.$refs.validateForm.submit();
      console.log(state.toedit_id);
      // 根据_id进行修改数据
      ElMessageBox.confirm("确定修改该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: (action) => {
          if ("confirm" == action) {
            console.log("提交：" + state.toedit_id);
            let url = `/api/wjproject/query/`;
            let edit_id = state.toedit_id;
            // console.log(edit_id);
            // console.log(state.dataForm);
            // 获取数据返回
            proxy.$axios
              .put(url, {
                _id: edit_id,
                upatate_data: state.dataForm,
              })
              .then(({ data }) => {
                console.log(data);
              });
            ElNotification({
              title: "成功",
              message: "修改成功！",
              duration: 2000,
              type: "success",
            });
          }
        },
      });
    };
    // 重置
    const resetForm = () => {
      const form = unref(validateForm);
      // console.log(form);
      form.resetFields(); //清空字段
    };
    // 返回
    const goBack = () => {
      router.go(-1);
    };

    return {
      ...toRefs(state),
      proxy, //获取当前组件实例
      goBack,
      init,
      validateForm,
      rules,
      submitForm,
      resetForm,
      handleChange,
    };
    // };
  },
};
</script>

<style lang="scss">
.data-add {
  padding-bottom: 4em;
  .input-size {
    width: 25em;
  }
  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}

.upload-excels {
  width: 100%;
  padding-bottom: 1em;
  // padding-left: 85em;
  padding-left: 85%;
  // height: 300px;
  .excel2 {
    width: 200px;
    height: 100px;
    border: 1px solid rgb(77, 177, 235);
  }
}
</style>