<template>
  <el-menu
    theme="dark"
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="/"><el-tag>vue正式管理系统-（已上线）</el-tag></el-menu-item>
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/user/list">用户</el-menu-item>
    <el-menu-item index="/role/list">角色</el-menu-item>
    <el-menu-item index="/permission/list">权限</el-menu-item>
    <el-menu-item index="/group/list">分组</el-menu-item>
    <el-menu-item index="/activiti/list">流程</el-menu-item>
    <el-submenu index="/home">
      <template slot="title">办公</template>
      <el-menu-item index="/home/iii">开放</el-menu-item>
      <el-menu-item index="3-2">关闭</el-menu-item>
      <el-menu-item index="3-3">操作</el-menu-item>
    </el-submenu>
    <el-menu-item index="/">LogOut</el-menu-item>
    <el-menu-item index="5">Resume</el-menu-item>
    <el-menu-item index="5">About</el-menu-item>
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