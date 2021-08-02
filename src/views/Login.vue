<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-11 14:54:54
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-29 14:55:02
-->
<template>
  <div class="login" :style="login">
    <el-row :gutter="10" class="login-header">
      <p>武甲图纸管理系统</p>
    </el-row>
    <el-row :gutter="10" class="login-container">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="validateForm"
        label-width="1em"
        class="login-body"
        hide-required-asterisk="false"
      >
        <el-image class="login-logo" :src="logoImg"></el-image>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="imgCode">
          <el-row>
            <el-col :span="14">
              <el-input
                v-model="loginForm.imgCode"
                prefix-icon="el-icon-message"
                placeholder="请输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="9" :offset="1">
              <VueImgVerify ref="verifyRef"></VueImgVerify>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="text">忘记密码？</el-button>
        </el-form-item>
        <el-form-item class="login-body-button">
          <el-button class="login-submit" type="danger" round @click="submit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import {
  onBeforeMount,
  reactive,
  ref,
  toRefs,
  unref,
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { userlogin } from "@/api/serviceApi";
import { ElMessage } from "element-plus";
import VueImgVerify from "@/components/VueImageVerify";
export default {
  setup() {
    let { proxy } = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const validateForm = ref(null);
    const verifyRef = ref(null);
    const state = reactive({
      login: {
        height: "",
        backgroundImage: "url(" + require("@/assets/image/login_bj.jpg") + ")",
      },
      logoImg: require("@/assets/image/logo.png"),
      loginForm: {
        username: "",
        password: "",
        imgCode: "",
      },
    });

    const rules = {
      username: [
        { required: true, message: "用户名称不能为空", trigger: "blur" },
      ],
      password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
      imgCode: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
    };

    onBeforeMount(() => {
      state.login.height = document.body.clientHeight + "px";
    });

    const submit = async () => {
      const form = unref(validateForm);
      if (!form) {
        return;
      }
      await form.validate();

      // 校验验证码
      const _imgCode = verifyRef.value.imgCode || "";
      if (_imgCode.toLowerCase() != state.loginForm.imgCode.toLowerCase()) {
        ElMessage({
          showClose: true,
          message: "验证码有误，请重新输入!",
          type: "error",
        });
        return;
      }

      userlogin(state.loginForm)
        .then((res) => {
          if (res.code === 200) {
            // 登录成功后设置token到vuex中
            localStorage.username = res.username;
            store.commit("setToken", res.access);
            router.push({ path: "home" });
          } else {
            ElMessage({ showClose: true, message: res.message, type: "error" });
          }
        })
        .catch((error) => {
          //登录失败
          console.log(error);
        });
    };

    return {
      ...toRefs(state),
      rules,
      validateForm,
      verifyRef,
      submit,
    };
  },
  components: {
    VueImgVerify,
  },
};
</script>

<style lang="scss">
.login {
  background-size: cover;
  .login-logo {
    width: 120px;
    height: 120px;
    display: block;
    margin: 2rem auto;
  }
  .login-header {
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-family: "微软雅黑";
    font-size: 50px;
    text-shadow: 5px 5px 5px #137cbd, 0px 0px 2px #106ba3, 2px 2px 3px #f90000; // 使用了 字体阴影，然后把字体颜色调成背景
  }
  .login-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // background: rgba(233, 233, 233, 0.3);
    background: rgba(0, 21, 41, 0.28);
    border-radius: 0.4rem;
    border: 1px white solid;
    padding: 0.8rem;
    img.el-image__inner {
      border-radius: 50%;
    }
  }
  .login-body {
    padding: 1rem 2rem;
    background: rgba(0, 21, 41, 0.07);
    width: 25rem;
    border-radius: 0.2rem;
  }
  .el-input__inner {
    border-radius: 20px;
  }
  .codeImg {
    height: 40px;
  }
  .login-submit {
    width: 100%;
  }
  .el-button--text {
    color: #ffffff;
  }
}
</style>