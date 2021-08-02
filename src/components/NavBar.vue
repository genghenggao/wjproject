<!--
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-10 17:14:03
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-10 20:37:43
-->
<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-location"></i>
          <span>数据类型</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">报表</el-menu-item>
          <el-menu-item index="1-2">图</el-menu-item>
          <el-menu-item index="1-3">文字报告</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template #title>
          <i class="el-icon-location"></i>
          <span>勘探类型</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">精查</el-menu-item>
          <el-menu-item index="2-2">储量核实</el-menu-item>
          <el-menu-item index="2-3">水文</el-menu-item>
          <el-menu-item index="2-4">物探</el-menu-item>
          <el-menu-item index="2-5">其他</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <template #title>其他分类</template>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <template #title>其他</template>
      </el-menu-item>
    </el-menu>
    <div>
        <p>{{routers}}</p>
        <h2>=======分割线==========</h2>
        <!-- <p>{{routers.children}}</p> -->
        <!-- <p>{{menu.children[0].name}}</p> -->

    </div>
     <el-container class="container">
        <el-aside :style="defaultHeight" :width="asideWidth">
            <el-affix :z-index="1200">
                <div class="aside-logo" @click="onRefresh">
                <el-image class="logo-image" :src="logo" fit="contain"/>
                <span :class="[isCollapse ? 'is-collapse' : '']">
                    <span class="logo-name">乐乐购</span>
                    <span>后台管理中心</span>
                </span>
                </div>
            </el-affix>
            <el-menu class="aside-menu"
                     router
                     :default-active="$route.path"
                     :collapse="isCollapse"
                     background-color="#001529" text-color="#fff" active-text-color="#fff">
                <div v-for="menu in routers" :key="menu">
                    <el-menu-item v-if="menu.children && menu.children.length === 1" :index="menu.children[0].path">
                        <i :class="menu.children[0].icon"></i>
                        <template #title>
                            {{menu.children[0].name}}
                        </template>
                    </el-menu-item>
                    <el-submenu v-else-if="menu.children" :index="menu.path">
                        <template #title>
                            <i :class="menu.icon"></i>
                            <span :class="[isCollapse ? 'is-collapse' : '']">{{menu.name}}</span>
                        </template>
                        <el-menu-item v-for="child in menu.children" :key="child" :index="child.path">
                            <i :class="child.icon"></i>
                            <template #title>
                                {{child.name}}
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </div>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <el-row :gutter="20">
                    <el-col :span="1">
                        <div class="header-collapse" @click="onCollapse">
                            <i :class="[isCollapse ? 'el-icon-s-fold':'el-icon-s-unfold']"/>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="header-breadcrumb">
                            <el-breadcrumb separator="/" v-if="this.$route.matched[0].path != '/main'">
                                <el-breadcrumb-item :to="{ path: '/' }">工作台</el-breadcrumb-item>
                                <el-breadcrumb-item v-for="(matched,m) in this.$route.matched" :key="m">
                                    {{matched.name}}
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                            <el-breadcrumb separator="/" v-else>
                                <el-breadcrumb-item>工作台</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                    </el-col>
                    <el-col class="header-menu" :span="13">
                        <HeadMenu></HeadMenu>
                    </el-col>
                </el-row>
            </el-header>
            <el-main :style="defaultHeight">
                <router-view/>
            </el-main>
        </el-container>
        <el-backtop target=".el-main"></el-backtop>
    </el-container>
  </div>
</template>

<script>
import {onBeforeMount, reactive, toRefs} from 'vue'
import {useRouter} from 'vue-router'
export default {
  name: "NavBar",
  Comments:{},
  setup(){
      console.log("setup");
        const router = useRouter()
        console.log(router);
            const state = reactive({
                logo: require('@/assets/image/logo.png'),
                isCollapse: false,
                asideWidth: '220px',
                defaultHeight: {
                    height: ''
                },
                routers: [],
            })

            onBeforeMount(() => {
                state.routers = router.options.routes
                state.defaultHeight.height = document.body.clientHeight + "px"
                console.log(state.routers);
                console.log(state.routers[0]);
                console.log(state.routers[0].name);
            })

            const onCollapse = () => {
                if (state.isCollapse) {
                    state.asideWidth = '220px'
                    state.isCollapse = false
                } else {
                    state.isCollapse = true
                    state.asideWidth = '64px'
                }
            }

            const onRefresh = () => {
                router.push({ path: 'main'})
            }

            return {
                ...toRefs(state),
                onCollapse,
                onRefresh,
            }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
</style>