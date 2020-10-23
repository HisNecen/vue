<template>
  <div class="user_info">
    <el-row>
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <h3>用户信息</h3>
          <el-divider></el-divider>
          <el-row class="user_info_row">
            <div>
              <el-tag>名称：</el-tag>
              <el-tag type="info">{{ form.name }}</el-tag>
            </div>
            <div>
              <el-tag>电话：</el-tag>
              <el-tag type="info">{{ form.phone }}</el-tag>
            </div>
            <div>
              <el-tag>邮箱：</el-tag>
              <el-tag type="info">{{ form.email }}</el-tag>
            </div>
            <div>
              <el-tag>入职时间：</el-tag>
              <el-tag type="info">{{ form.entryTime }}</el-tag>
            </div>
            <div>
              <el-tag>描述：</el-tag>
              <el-tag type="info">{{ form.decription }}</el-tag>
            </div>
            <div>
              <el-tag>添加时间：</el-tag>
              <el-tag type="info">{{ form.addTime }}</el-tag>
            </div>
          </el-row>
        </div></el-col
      >
      <el-col :span="8" style="margin-left: 10px"
        ><div class="grid-content bg-purple-light">
          <h3>关键项</h3>

          <el-divider></el-divider>

          <el-form
            ref="resetPasswordModel"
            :model="resetPasswordModel"
            label-width="80px"
          >
            <el-col>
              <el-form-item
                prop="securityCode"
                :rules="{
                  required: true,
                  message: '安全码不能为空',
                  trigger: 'blur',
                }"
                label="安全码"
              >
                <el-input
                  type="password"
                  v-model="resetPasswordModel.securityCode"
                  placeholder="重置密码需验证安全码"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                prop="oldPassword"
                :rules="{
                  required: true,
                  message: '密码不能为空',
                  trigger: 'blur',
                }"
                label="原始密码"
              >
                <el-input
                  type="password"
                  v-model="resetPasswordModel.oldPassword"
                  required="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                prop="newPassword"
                :rules="{
                  required: true,
                  message: '密码不能为空',
                  trigger: 'blur',
                }"
                label="新密码"
              >
                <el-input
                  type="password"
                  v-model="resetPasswordModel.newPassword"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <div>
            <el-tag>密码：</el-tag>
            <el-button type="primary" @click="resetPassword()" size="small"
              >重置密码</el-button
            >
          </div>
          <el-divider></el-divider>
          <el-form
            ref="resetSecurityModel"
            :model="resetSecurityModel"
            label-width="100px"
          >
            <el-col>
              <el-form-item
                prop="password"
                :rules="{
                  required: true,
                  message: '密码不能为空',
                  trigger: 'blur',
                }"
                label="密码"
              >
                <el-input
                  type="password"
                  v-model="resetSecurityModel.password"
                  placeholder="重置安全码需验证登录密码"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                prop="oldSecurityCode"
                :rules="{
                  required: true,
                  message: '安全码不能为空',
                  trigger: 'blur',
                }"
                label="原始安全码"
              >
                <el-input
                  type="password"
                  v-model="resetSecurityModel.oldSecurityCode"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item
                prop="newSecurityCode"
                :rules="{
                  required: true,
                  message: '安全码不能为空',
                  trigger: 'blur',
                }"
                label="新安全码"
              >
                <el-input
                  type="password"
                  v-model="resetSecurityModel.newSecurityCode"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <div>
            <el-tag>安全码：</el-tag>
            <el-button type="primary" @click="resetSecurityCode()" size="small"
              >重置安全码</el-button
            >
          </div>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script>
import router from "@/router/index";
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        phone: "",
        email: "",
        addTime: "",
        decription: "",
        entryTime: "",
      },
      resetPasswordModel: {
        securityCode: "",
        oldPassword: "",
        newPassword: "",
      },
      resetSecurityModel: {
        password: "",
        oldSecurityCode: "",
        newSecurityCode: "",
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/user/selectLoginUserInfo",
        data: {
          data: {},
        },
      }).then((res) => {
        this.form = res.data.data;
      });
    },
    resetPassword() {
      this.$refs["resetPasswordModel"].validate((valid) => {
        if (valid) {
          this.axios({
            method: "post",
            url: "/myoa/smbus/user/resetPassword",
            data: {
              data: {
                id: this.form.id,
                oldPassword: this.resetPasswordModel.oldPassword,
                newPassword: this.resetPasswordModel.newPassword,
                securityCode: this.resetPasswordModel.securityCode,
              },
            },
          })
            .then((res) => {
              if (res.data.state.code == 5000) {
                this.$message({
                  type: "error",
                  message: res.data.state.msg,
                });
              } else {
                this.$message({
                  type: "info",
                  message: "操作成功！",
                });
                this.$router.push("/");
              }
            })
            .catch((res) => {
              this.$message({
                type: "error",
                message: "系统故障，请联系管理员！",
              });
            });
        } else {
          return false;
        }
      });
    },
    resetSecurityCode() {
      this.$refs["resetSecurityModel"].validate((valid) => {
        if (valid) {
          this.axios({
            method: "post",
            url: "/myoa/smbus/user/resetSecurityCode",
            data: {
              data: {
                id: this.form.id,
                oldSecurityCode: this.resetSecurityModel.oldSecurityCode,
                newSecurityCode: this.resetSecurityModel.newSecurityCode,
                password: this.resetSecurityModel.password,
              },
            },
          })
            .then((res) => {
              if (res.data.state.code == 5000) {
                this.$message({
                  type: "error",
                  message: res.data.state.msg,
                });
              } else {
                this.$message({
                  type: "info",
                  message: "操作成功！",
                });
                this.$router.push("/");
              }
            })
            .catch((res) => {
              this.$message({
                type: "error",
                message: "系统故障，请联系管理员！",
              });
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style >
.user_info_row div {
  margin-top: 10px;
}
</style>