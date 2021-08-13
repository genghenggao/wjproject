<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-11 14:33:26
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-11 20:27:57
-->
<template>
  <div class="table">
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%; margin: 1em 0"
      v-loading="loading"
      element-loading-text="拼命加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column
        v-if="index"
        label="ID"
        type="index"
        :index="onIndex"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        v-for="(title, t) in tableTitle"
        :key="t"
        show-overflow-tooltip
        :prop="title.prop"
        :label="title.label"
        :align="title.align != null ? title.align : 'center'"
        :width="title.width"
      />
      <el-table-column
        v-if="operation.flag"
        label="操作"
        align="center"
        width="210"
      >
        <template #default="scope">
          <el-button
            v-if="operation.detail"
            size="small"
            round
            @click="detail(scope.row)"
            >查看</el-button
          >
          <el-button
            v-if="operation.edit"
            type="primary"
            size="small"
            round
            @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="operation.del"
            type="danger"
            size="small"
            round
            @click="del(scope.row)"
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
      :pager-count="pagerCount"
      :total="total"
    />
    <el-dialog
      title="权限修改"
      v-model="dialogPermissionVisible"
      width="20%"
      center
    >
      <el-form ref="form" :model="ruleForm">
        <el-form-item label="权限选择:" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="高级用户" name="type"></el-checkbox>
            <el-checkbox label="管理员" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item style="padding-left: 120px">
          <el-button plain @click="dialogPermissionVisible = false"
            >取消</el-button
          >
          <el-button type="primary" plain @click="submitForm()">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs, inject } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox, ElNotification, ElMessage } from "element-plus";

export default {
  props: {
    loading: Boolean,
    index: Boolean,
    operation: Object,
    datas: Object,
  },
  setup(props) {
    let { proxy } = getCurrentInstance();
    const router = useRouter();
    const state = reactive({
      tableTitle: [],
      tableData: [],
      currentPage: 1,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      total: 0,
      dialogPermissionVisible: false,
      ruleForm: {
        username: "",
        type: [],
      },
    });

    onMounted(() => {
      if (props.datas != null) {
        state.tableTitle = props.datas.tableTitle;
        state.tableData = props.datas.tableData;
        state.currentPage = props.datas.currentPage;
        state.pageSize = props.datas.pageSize;
        state.total = props.datas.total;
      }
    });

    const detail = (val) => {
      console.log("detail:" + JSON.stringify(val));
    };

    const edit = (val) => {
      // router.push({ path: "goods-add", query: { value: val, type: "edit" } });
      // console.log("edit:" + JSON.stringify(val));
      state.dialogPermissionVisible = true;
      // console.log(val);
      state.ruleForm.username = val["username"];
      state.ruleForm.type = [];
      if (val["is_staff"] == true) {
        state.ruleForm.type.push("高级用户");
      }
      if (val["is_superuser"] == true) {
        state.ruleForm.type.push("管理员");
      }
      // console.log(state.ruleForm);
    };
    const reload = inject("reload");
    // reload();
    // 权限修改提交
    const submitForm = async () => {
      // console.log(state.ruleForm);
      // console.log(state.ruleForm.type);
      let url = `/api/userpermission/`;
      proxy
        .$axios({
          url: url,
          method: "PUT",
          data: state.ruleForm,
        })
        .then((res) => {
          // state.dialogPermissionVisible = false;
          console.log("success");
          ElMessage.success({
            message: "成功修改权限!",
            type: "success",
          });
          // proxy.reload;
          // 刷新表格
          reload();
        })
        .catch((err) => {
          console.log("网络错误");
        });
    };

    const del = (val) => {
      ElMessageBox.confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: (action) => {
          if ("confirm" == action) {
            console.log("del:" + JSON.stringify(val));
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

    const sizeChange = (val) => {
      state.pageSize = val;
    };

    const currentChange = (val) => {
      state.currentPage = val;
    };

    const onIndex = (index) => {
      return index + 1;
    };

    return {
      ...toRefs(state),
      detail,
      edit,
      del,
      onIndex,
      sizeChange,
      currentChange,
      submitForm,
      reload,
    };
  },
};
</script>

<style lang="scss">
</style>