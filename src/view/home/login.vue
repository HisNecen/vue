<template>
  <div id="login">
    <el-container>
      <el-header style="text-align:center;">
        <img src="../../assets/logo.png" />
      </el-header>
      <el-main style="width:500px;margin:0 auto;margin-top:150px;">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="form.username" placeholder="请输入登录名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            &nbsp;
            <router-link id="regist" to="/regist">
              还没有账号?
            </router-link>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import store from "./../../store/index";
import axios from "axios";
import ruter from "./../../router";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      axios({
        method: "post",
        url: "/oauth/token",
        data: {
          username: this.form.username,
          password: this.form.password,
          client_id: "zuul_server",
          scope: "WRIGTH",
          grant_type: "password",
          client_secret: "secret",
          jwt: "springcloud123",
        },
        transformRequest: [
          function (data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          },
        ],
        
      }).then(res => {
        store.commit("set_token",res.data.access_token);
        if(res.status==200){
          ruter.push("/home");
        }
      });
    },
  },
};
</script>
