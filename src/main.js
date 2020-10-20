// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//import element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import axios
import axios from 'axios';
//import utils
import myutil from './view/util/dateutil';

Vue.use(ElementUI);
Vue.config.productionTip = false



// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if (store.state.token) {
    config.headers.common['Authorization'] = "Bearer"+store.state.token;
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});



Vue.prototype.axios = axios;
Vue.prototype.myutil = myutil;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
