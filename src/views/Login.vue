<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-11 14:54:54
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-12 18:33:51
-->
<template>
  <div class="login" :style="login">
    <el-row style="height: 100%; width: 100%">
      <el-col :span="12">
        <div
          class="test_two_box"
          style="padding-left: 200px; padding-top: 240px"
        >
          <h2 style="color: white; padding-left: 200px">研究成果展示</h2>
          <video id="myVideo" class="video-js" ref="video">
            <source
              src="/api/wjproject/media/三维地质模型.mp4"
              type="video/mp4"
            />
            <!-- <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" /> -->
          </video>
        </div></el-col
      >
      <el-col :span="12">
        <div class="login_content" style="height: 100%; width: 100%">
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
                <el-button
                  class="login-submit"
                  type="danger"
                  round
                  @click="submit"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </el-row>
          <el-row :gutter="10" class="login-footer">
            <p>版权所有：阳泰集团武甲煤矿&nbsp;</p>
            <p>
              ICP备案：<a href="https://beian.miit.gov.cn/" target="_self"
                >京ICP备2021024216号</a
              >
            </p>
            <p>公司地址：晋城阳城县芹池镇武甲村</p>
          </el-row>
        </div>
      </el-col>
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
// import Video from "video.js";
// import "video.js/dist/video-js.css";

export default {
  components: {
    VueImgVerify,
    // Video
  },
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
      // initVideo();
      setTimeout(() => {
        initVideo();
      }, 300);
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
            localStorage.is_staff = res.is_staff;
            localStorage.is_superuser = res.is_superuser;
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

    // 视频
    const initVideo = () => {
      //初始化视频方法
      let myPlayer = proxy.$video("myVideo", {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "600px",
        //设置视频播放器的显示高度（以像素为单位）
        height: "400px",
      });
    };
    return {
      ...toRefs(state),
      rules,
      validateForm,
      verifyRef,
      submit,
      initVideo,
    };
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
    left: 70%;
    top: 10%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-family: "微软雅黑";
    font-size: 50px;
    text-shadow: 5px 5px 5px #137cbd, 0px 0px 2px #106ba3, 2px 2px 3px #f90000; // 使用了 字体阴影，然后把字体颜色调成背景
  }
  .login-container {
    position: absolute;
    left: 70%;
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

  .login-footer {
    position: absolute;
    left: 30%;
    /* top: 50%; */
    bottom: 40px;
  }
  .login-footer p {
    float: left;
    line-height: 27px;
    color: #ffffff;
    font-size: 14px;
    margin-right: 20px;
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