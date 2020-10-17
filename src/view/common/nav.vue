<template>
  <el-menu theme="dark" mode="horizontal" class="el-menu-admin" @select="handleSelect">
    <el-menu-item index="/">
      <el-tag effect="dark">OA-办公管理系统-(v1.0)</el-tag>
    </el-menu-item>
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>首页
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-mouse"></i>业务
      </template>
      <el-menu-item index="/user/list">
        <i class="el-icon-s-platform"></i>服务器
      </el-menu-item>
      <el-menu-item index="/supplier/list">
        <i class="el-icon-goods"></i>供应商
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-orange"></i>财务
      </template>
      <el-menu-item index="/user/list">
        <i class="el-icon-download"></i>入账
      </el-menu-item>
      <el-menu-item index="/role/list">
        <i class="el-icon-upload2"></i>出账
      </el-menu-item>
      <el-menu-item index="/permission/list">
        <i class="el-icon-s-data"></i>报表
      </el-menu-item>
      <el-menu-item index="/assets/home">
        <i class="el-icon-office-building"></i>资产
      </el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-custom"></i>用户
      </template>
      <el-menu-item index="/user/list">
        <i class="el-icon-user"></i>用户
      </el-menu-item>
      <el-menu-item index="/role/list">
        <i class="el-icon-s-management"></i>角色
      </el-menu-item>
      <el-menu-item index="/app/list">
        <i class="el-icon-monitor"></i>应用
      </el-menu-item>
      <el-menu-item index="/permission/list">
        <i class="el-icon-caret-right"></i>权限
      </el-menu-item>
      <el-menu-item index="/job/list">
        <i class="el-icon-bank-card"></i>职务
      </el-menu-item>
    </el-submenu>

    <el-menu-item index="/activiti/list">
      <i class="el-icon-refresh"></i>流程
    </el-menu-item>
    <el-menu-item index="/">
      <i class="el-icon-switch-button"></i>LogOut
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-info"></i>Resume
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-goblet"></i>About
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key);
      this.$router.push(key);
    },
  },
};
</script>
<style>
.el-menu-item:hover {
  border-left: #33a2ef solid 6px !important;
  background-color: #e2eff9 !important;
  color: #38b2ff !important;
  /* //less语法，实现鼠标悬停时icon变色 */
}
.el-menu-item:hover i {
  color: #38b2ff;
}
/* el-submenu:hover{
        border-left:#33A2EF solid 6px !important;
        background-color: #E2EFF9 !important;
        color: #38B2FF !important;
} */
</style>