<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-08-16 09:58:13
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-24 09:14:49
-->
<template>
  <div class="data-add">
    <el-card shadow="never">
      <template #header>
        <el-page-header
          @back="goBack"
          title="返回"
          content="批量数据入库"
        ></el-page-header>
      </template>
      <div class="content">
        <el-row :gutter="10">
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"
            ><div class="grid-content"></div
          ></el-col>
          <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22"
            ><div class="grid-content bg-purple-light">
              <!-- <div class="datainfo"></div> -->
              <div style="width: 95%; margin-left: 30px; margin-top: 30px">
                <p style="font-size: 20px">
                  <i class="el-icon-upload"></i> 上传文件信息如下：
                </p>
              </div>
              <el-form
                :model="dataForm"
                :rules="rules"
                ref="validateForm"
                label-width="100px"
              >
                <el-row>
                  <el-col :span="22">
                    <el-form-item label="批量文件" prop="fileList">
                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-button
                            ref="FileChose"
                            id="FileChose"
                            size="medium "
                            type="success"
                            plain
                            :disabled="!hasPerms()"
                            @click="getfileChose"
                            >选择文件</el-button
                          >
                          <el-button
                            size="medium "
                            type="success"
                            plain
                            :disabled="!hasPerms()"
                            @click="bulkUplaod"
                            >开始上传</el-button
                          >
                        </el-col>
                        <el-col :span="10">
                          <el-alert
                            style="padding: 0 16px"
                            title="上传压缩文件zip格式，包含excel，附属文件，源文件，大小请在10GB以内!"
                            type="success"
                          >
                          </el-alert>
                        </el-col>
                      </el-row>

                      <el-card style="margin-top: 20px">
                        <el-table :data="dataForm.fileList" style="width: 100%">
                          <!-- <el-table-column prop="id" label="文件id"></el-table-column> -->
                          <el-table-column
                            prop="name"
                            label="文件名称"
                          ></el-table-column>
                          <el-table-column
                            prop="type"
                            label="文件类型"
                          ></el-table-column>
                          <el-table-column
                            prop="size"
                            label="文件大小"
                            v-slot="{ row }"
                          >
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
                  </el-col>
                </el-row>
              </el-form>
            </div>

            <div style="width: 95%; margin-left: 30px; margin-top: 30px">
              <p style="font-size: 20px">
                <i class="el-icon-s-promotion"></i> 成功上传数据库信息如下：
              </p>
              <el-table :data="content" style="width: 100%" height="250"
                >>
                <el-table-column prop="dataName" label="文件名称">
                </el-table-column>
                <el-table-column prop="dataFormat" label="原始格式">
                </el-table-column>
                <el-table-column prop="dataNumber" label="档案号">
                </el-table-column>
                <el-table-column prop="dataCompany" label="制图单位">
                </el-table-column>
                <el-table-column prop="dataMaker" label="拟编人员">
                </el-table-column>
                <el-table-column prop="dataAdmin" label="入库人员">
                </el-table-column>
                <el-table-column prop="dataStorageCompany" label="入库单位">
                </el-table-column>
                <el-table-column prop="carouselImgName" label="附属文件">
                </el-table-column>
                <el-table-column prop="fileListName" label="源文件">
                </el-table-column>
              </el-table>
              <br />
            </div>
          </el-col>

          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1"
            ><div class="grid-content"></div
          ></el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, watch, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import plupload from "plupload";
import { ElMessage } from "element-plus";
export default {
  setup() {
    let { proxy } = getCurrentInstance();
    const router = useRouter();
    const state = reactive({
      dataForm: {
        fileList: [], //批量文件数据
      },
      dataInfo: [],
      // 源文件参数
      fileOptions: {
        browse_button: "FileChose", //触发文件选择对话框的按钮，为那个元素id
        url: "/api/wjproject/bulkdatastore/",
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
                "zip",
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
      uploder: "",
      // resSuccess: "", //上传成功信息
      content: [],
    });

    onMounted(async () => {
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
      let url = `/api/wjproject/bulkdatastore/`;
      // console.log(proxy.$axios);
      proxy.$axios.get(url).then(({ data }) => {
        // console.log("Demo");
        console.log(data);
        // console.log(state.fileOptions);
        state.fileOptions.multipart_params.uuid = data;
      });
    });

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
      // console.log(proxy);
      // console.log(file);
      // console.log(responseObject);
      // state.resSuccess = responseObject;
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
      webSocket();
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

    // let promise = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve("成功");
    //   }, 2000);
    // });

    const bulkUplaod = async () => {
      let tip = []; // 模仿要展示的数据
      let promiseList = []; // 异步请求列表
      const datalength = state.dataForm.fileList.length; //上传信息
      // console.log(state.dataForm.fileList);
      if (datalength == 0) {
        // console.log("请先添加文件信息");
        ElMessage.error("请先添加文件信息!");
      } else {
        // 获取上传成功信息
        //发送数据到后台
        state.uploader.start(); //上传源文件到服务器
        // 监听上传到数据库信息
        // webSocket();
        // for (let i = 0; i < datalength; i++) {
        //   let promise = new Promise((resolve) => {
        //     // 任务
        //     let posturl = `/api/wjproject/bulkdatastore/`;
        //     proxy
        //       .$axios({
        //         url: posturl,
        //         method: "POST",
        //         // data: state.dataInfo[i],
        //       })
        //       .then((res) => {
        //         console.log("success");
        //         // 统计成功信息
        //         // state.dataForm = state.dataInfo[i];

        //         tip.push(state.dataInfo[i]);
        //         resolve("成功");
        //         test();
        //       })
        //       .catch((err) => {
        //         console.log("网络错误");
        //       });
        //   });
        //   promiseList.push(promise); // 每个异步请求push到列表中
        // }
        // await Promise.all(promiseList).then(() => {
        //   // 等所有异步请求完成后执行,统计所有信息
        //   console.log("tip", tip);
        // });
      }
    };

    const webSocket = async () => {
      if (typeof WebSocket == "undefined") {
        proxy.$notify({
          title: "提示",
          message: "当前浏览器无法接收实时报警信息，请使用谷歌浏览器！",
          type: "warning",
          duration: 0,
        });
      } else {
        // 实例化socket
        // 开发测试
        // const socketUrl = "ws://127.0.0.1:8000/ws/wjproject/bulkuploadwebsocket/";
        // 上线测试
        // const socketUrl =
        //   "ws://genghenggao.top/ws/wjproject/bulkuploadwebsocket/";
        const socketUrl =
          "ws://" + location.host + "/ws/wjproject/bulkuploadwebsocket/";
        proxy.socket = new WebSocket(socketUrl);
        // 监听socket打开
        proxy.socket.onopen = function () {
          console.log("浏览器WebSocket已打开");
          //发送字符:
          proxy.socket.send(
            JSON.stringify({
              username: "xiao",
              msg: "hello",
            })
          );
        };
        // 监听socket消息接收
        proxy.socket.onmessage = function (msg) {
          // 追加到内容显示列表中
          const dataRes = JSON.parse(msg.data);
          console.log(dataRes);
          state.content.push({
            dataName: dataRes["文件名称"],
            dataFormat: dataRes["原始格式"],
            dataNumber: dataRes["档案号"],
            dataCompany: dataRes["制图单位"],
            dataMaker: dataRes["拟编人员"],
            dataAdmin: dataRes["入库人员"],
            dataStorageCompany: dataRes["入库单位"],
            carouselImgName: dataRes["附属文件"],
            fileListName: dataRes["源文件"],
          });
          // console.log(msg);
        };
        // 监听socket错误
        proxy.socket.onerror = function () {
          proxy.$notify({
            title: "错误",
            message: "上传的文件内容有误，请重新上传！",
            // message: "服务器错误，无法接收实时报警信息",
            type: "error",
            duration: 0,
          });
        };
        // 监听socket关闭
        proxy.socket.onclose = function () {
          console.log("WebSocket已关闭");
        };
      }
    };
    const test = () => {
      // console.log("外部函数");
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
    //  如果watch 监听的是响应式数据据对象,  要写成箭头函数形式
    watch(
      () => state.dataForm,
      (newvalue, oldvalue) => {
        // console.log("dataForm", newvalue, oldvalue);
      },
      {
        // 里边第三个参数
        deep: true, // 深度监听,监听对象中的每一个属性变化
        immediate: true, // 立即监听 (一进入页面就会监听到)
      }
    );
    // 返回
    const goBack = () => {
      router.go(-1);
    };
    return {
      ...toRefs(state),
      goBack,
      bulkUplaod,
      test,
      removeSourceFile, //删除源文件
      hasPerms,
    };
  },
};
</script>

<style lang='scss' scoped>
.data-add {
  padding-bottom: 4em;
}
.el-col {
  border-radius: 4px;
}
// .bg-purple-dark {
//   background: #99a9bf;
// }
// .bg-purple {
//   background: #d3dce6;
// }
// .bg-purple-light {
//   background: #e5e9f2;
// }
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

// .content {
//   // height: 200px;
//   // height: 100%;
// }

.datainfo {
  // clear: both;
  clear: both;
  // display: inline-block;
  padding-top: 100px;
}
</style>