/*
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-11 15:09:53
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-28 20:31:16
 */
import axios from '../utils/axios'

// ==================登录=====start==============================
/**
 * 登录
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function userlogin(params) {
    // console.log(instance.defaults.headers);
    // console.log(axios.defaults.headers);
    // console.log(params);
    // return axios.post('/api/userinfo/', params);
    return axios.post('/api/userlogin/', params);
    // return axios.post('/login', params);
}

// ==================登录=====end==============================

// =====================首页======start=========================
/**
 * 待办事项
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function outstandingIssues(params) {
    return axios.post('/admin/home/outstandingIssues', params);
}

/**
 * 收入分析
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function revenueAnalysis(params) {
    return axios.post('/admin/home/revenueAnalysis', params);
}

/**
 * 总览
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 */
export function overview(params) {
    return axios.post('/admin/home/overview', params);
}

// =====================首页======end=========================