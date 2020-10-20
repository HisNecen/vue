<template>
  <el-dialog
    title="用户信息"
    class="userEidt"
    :close-on-click-modal="false"
    :visible.sync="editProp"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标号" hidden>
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="职务" :inline="true">
            <el-select v-model="jobModel.id" placeholder="请选择活动区域">
              <el-option
                v-for="item in jobList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目组" :inline="true">
            <el-select v-model="groupModel.id" placeholder="请选择活动区域">
              <el-option
                v-for="item in groupList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色">
            <el-select v-model="roleModel.id" placeholder="请选择活动区域">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio v-model="form.sex" label="1">男</el-radio>
              <el-radio v-model="form.sex" label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="入职日期">
            <div class="block">
              <el-date-picker
                v-model="form.entryTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="离职日期">
            <div class="block">
              <el-date-picker
                v-model="form.leaveTime"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="个人说明">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ editName }}</el-button>
        <el-button @click="cancelButton()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      form: {
        id: "",
        name: "0000",
        password: "",
        idCard: "",
        sex: "1",
        phone: "",
        entryTime: "",
        leaveTime: "",
        email: "",
        roleId: "",
        jobId: "",
        orgId: "",
        status: "",
        description: "",
      },
      jobList: [],
      jobModel: {
        id: "",
        name: "",
      },
      groupList: [],
      groupModel: {
        id: "",
        name: "",
      },
      roleList: [],
      roleModel: {
        id: "",
        name: "",
      },
      editName: "",
      editProp: false,
    };
  },
  created: function () {
    this.initRole();
    this.initGroup();
    this.initJob();
    // this.initDic("1");
  },
  methods: {
    onSubmit() {
      console.log(this.form.id);
      if (this.form.id == null) {
        this.addUser();
      } else {
        this.updateUser();
      }
      this.cancelButton();
      this.$parent.initUserData();
    },
    init(id) {
      this.editProp = true;
      if (id == null) {
        this.editName = "创建";
      } else {
        this.editName = "保存";
      }
      if (id != null) {
        this.initData(id);
      } else {
        this.reset();
      }
    },
    cancelButton() {
      this.editProp = false;
    },

    initData(id) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/user/selectUser",
        data: {
          data: {
            id: id,
          },
        },
      }).then((res) => {
        this.form = res.data.data;
        this.roleModel.id = this.form.roleId;
        this.jobModel.id = this.form.jobId;
        this.groupModel.id = this.form.orgId;
      });
    },
    initRole() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/role/selectRoleAll",
        data: {
          data: {},
        },
      }).then((res) => {
        this.roleList = res.data.data.roleList;
        this.roleModel.id = this.roleList[0].id;
        this.roleModel.name = this.roleList[0].name;
      });
    },
    initGroup() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/org/selectOrgAll",
        data: {
          data: {},
        },
      }).then((res) => {
        this.groupList = res.data.data.orgList;
        this.groupModel.id = this.groupList[0].id;
        this.groupModel.name = this.groupList[0].name;
      });
    },
    initJob() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/job/selectJobAll",
        data: {
          data: {},
        },
      }).then((res) => {
        this.jobList = res.data.data.jobList;
        this.jobModel.id = this.jobList[0].id;
        this.jobModel.name = this.jobList[0].name;
      });
    },
    reset() {
      this.form.id = null;
      this.form.name = null;
      this.form.password = null;
      this.form.idCard = null;
      this.form.sex = "1";
      this.form.phone = null;
      this.form.entryTime = null;
      this.form.leaveTime = null;
      this.form.email = null;
      this.form.roleId = null;
      this.form.jobId = null;
      this.form.orgId = null;
      this.form.status = null;
      this.form.description = null;
      this.roleModel.id = null;
      this.jobModel.id = null;
      this.groupModel.id = null;
    },
    addUser() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/user/saveUser",
        data: {
          data: {
            name: this.form.name,
            password: this.form.password,
            phone: this.form.phone,
            email: this.form.email,
            jobId: this.jobModel.id,
            groupId: this.groupModel.id,
            roleId: this.roleModel.id,
            sex: this.form.sex,
            entryTime: this.form.entryTime,
            leaveTime: this.form.leaveTime,
            description: this.form.description,
          },
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$message("操作成功！");
        }
      });
    },
    updateUser() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/user/updateUser",
        data: {
          data: {
            id: this.form.id,
            name: this.form.name,
            password: this.form.password,
            phone: this.form.phone,
            email: this.form.email,
            jobId: this.jobModel.id,
            groupId: this.groupModel.id,
            roleId: this.roleModel.id,
            sex: this.form.sex,
            entryTime: this.form.entryTime,
            leaveTime: this.form.leaveTime,
            description: this.form.description,
          },
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$message("操作成功！");
        }
      });
    },
    // initDic(dicType) {
    //   this.axios({
    //     method: "post",
    //     url: "/myoa/smbus/dic/dic/selectDicInType",
    //     data: {
    //       data: {
    //         type: dicType,
    //       },
    //     },
    //   }).then((res) => {
    //     this.contactTypeList = res.data.data.dicList;
    //     this.contactType.id = this.contactTypeList[0].id;
    //   });
    // },
  },
};
</script>