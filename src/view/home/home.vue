<template>
  <div id="home" style="height:78%;">
    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
    <el-calendar v-model="value" >
    </el-calendar>
    
  </div>
</template>

<script>
import mynav from ".././common/nav";
import myheader from ".././common/header";
export default {
  name: "home",
  components: {},
    data() {
      return {
        value: new Date()
      }
    }
};
</script>

<style>
#home {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>