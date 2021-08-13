/*
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-10 16:55:38
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-12 15:11:38
 */
import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Home from "../views/Home.vue";
import Layout from "@/views/Layout"

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: '登录',
    meta: { title: "登录", requireAuth: false },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/test',
    name: '测试',
    meta: { title: "测试", requireAuth: false },
    component: () => import('@/views/Test.vue')
  },
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  // {
  //   path: "/navbar",
  //   name: "navbar",
  //   meta: { title: "用户列表", requireAuth: true },
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "@/components/NavBar.vue"),
  // },
  // {
  //   path: "/report-add",
  //   name: "report-add",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "@/components/ReportAdd.vue"),
  // },
  {
    path: '/main',
    component: Layout,
    icon: "el-icon-s-home",
    meta: { title: "工作台", requireAuth: true, roles: ['true', 'false'] },
    redirect: '/home',
    children: [
      {
        path: "/home",
        name: "工作台",
        icon: "el-icon-s-home",
        meta: { title: "工作台", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/overview',
    name: "工作总览中心",
    component: Layout,
    icon: "el-icon-postcard",
    meta: { title: "工作总览中心", requireAuth: true, roles: ['true', 'false'] },
    children: [
      {
        path: "/company-overview",
        name: "公司概况",
        icon: "el-icon-postcard",
        meta: { title: "公司概况", requireAuth: true, roles: ['true', 'false'] },
        component: () => import('@/views/CompanyIntro.vue')
      },
      {
        path: "/data-overview",
        name: "数据总览",
        icon: "el-icon-s-data",
        meta: { title: "数据总览", requireAuth: true, roles: ['true', 'false'] },
        // component: () => import('@/components/monitor/DataMonitor.vue')
        component: () => import('@/views/OverViews.vue')
      },
    ]
  },
  {
    path: "/datatype",
    name: "数据入库中心",
    component: Layout,
    icon: "el-icon-folder",
    meta: { title: "数据入库中心", requireAuth: true, roles: ['true', 'false'] },
    children: [
      // {
      //   path: "/datalist",
      //   name: "单个数据入库",
      //   icon: "el-icon-folder-opened",
      //   meta: { title: "单个数据入库", requireAuth: true },
      //   component: () => import("@/components/ReportList.vue")
      // },

      {
        path: "/report-add",
        name: "批量数据入库",
        icon: "el-icon-folder-opened",
        meta: { title: "多个数据入库", requireAuth: true, roles: ['true', 'false'] },
        component: () =>
          import("@/components/PDFAdd.vue"),
      },
      // {
      //   path: "/data-add",
      //   name: "数据入库",
      //   icon: "el-icon-folder-opened",
      //   meta: { title: "数据入库", requireAuth: true },
      //   component: () =>
      //     import("@/components/DataAdd.vue"),
      // },
      {
        path: "/doc-add",
        name: "单个数据入库",
        icon: "el-icon-folder-opened",
        meta: { title: "文档入库", requireAuth: true, roles: ['true', 'false'] },
        component: () =>
          import("@/components/PDFAdd.vue"),
      },
    ]
  },
  {
    path: "/worktype",
    name: "数据库查询中心",
    component: Layout,
    icon: "el-icon-s-data",
    meta: { title: "数据库查询中心", requireAuth: true, roles: ['true', 'false'] },
    children: [
      {
        path: "/data-list",
        name: "数据列表",
        icon: "el-icon-tickets",
        meta: { title: "数据列表", requireAuth: true, roles: ['true', 'false'] },
        component: () => import("@/components/DataList.vue")
      },
      {
        path: "/data-details",
        name: "数据详情",
        icon: "el-icon-s-data",
        meta: { title: "数据详情", requireAuth: true, roles: ['true', 'false'] },
        component: () => import("@/components/DataDetails.vue")
      },
      {
        path: "/data-edit",
        name: "数据编辑",
        icon: "el-icon-edit-outline",
        meta: { title: "数据编辑", requireAuth: true, roles: ['true', 'false'] },
        component: () => import("@/components/DataEdit.vue")
      },
    ]
  },
  {
    path: "/download",
    name: "打印与下载中心",
    component: Layout,
    icon: "el-icon-download",
    meta: { title: "打印与下载中心", requireAuth: true, roles: ['true', 'false'] },
    children: [
      {
        path: "/data-print",
        name: "数据打印",
        icon: "el-icon-download",
        meta: { title: "数据打印", requireAuth: true, roles: ['true', 'false'] },
        // component: () => import("@/views/Test.vue")
        component: () => import("@/components/DataPrint.vue")
      },
      {
        path: "/data-download",
        name: "数据下载",
        icon: "el-icon-download",
        meta: { title: "数据下载", requireAuth: true, roles: ['true', 'false'] },
        component: () => import("@/components/DataDownLoad.vue")
      },
    ]
  },
  {
    path: "/user",
    name: "权限管理中心",
    component: Layout,
    icon: "el-icon-user",
    meta: { title: "权限管理中心", requireAuth: true, roles: ['true', 'false'] },
    children: [
      // {
      //   path: "/user-list",
      //   name: "用户列表",
      //   icon: "el-icon-s-data",
      //   meta: { title: "用户列表", requireAuth: true },
      //   component: () => import("@/views/UserList.vue")
      // },
      {
        path: "/user-setting",
        name: "个人设置",
        icon: "el-icon-setting",
        meta: { title: "个人设置", requireAuth: true, roles: ['true', 'false'] },
        component: () => import("@/views/UserSetting.vue")
      },
      {
        path: "/user-password",
        name: "修改密码",
        icon: "el-icon-unlock",
        meta: { title: "修改密码", requireAuth: true, roles: ['true', 'false'] },
        component: () => import("@/views/UserPassword.vue")
      }, {
        path: "/user-list",
        name: "用户列表",
        icon: "el-icon-tickets",
        // meta: { title: "用户列表", requireAuth: true },
        meta: { title: "用户列表", requireAuth: true, roles: ['true'] },
        component: () => import("@/views/UserList.vue")
      },
    ]
  },
  {
    path: '/nopermission',
    name: '没有访问权限',
    meta: { title: "404", requireAuth: false, roles: ['true', 'false'] },
    component: () => import('@/views/NoPermission.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { title: "404", requireAuth: false, roles: ['true', 'false'] },
    component: () => import('@/views/404.vue')
  },
  {
    path: '/500',
    name: '500',
    meta: { title: "500", requireAuth: false, roles: ['true', 'false'] },
    component: () => import('@/views/500.vue')
  },
  // 没有则跳500
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/500.vue') },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 600, showSpinner: false })

// 设置title
router.beforeEach((to, from, next) => {
  // 启动进度条
  NProgress.start()

  // 设置头部
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = "默存"
  }

// 页面访问权限判断
  let userToken = localStorage.getItem('token')
  // let role = localStorage.getItem('role')
  const role = localStorage.is_superuser //获取是否是超级权限
  if (to.meta.requireAuth) {      // 1)判断该路由是否需要登录权限
    if (userToken) {  // 2)判断本地是否存在token,有说明登录过
      if (to.meta.roles.length !== 0) {
        //下一个页面的rules是否与当前token相等
        for (let i = 0; i < to.meta.roles.length; i++) {
          if (role === to.meta.roles[i]) {
            next()       //角色匹配已登录，正常进入to.meta.roles[i]的页面
            break
          } else if (i === to.meta.roles.length - 1) {
            next({ path: '/nopermission' })
          }
        }
      } else { next() }
    } else {
      next({ path: '/Login' })
    }
  } else { next() }

  // console.log('测试数据');
  // console.log(localStorage.getItem('token'));
  const token = localStorage.getItem('token');
  // 判断是否登录
  if (to.path != '/login' && !token) {
    // console.log("走了这里啊");
    // console.log(token);
    next({
      path: '/login'
    })
  } else {
    if (to.path == '/login' && token) {
      // console.log("走了这里呀");
      // console.log(token);

      next('/home')
    } else {
      next()
    }
  }
  // next()

})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})


export default router;
