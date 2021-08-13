/*
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-10 16:55:38
 * @LastEditors: henggao
 * @LastEditTime: 2021-08-12 09:51:17
 */
import { createStore } from "vuex";

export default createStore({
  state: {
    token: '',
    username: localStorage.username,
    is_staff: localStorage.is_staff,
    is_superuser: localStorage.is_superuser,
    query_id: localStorage.query_id,
    edit_id: localStorage.edit_id,
    dataview: localStorage.datamonitor, // 缓存监控见面父组件数据，子组件使用
    datatop: localStorage.datatop,
    dataupload: localStorage.dataupload,
    datanum: localStorage.datanum,
  },
  mutations: {
    // 存储token
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },
    // 清除token
    delToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    }
  },
  getters: {
    // 获取token方法
    getToken(state) {
      if (!state.token) {
        state.token = localStorage.getItem('token');
      }
      return state.token;
    }
  },
  actions: {},
  modules: {}
});
