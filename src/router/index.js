import Vue from 'vue';
import Router from 'vue-router';
import store from './../store/index';

import axios from 'axios';
// import HelloWorld from '@/components/HelloWorld'
// import form from '@/demo/form'
// import home from '@/home/home'
import mylogin from '@/view/home/login';
import regist from '@/view/home/register';
import home from '@/view/home/home';
import userList from '@/view/category/user/user';
import jobList from '@/view/category/job/job';
import roleList from '@/view/category/role/role';
import permissionList from '@/view/category/permission/permission';
import groupList from '@/view/category/group/group';
import activitiList from '@/view/category/activiti/activiti';
import supplierList from '@/view/category/supplier/supplier';
import appList from '@/view/category/applications/app';
import assets from '@/view/category/assets/assets_home';
import notebook from '@/view/category/notes/notebook';
import userinfo from '@/view/category/info/user_info';
import billboard from '@/view/category/billboard/billboard';
import income from '@/view/category/income/income';
import payout from '@/view/category/payout/payout';
import report from '@/view/category/report/report_home';

Vue.use(Router)

// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'mylogin',
      component: mylogin,
      meta: {
        keepAlive: false
      }
    }, {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/user/list',
      name: 'userList',
      component: userList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/role/list',
      name: 'roleList',
      component: roleList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/job/list',
      name: 'jobList',
      component: jobList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/permission/list',
      name: 'permissionList',
      component: permissionList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/group/list',
      name: 'groupList',
      component: groupList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/activiti/list',
      name: 'activitiList',
      component: activitiList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/supplier/list',
      name: 'supplierList',
      component: supplierList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/app/list',
      name: 'appList',
      component: appList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/assets/home',
      name: 'assets',
      component: assets,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/notebook/list',
      name: 'notebook',
      component: notebook,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/info/userinfo',
      name: 'userinfo',
      component: userinfo,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/billboard/list',
      name: 'billboard',
      component: billboard,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/income/list',
      name: 'income',
      component: income,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/payout/list',
      name: 'payout',
      component: payout,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/report/list',
      name: 'report',
      component: report,
      meta: {
        keepAlive: true
      }
    },
    {
      path:'*',
      name:'404',
      component:mylogin,
      meta: {
        keepAlive: false
      }
    }
  ]
});

// console.log(typeof router)

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '') {
      next('/');
    } else {
      next();
    }
  }
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


//异步请求后，判断token是否过期
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error => {
    if(error.response){
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('Authorization');
          router.push("/");
      }
    }
  }
)

export default router
