<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-12 22:29:11
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-18 14:44:18
-->
<template>
  <div class="data-add">
    <el-card shadow="never">
      <template #header>
        <el-page-header
          @back="goBack"
          title="返回"
          content="单个数据入库"
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

          <!-- <el-row style="padding-bottom: 1em; padding-left: 85em">
            <el-col
              ><el-button type="primary" plain
                >从Excel数据导入</el-button
              ></el-col
            >
          </el-row> -->
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
              <!-- <el-form-item label="制图日期" required>
                <el-form-item prop="dataDate">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="dataForm.dataDate"
                    style="width: 75%"
                  ></el-date-picker>
                </el-form-item>
              </el-form-item> -->

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
                    :value="category.label"
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
          <el-row>
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

          <el-form-item label="附属文件" prop="carouselImg">
            <el-upload
              ref="uploadImg"
              accept=".jpg, .jpeg, .png, .tif, .gif , .pdf"
              action="/api/wjproject/"
              list-type="picture-card"
              :limit="1"
              :on-change="beforeAvatarUpload"
              :auto-upload="false"
              :on-success="handleSuccess"
            >
              <template #default>
                <i class="el-icon-plus"></i>
              </template>
              <template #file="{ file }">
                <div>
                  <img class="el-upload-list__item-thumbnail" :src="file.url" />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="qryImage(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="delImage(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <!-- 源文件 -->
          <el-form-item label="源文件" prop="fileList">
            <el-row>
              <el-button ref="FileChose" id="FileChose" size="medium "
                >选择文件</el-button
              >
            </el-row>
            <el-card style="margin-top: 20px">
              <el-table :data="dataForm.fileList" style="width: 100%">
                <!-- <el-table-column prop="id" label="文件id"></el-table-column> -->
                <el-table-column prop="name" label="文件名称"></el-table-column>
                <el-table-column prop="type" label="文件类型"></el-table-column>
                <el-table-column prop="size" label="文件大小" v-slot="{ row }">
                  {{ row.size }}MB
                </el-table-column>
                <el-table-column label="进度" v-slot="{ row }">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="16"
                    :percentage="row.percentage"
                  ></el-progress>
                </el-table-column>
                <el-table-column label="取消上传" v-slot="{ row }">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    circle
                    @click="removeSourceFile(row.id)"
                  ></el-button>
                </el-table-column>
                <el-table-column label="上传状态" v-slot="{ row }">
                  <el-link
                    :type="
                      row.loadType == 0
                        ? 'info'
                        : row.loadType == 1
                        ? 'warning'
                        : row.loadType == 2
                        ? 'success'
                        : 'danger'
                    "
                    :underline="false"
                    >{{
                      row.loadType == 0
                        ? "等待上传"
                        : row.loadType == 1
                        ? "正在上传"
                        : row.loadType == 2
                        ? "上传成功"
                        : "上传失败"
                    }}</el-link
                  >
                </el-table-column>
              </el-table>
            </el-card>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" :disabled="!hasPerms()" @click="submitForm"
              >立即提交</el-button
            >
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
        <el-dialog v-model="dialogVisible">
          <el-image width="100%" :src="imageItemUrl" />
        </el-dialog>
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

export default {
  components: {
    WangEditor,
  },
  // data() {
  //   return {
  //     fileListUpload: [],
  //     tableData2: [],
  //   };
  // },
  setup() {
    // 上线将ctx 换为proxy
    // const { ctx } = getCurrentInstance();
    let { proxy } = getCurrentInstance();
    const router = useRouter();
    const validateForm = ref(null);
    const uploadImg = ref(null);
    const tableData2 = ref(null); //Excel数据
    const state = reactive({
      uploadAction: "/api/wjproject/",
      imageItemUrl: "",
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
        // coverImg: "", // 主图
        carouselImg: "", // 附属图
        carouselImgName: "",
        // sourceFile:"", //源文件校验
        fileList: [], //源文件数据
        fileListName: "",
      },
      // 源文件参数
      fileOptions: {
        browse_button: "FileChose", //触发文件选择对话框的按钮，为那个元素id
        // url: "http://127.0.0.1:8000/load/uploadfile/",
        // url: "http://127.0.0.1:8000/seismic/hydrologicalinfo/",
        // url: "http://39.105.175.144:8001",
        url: "/api/wjproject/",
        flash_swf_url: "script/Moxie.swf",
        silverlight_xap_url: "script/Moxie.xap",
        // chunk_size: "10mb", //分块大小  ,注销掉或者改chunk_size：'0mb'为解决文件大于10M存为blob问题
        max_retries: 3,
        unique_names: true,
        multi_selection: false, //是否允许选择多文件
        views: {
          list: true,
          thumbs: true, // Show thumbs
          active: "thumbs",
        },
        filters: {
          mime_types: [
            //文件格式
            {
              title: "files",
              extensions:
                // "png,jpg,svg,mp4,rmvb,mpg,mxf,avi,mpeg,wmv,flv,mov,ts,docx,doc,pdf,segy,xls,xlsx,csv", //文件格式
                // "gif,bmp,jpeg,png,tiff,tif,pdf,prn,doc,xls,xlsx,dwg",
                "*",
            },
          ],
          max_file_size: "10240mb", //最大上传的文件
          prevent_duplicates: true, //不允许选取重复文件
        },
        multipart_params: {
          uuid: "", //参数
          // testparams: "Must can see me",
          // "testparams2": "Must can see me2"
        },
      },
      // 西安80参数选择
      categorys: [],
      uploder: "",
      // Excel
      // fileListUpload: [],
      // tableData2: [],
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
      // coverImg: [
      //   { required: true, message: "请上传报表主图", trigger: "blur" },
      // ],
      carouselImg: [
        { required: true, message: "请上传附属图", trigger: "blur" },
      ],
      fileList: [{ required: true, message: "请上传源文件", trigger: "blur" }],
    };

    onMounted(async () => {
      state.categorys = [
        { label: "国家2000", value: "1" },
        { label: "西安80", value: "2" },
        { label: "北京54", value: "3" },
        { label: "其他", value: "4" },
      ];
      // 源文件上传
      //实例化一个plupload上传对象

      const uploader = (state.uploader = new plupload.Uploader(
        state.fileOptions
      ));
      //实例化一个plupload上传对象
      // const uploader = computed(() => {
      //   return new plupload.Uploader(state.fileOptions);
      // });
      // console.log(uploader);
      uploader.init();
      //绑定进队列
      uploader.bind("FilesAdded", FilesAdded);
      //绑定进度
      uploader.bind("UploadProgress", UploadProgress);
      //上传之前
      uploader.bind("BeforeUpload", BeforeUpload);
      //上传成功监听
      uploader.bind("FileUploaded", FileUploaded);
      //获取uuid
      // let url = `http://127.0.0.1:8000/api/uploadinfo/`;
      // let url = `http://127.0.0.1:8000/seismic/hydrologicalinfo/`;
      // let url = `http://39.105.175.144:8001`;
      let url = `/api/wjproject/`;
      // console.log(proxy.$axios);
      proxy.$axios.get(url).then(({ data }) => {
        // console.log("Demo");
        // console.log(data);
        // console.log(state.fileOptions);
        state.fileOptions.multipart_params.uuid = data;
      });
    });
    // //实例化一个plupload上传对象
    // const uploader = computed(() => {
    //   return new plupload.Uploader(state.fileOptions);
    // });

    //绑定进队列
    const FilesAdded = (uploader, files) => {
      // console.log(this.form);
      // console.log(uploader);
      // console.log(files);
      // let data = this.form;
      // if (files[0].name.length > 25) {
      //   // $.messager.show("提示", "文件名称太长！", "info");
      //   // this.$message({
      //   //   type: "error",
      //   //   message: "文件名称太长！",
      //   // });
      //   ElMessage.error("文件名称太长！");
      //   return;
      // }
      if (uploader.files.length > 1) {
        // 最多上传3张图
        // $.messager.show("提示", "只能上传一个文件，请删除多余文件！", "info");
        // this.$message({
        //   type: "error",
        //   message: "只能上传一个文件,请先删除！",
        // });
        ElMessage.error("只能上传一个文件,请先删除！");
        uploader.removeFile(files[0]);
        return;
      }
      let objarr = files.map((val, ind) => {
        let obj = {};
        obj.id = val.id;
        obj.name = val.name;
        obj.type = val.type;
        // obj.upload_date = val.upload_date;
        obj.upload_date = new Date().toLocaleString(); //获取日期与时间
        // obj.publiser = val.publiser;
        obj.publisher = "publisher"; //获取当前登录用户信息
        obj.size = parseInt((val.origSize / 1024 / 1024) * 100) / 100;
        obj.percentage = 0;
        obj.loadType = 0;
        console.log(obj);
        return obj;
      });
      state.dataForm.fileList.push(...objarr);
      state.dataForm.fileListName = files[0].name;
      console.log(files[0].name);
    };

    // //上传之前回调
    const BeforeUpload = (uploader, file) => {
      // console.log(uploader);
      // console.log(file);
      state.dataForm.fileList = state.dataForm.fileList.map((val, ind) => {
        if (val.id == file.id) {
          val.loadType = 1;
        }
        //设置参数,发送给后端
        // console.log(state.dataForm.carouselImg.raw);
        // console.log(val.name);
        // console.log(state.dataForm["dataName"]);
        for (var tem_var in state.dataForm) {
          // console.log(val + ":" + state.dataForm[val]);
          if (!state.dataForm[tem_var]) {
            console.log("存在空值");
          } else {
            // const dataimg = state.dataForm.carouselImg;
            // const datafile = state.dataForm;
            state.uploader.setOption("multipart_params", state.dataForm);
            // state.uploader.setOption("multipart_params", {
            //   dataForm: state.dataForm,
            // });
          }
        }

        // console.log(val);
        uploader.settings.multipart_params.size = val.size;
        uploader.settings.multipart_params.id = val.id;
        // console.log(uploader);
        return val;
      });
    };
    //上传进度回调
    const UploadProgress = (uploader, file) => {
      console.log("上传进度回调");
      console.log(uploader);
      console.log(file);
      console.log(state.dataForm.fileList);
      state.dataForm.fileList = state.dataForm.fileList.map((val, ind) => {
        if (val.id == file.id) {
          val.percentage = file.percent;
        }
        return val;
      });
    };
    // 上传成功回调
    const FileUploaded = (uploader, file, responseObject) => {
      console.log("上传成功回调");
      console.log(proxy);
      console.log(file);
      state.dataForm.fileList = state.dataForm.fileList.map((val, ind) => {
        if (val.id == file.id) {
          // if (JSON.parse(responseObject.response).status == 0) {
          if (status == 0) {
            val.loadType = 2;
          } else {
            val.loadType = 3;
          }
        }
        return val;
      });
    };
    //取消上传回调
    const removeSourceFile = (id) => {
      console.log(id);
      console.log(state.uploader);
      state.uploader.removeFile(id);
      state.dataForm.fileList = state.dataForm.fileList.filter((val, ind) => {
        if (val.id == id) {
          return false;
        } else {
          return true;
        }
      });
    };

    // 判断按钮权限
    const hasPerms = () => {
      // return state.is_staff;
      if (
        localStorage.is_superuser == "true" ||
        localStorage.is_staff == "true"
      ) {
        return true;
      } else {
        return false;
      }
    };
    // Excel
    const handleChange = async (file, fileList) => {
      // console.log(tableData2);
      // console.log(file);
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
          //return arr
          // 把读取的excel表格中的内容放进tableData2中(这里要改成自己的表的名字)
          // console.log(tableData2);
          // tableData2 = tableData2.concat(arr);
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
      // console.log(proxy.$refs.validateForm);
      // proxy.$refs.validateForm.submit()

      // console.log(state.dataForm);
      // console.log(form);
      //发送数据到后台
      state.uploader.start(); //上传源文件
      console.log(proxy);
      proxy.$refs.uploadImg.submit();
      // // 附属图上传
      // const url = "/api/wjproject/";
      // proxy.$axios
      //   .post(
      //     url, // 根据后台需求数据格式
      //     {
      //       imgdata: state.dataForm.carouselImg,
      //       temp_data: "Demo",
      //       forminfo: form,
      //     }
      //   )
      //   .then((res) => {
      //     console.log("go here");
      //   });
    };
    // 重置
    const resetForm = () => {
      // console.log(state.dataForm.fileList);
      // console.log(state.dataForm.fileList[0].id);
      const file_id = state.dataForm.fileList[0].id;

      removeSourceFile(file_id);
      const form = unref(validateForm);
      // console.log(form);
      form.resetFields(); //清空字段
      // 清除附属图
      const uploadimglist = unref(uploadImg);
      uploadimglist.clearFiles();
    };
    // 返回
    const goBack = () => {
      router.go(-1);
    };

    // 上传图片格式校验
    const beforeAvatarUpload = (file) => {
      // console.log(file);
      // console.log(file.raw.type);
      // console.log(file.name.split('.')[1]);
      // const fileType = file.name.split('.')[1] //获取文件格式
      const fileType = file.raw.type; //获取文件格式
      const isJPG =
        fileType == "image/jpeg" ||
        fileType == "image/JPEG" ||
        fileType == "image/jpg" ||
        fileType == "image/JPG" ||
        fileType == "image/png" ||
        fileType == "image/PNG" ||
        fileType == "image/GIF" ||
        fileType == "image/gif" ||
        fileType == "image/TIF" ||
        fileType == "application/pdf" ||
        fileType == "image/tif";
      const isLt20M = file.raw.size / 1024 / 1024 < 20;
      if (!isJPG) {
        ElMessage.error({
          message: "上传图片只能是jpg、jpeg、png、gif、tif格式!",
          type: "error",
        });
        // 不满足，清除
        const uploadimglist = unref(uploadImg);
        uploadimglist.clearFiles();
      }
      // console.log(file.raw.size);
      if (!isLt20M) {
        ElMessage.error({
          message: "上传图片大小不能超过20MB!",
          type: "error",
        });
        // 不满足，清除
        const uploadimglist = unref(uploadImg);
        uploadimglist.clearFiles();
      }
      // state.dataForm.carouselImg.append('dataimg',file)
      state.dataForm.carouselImg = file.raw;
      state.dataForm.carouselImgName = file.raw.name;
      console.log(state.dataForm.carouselImg);

      // let fd = new FormData();
      // fd.append("imgfile", file);
      // console.log(state.dataForm.carouselImg);

      return isJPG && isLt20M;
    };

    //附属图上传
    const handleSuccess = (res, file) => {
      console.log("上传附属图专用打印");
      console.log(res);
      console.log(file);
      // 文件添加到到后端
      // console.log(file);
      // const url = "/api/wjproject/";
      // proxy.$axios
      //   .post(
      //     url, // 根据后台需求数据格式
      //     {
      //       formData: file.raw,
      //     }
      //   )
      //   .then((res) => {
      //     console.log("go here success");
      //   });
    };
    // 查看大图
    const qryImage = (file) => {
      state.imageItemUrl = file.url;
      state.dialogVisible = true;
      console.log(state.dataForm.carouselImg);
    };

    // 删除图片
    const delImage = (file) => {
      console.log("删除图片" + file.name);
      // file.url = "#"
      // for (let key in file) {
      //   delete file[key];
      // }
      // file.clearFiles();
      // console.log(file);
      const uploadimglist = unref(uploadImg);
      // console.log(uploadimglist);
      uploadimglist.clearFiles();
      // uploadimglist.resetFields();
      // this.$refs.uploadImg.clearFiles(); //移除已上传图片
      // console.log(file);
      // delete file;
      // if (file.length >= 1) {
      //   delete file[0];
      // }
    };

    return {
      ...toRefs(state),
      proxy, //获取当前组件实例

      goBack,
      validateForm,
      uploadImg,
      rules,
      submitForm,
      resetForm,
      qryImage,
      delImage,
      removeSourceFile, //删除源文件
      handleChange,
      beforeAvatarUpload,
      handleSuccess, //上传附属图
      // handleRemove,
      // importfxx,
      hasPerms,
    };
    // };
  },
};
</script>

<style lang="scss" scoped>
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