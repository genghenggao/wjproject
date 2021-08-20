<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-11 14:28:51
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-18 10:04:37
-->
<template>
  <div class="user-list">
    <el-card shadow="never">
      <template #header>
        <div class="clearfix">
          <!-- <el-image
            class="icon"
            :src="require('@/assets/image/icon/list.png')"
          /> -->
          <i class="el-icon-s-custom"></i>
          <span>用户列表</span>
        </div>
      </template>
      <div class="content">
        <div class="content-header">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-input
                v-model="keyword"
                placeholder="请输入用户信息"
              ></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="danger" @click="searchUser">搜索</el-button>
              <!-- <el-button type="danger" @click="init">添加用户</el-button> -->
              <el-button type="success" @click="resetList">重置</el-button>
              <el-button type="warning" @click="addUser">添加</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="content-main">
          <!-- <Table
            :datas="data"
            v-if="data.tableData.length"
            :index="false"
            :operation="operation"
            :loading="loading"
          ></Table> -->
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
                    :disabled="!hasPerms()"
                    @click="edit(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    v-if="operation.del"
                    type="danger"
                    size="small"
                    round
                    :disabled="!hasPerms()"
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
                  <el-button type="primary" plain @click="submitForm()"
                    >确认</el-button
                  >
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-dialog
              title="添加用户"
              v-model="dialogAddUserVisible"
              width="30%"
              center
            >
              <el-form
                :model="userForm"
                :rules="rules"
                ref="rForm"
                label-width="100px"
                class="demo-dynamic"
              >
                <el-form-item prop="username" label="用户名:">
                  <el-input
                    v-model="userForm.username"
                    prefix-icon="el-icon-user"
                    placeholder="请输入用户名称"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  prop="email"
                  label="邮箱:"
                  :rules="[
                    {
                      required: true,
                      message: '请输入邮箱地址',
                      trigger: 'blur',
                    },
                    {
                      type: 'email',
                      message: '请输入正确的邮箱地址',
                      trigger: ['blur', 'change'],
                    },
                  ]"
                >
                  <el-input
                    v-model="userForm.email"
                    prefix-icon="el-icon-message"
                    placeholder="请输入邮箱"
                  ></el-input>
                </el-form-item>
                <el-form-item label="权限:">
                  <el-checkbox-group v-model="userForm.type">
                    <el-checkbox label="高级用户" name="type"></el-checkbox>
                    <el-checkbox label="管理员" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item prop="password" label="密码:">
                  <el-input
                    type="password"
                    v-model="userForm.password"
                    prefix-icon="el-icon-lock"
                    show-password
                    placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="repassword" label="确认密码:">
                  <el-input
                    type="password"
                    v-model="userForm.repassword"
                    prefix-icon="el-icon-lock"
                    show-password
                    placeholder="请输入确认密码"
                  ></el-input>
                </el-form-item>
                <el-form-item class="login-body-button">
                  <el-button
                    class="login-submit"
                    type="info"
                    plain
                    round
                    @click="cancelAddUser"
                    >取消</el-button
                  >
                  <el-button
                    class="login-submit"
                    type="danger"
                    plain
                    round
                    :disabled="true"
                    v-if="!isLogin"
                    @click="submitAddUser(rForm)"
                    >注册</el-button
                  >
                  <el-button
                    class="login-submit"
                    type="danger"
                    plain
                    round
                    :loading="logining"
                    v-else-if="isLogin"
                    @click="submitAddUser(rForm)"
                    >注册</el-button
                  >
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
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
  inject,
  ref,
  unref,
  watch,
} from "vue";
// import Table from "@/components/Table";
import { useRouter } from "vue-router";
import { ElMessageBox, ElNotification, ElMessage } from "element-plus";

export default {
  components: {
    // Table,
  },
  setup() {
    let { proxy } = getCurrentInstance();
    // 验证用户名
    let checkUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        // callback();
        // 检查重名
        console.log(state.userForm.username);
        let url = `/api/checkuser/?username=` + state.userForm.username;
        proxy
          .$axios({
            url: url,
            method: "GET",
            responseType: "json",
          })
          .then((response) => {
            console.log(response);
            // 表示后端发送短信成功
            if (response.data.count > 0) {
              console.log("用户名已存在");
              // alert("用户名已存在了啊");
              callback(new Error("用户名已存在，请重新输入"));
            } else {
              callback();
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    };

    // 验证确定密码
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != state.userForm.password) {
        callback(new Error("两次密码不一致，请确认输入密码！"));
      } else {
        callback();
      }
    };
    const state = reactive({
      loading: true,
      keyword: "",
      operation: {
        flag: true,
        detail: false,
        edit: true,
        del: true,
      },
      index: "",
      tableTitle: [
        { prop: "username", label: "用户名" },
        // {prop:'nickname',label:'商户昵称'},
        // {prop:'phone',label:'联系电话'},
        // {prop:'openId',label:'唯一标识'},
        // {prop:'birthday',label:'商户生日'},
        // {prop:'sex',label:'性别'},
        { prop: "email", label: "邮箱" },
        //   { prop: "status", label: "状态" },
        { prop: "date_joined", label: "注册时间" },
        { prop: "is_staff", label: "高级用户" },
        { prop: "is_superuser", label: "管理员" },
        //   { prop: "regtime", label: "注册时间" },
      ],
      tableData: [],
      currentPage: 1,
      pageSizes: [10, 20, 50],
      pageSize: 10,
      total: 10,
      dialogPermissionVisible: false,
      dialogAddUserVisible: false,
      ruleForm: {
        username: "",
        type: [],
      },
      userForm: {
        username: "",
        email: "",
        password: "",
        repassword: "",
        type: [],
      },
      rules: {
        username: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          {
            // pattern: /^(?!(\d+)$)[a-zA-Z\d_]{4,20}$/,
            pattern: /^[a-zA-Z0-9_-]{6,20}$/,
            pattern: /^[a-zA-Z]\w{5,19}$/,
            message: "账号长度6-20，必须以字母开头,字母和数字",
            trigger: "blur",
          },
          { validator: checkUsername, trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            // pattern: /^(?!(\d+)$)[a-zA-Z\d_]{4,20}$/,
            pattern:
              /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,}$/,
            message: "账号长度6-20，必须包括数字字母特殊字符",
            trigger: "blur",
          },
        ],
        repassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            // pattern: /^(?!(\d+)$)[a-zA-Z\d_]{4,20}$/,
            pattern:
              /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,}$/,
            message: "账号长度6-20，必须包括数字字母特殊字符",
            trigger: "blur",
          },
          { validator: checkPassword, trigger: "blur" },
        ],
        email: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
      },
      logining: false,
      isLogin: false,
    });

    onMounted(() => {
      setTimeout(() => {
        init(state.pageSize, state.currentPage);
        state.loading = false;
      }, 300);
      // init(state.pageSize, state.currentPage);
      // state.loading = false;
      //   initBtn();
    });
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
    // 初始化数据
    const init = (n1, n2) => {
      let url = `/api/userpermission/`;

      proxy.$axios
        .get(url, {
          params: {
            pageSize: n1,
            currentPage: n2,
            username: localStorage.username,
          },
        })
        .then(({ data }) => {
          //   console.log(data);
          //   console.log(data.data.list);
          if (data.data.list != null) {
            //   有数据
            state.tableData = data.data.list;
            state.total = data.data.count;
            state.currentPage = 1;
            state.pageSize = 10;
          } else {
            //   没数据返回这个
            state.tableData = [
              {
                username: "user1",
                nickname: "张三",
                phone: "18850022005",
                openId: "15sdg5dsfb",
                birthday: "2001-12-12",
                sex: "男",
                email: "user1@163.com",
                status: "正常",
                is_staff: True,
                is_superuser: True,
                date_joined: "2021-01-20 12:52:12",
              },
              {
                username: "user1",
                nickname: "张三",
                phone: "18850022005",
                openId: "15sdg5dsfb",
                birthday: "2001-12-12",
                sex: "男",
                email: "user1@163.com",
                status: "正常",
                is_staff: True,
                is_superuser: True,
                date_joined: "2021-01-20 12:52:12",
              },
              {
                username: "user1",
                nickname: "张三",
                phone: "18850022005",
                openId: "15sdg5dsfb",
                birthday: "2001-12-12",
                sex: "男",
                email: "user1@163.com",
                status: "正常",
                is_staff: True,
                is_superuser: True,
                date_joined: "2021-01-20 12:52:12",
              },
              {
                username: "user1",
                nickname: "张三",
                phone: "18850022005",
                openId: "15sdg5dsfb",
                birthday: "2001-12-12",
                sex: "男",
                email: "user1@163.com",
                status: "正常",
                is_staff: True,
                is_superuser: True,
                date_joined: "2021-01-20 12:52:12",
              },
            ];
            state.data.currentPage = 1;
            state.data.pageSize = 1;
            state.data.total = 4;
          }
        })
        .catch((errot) => {
          console.log("网络错误");
        });
    };

    // 按钮状态
    // const initBtn = () => {
    //   console.log(localStorage.username);

    // };
    const detail = (val) => {
      console.log("detail:" + JSON.stringify(val));
    };

    const edit = (val) => {
      // router.push({ path: "goods-add", query: { value: val, type: "edit" } });
      // console.log("edit:" + JSON.stringify(val));
      state.dialogPermissionVisible = true;
      console.log(val);

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
      console.log(state.ruleForm);
      console.log(state.ruleForm.type);
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
            let url = `/api/userpermission/`;
            proxy
              .$axios({
                url: url,
                method: "DELETE",
                data: val,
              })
              .then((res) => {
                console.log("success");
              })
              .catch((res) => {
                console.log("网络错误");
              });
            init(10, 1);
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

    //搜索用户
    const searchUser = () => {
      let username = state.keyword;
      if (username != null && username != "") {
        // console.log(username);
        // console.log(state.tableData);
        const userList = state.tableData;

        for (let i = 0; i < userList.length; i++) {
          //   console.log(userList[i]["username"]);
          if (userList[i]["username"] == username) {
            state.index = i;
          } else {
            state.index = -1;
          }
        }
        if (state.index < 0) {
          ElMessage.error("不存在该用户,请重新输入!");
        } else {
          //   console.log(state.index);
          //   console.log(userList[state.index]);
          const datatmp = userList[state.index];
          state.tableData = [
            {
              username: datatmp["username"],
              email: datatmp["email"],
              is_staff: datatmp["is_staff"],
              is_superuser: datatmp["is_superuser"],
            },
          ];
          console.log(state.tableData);
        }
      }
    };

    // 重置表格数据
    const resetList = () => {
      console.log("重置表格");
      state.currentPage = 1;
      state.pageSize = 10;
      init(10, 1);
    };

    const addUser = () => {
      state.dialogAddUserVisible = true;
    };
    //取消添加
    const cancelAddUser = () => {
      state.dialogAddUserVisible = false;
    };

    const rForm = ref();
    const submitAddUser = (res) => {
      // console.log(rForm.value, "rForm.value");
      rForm.value.validate((valid) => {
        if (valid) {
          console.log(state.userForm, "state.userForm");
          let url = `/api/userpermission/`;
          proxy
            .$axios({
              url: url,
              method: "POST",
              data: state.userForm,
            })
            .then((res) => {
              console.log("success");
            })
            .catch((res) => {
              console.log("网络错误");
            });
          init(10, 1);
          ElNotification({
            title: "成功",
            message: "添加成功！",
            duration: 2000,
            type: "success",
          });
        } else {
          // console.log("error submit!!");
          ElMessage.error("信息错误，请确认信息!");
          return false;
        }
      });
    };

    // const userform = ref(UserForm);
    watch(state.userForm, (newValue, oldVlaue) => {
      console.log(newValue);
      console.log(oldVlaue);
      if (
        newValue.username != "" &&
        newValue.email != "" &&
        newValue.password != "" &&
        newValue.repassword != ""
      ) {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
      deep: true; //对象内部的属性监听，也叫深度监听
    });
    return {
      ...toRefs(state),
      init,
      //   initBtn,
      searchUser,
      detail,
      edit,
      del,
      onIndex,
      sizeChange,
      currentChange,
      submitForm,
      reload,
      resetList,
      hasPerms,
      addUser,
      checkUsername,
      checkPassword,
      submitAddUser,
      rForm,
      cancelAddUser,
    };
  },
};
</script>

<style lang="scss">
@import "../assets/css/common.css";

.user-list {
  padding-bottom: 4em;
}
</style>