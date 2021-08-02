/*
 * @Description: henggao_learning
 * @version: v1.0.0
 * @Author: henggao
 * @Date: 2021-07-11 15:09:13
 * @LastEditors: henggao
 * @LastEditTime: 2021-07-28 20:31:33
 */
import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import router from '../router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// axios.defaults.baseURL = 'http://127.0.0.1:8080/'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/'
// axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 600, showSpinner: false })

//请求
axios.interceptors.request.use(
    config => {
        // 启动进度条
        NProgress.start()
        return config
    },
    // 请求出现错误
    error => {
        return Promise.reject(error);
    })
// 返回状态判断
axios.interceptors.response.use(res => {
    // console.log(res);
    // if (typeof res.data !== 'object') {
    //     ElMessageBox.alert("服务器异常，请稍后再试！")
    //     return Promise.reject(res)
    // }
    // // if (res.data.resultCode != 200) {
    // if (res.status != 200) {
    //     // 成功
    //     if (res.data.message) ElMessageBox.alert(res.data.message)
    //     // if (res.data.resultCode == 416) {
    //     if (res.status == 416) {
    //         router.push({ path: '/login' })
    //     }
    //     return Promise.reject(res.data)
    // }

    // 关闭进度条
    NProgress.done()

    return res.data
})

export default axios