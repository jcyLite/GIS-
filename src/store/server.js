import axios from 'axios';
import Vue from 'vue'
import VueAxios from 'vue-axios'
import Qs from 'qs';
Vue.use(VueAxios, axios);
Vue.prototype.baseURL = axios.defaults.baseURL = "/czcgnl/"
    // axios.defaults.baseURL = "http://202.102.101.92:20001/"
axios.defaults.timeout = 12000;
axios.defaults.headers = { //设置相应头
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Accept': 'application/json, text/plain'
}
axios.defaults.transformRequest = [
    d => { //对发送的数据进行处理
        d = d || {};
        return Qs.stringify(d)
    }
];
let loadingInstance=null;
axios.interceptors.request.use(
    request => {
        loadingInstance=layui.layer.load(2);
        return request
    }
)
axios.interceptors.response.use(
    res => {
        layui.layer.close(loadingInstance);
        return res.data
    },
    err => {
        layui.layer.close(loadingInstance);
        layui.layer.msg("系统异常提示")
    }
)