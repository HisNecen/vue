<template>
  <div id="app">
    <!-- 其他页 -->
    <el-container style="height:100%;" v-if="$route.meta.keepAlive">
      <el-header style="padding:0 0;">
        <keep-alive>
          <!-- 导航栏 -->
          <header-nav></header-nav>
        </keep-alive>
      </el-header>
      <el-container style="height:100%;">
        <el-menu background-color="#eff7ff" text-color="#fff" active-text-color="#ffd04b">
          <!-- 侧边栏 -->
          <keep-alive>
            <left></left>
          </keep-alive>
        </el-menu>
        <el-main>
          <!-- Body -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <!-- 登录页 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import header from "./view/common/nav";
import left from "./view/common/header";

export default {
  components: {
    headerNav: header,
    left: left,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
  height: 100%;
}
</style>
