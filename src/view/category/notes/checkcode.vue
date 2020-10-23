<template>
  <el-dialog
    title="记事本为私密信息请校验安全码"
    class="userEidt"
    width="450px"
    :close-on-click-modal="false"
    :visible.sync="checkProp"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col>
          <el-form-item label="安全码">
            <el-input type="password" v-model="form.securityCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ editName }}</el-button>
        <el-button @click="cancelButton()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import notebook from "./notebook";
export default {
  data() {
    return {
      form: {
        securityCode: "",
      },
      checkProp: true,
      editName: "确定",
    };
  },
  methods: {
    onSubmit: function () {
      this.axios({
        method: "post",
        url: "/myoa/smbus/user/checkUserSecurityCode",
        data: {
          data: {
            securityCode: this.form.securityCode,
          },
        },
      }).then((res) => {
        if (res.data.data.security == "success") {
          this.$parent.checkProcedureFlag = true;
          this.$parent.initData();
          this.cancelButton();
        }else{
          this.$message("安全码错误请重新输入！");
        }
      });
    },
    cancelButton: function () {
      this.checkProp = false;
    },
    checkcodeProp: function () {
      this.checkProp = true;
    },
  },
};
</script>