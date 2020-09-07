<template>
  <el-dialog title="用户信息" class="userEidt" :close-on-click-modal="false" :visible.sync="editProp">
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
          <el-form-item label="电话">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="邮箱">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="职务" :inline="true">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机构" :inline="true">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="入职日期">
            <div class="block">
              <el-date-picker v-model="form.entryTime" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="离职日期">
            <div class="block">
              <el-date-picker v-model="form.entryTime" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="个人说明">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
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
        name: "",
        orgId: "",
        jobId: "",
        roleId: "",
        sex: "0",
        status: "",
        entryTime: "",
      },
      editProp: false,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    init(id) {
      this.editProp = true;
    },
  },
};
</script>