/*
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-10 16:55:38
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-29 14:54:31
 */
import { createStore } from "vuex";

export default createStore({
  state: {
    token: '',
    username: localStorage.username
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
