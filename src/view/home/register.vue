<template>
  <div id="regist">
    <el-container>
      <el-header style="text-align:center;height:90px;">
        <img src="../../assets/logo.png" />
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
          </div>
        </div>
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
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <router-link id="home" to="/">已经有了账号</router-link>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from "axios";
import ruter from "./../../router";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    };
  },
  methods: {
    onSubmit() {
      axios({
        method: "post",
        url: "/open/saveUser",
        data: {
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        },
      }).then((res) => {
        if (res.status == 200) {
          ruter.push("/");
        } else {
          this.$alert("注册失败！", "系统提示", {
            confirmButtonText: "确定",
          });
        }
      });
    },
    open() {
      this.$alert("这是一段内容", "标题名称", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
  },
};
</script>
