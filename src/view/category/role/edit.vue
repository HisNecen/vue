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
        <el-col>
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="级别" :inline="true">
            <el-select v-model="levelDic.id" placeholder="请选择活动区域">
              <el-option
                v-for="item in levelDicList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-radio v-model="form.status" label="1">正常</el-radio>
            <el-radio v-model="form.status" label="0">禁用</el-radio>
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
import Role from "./role";
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        status: "1",
        levelDic: "",
        description: "",
      },
      editName: "",
      editProp: false,
      levelDicList: [],
      levelDic: {
        id: "",
        name: "",
        type: "",
        value: "",
      },
    };
  },
  created: function () {
    this.initDic("16");
  },
  methods: {
    onSubmit() {
      if (this.form.id == null) {
        this.addRole();
      } else {
        this.updateRole();
      }
      this.cancelButton();
      this.$parent.initRoleData();
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
    initDic(dicType) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        data: {
          data: {
            type: dicType,
          },
        },
      }).then((res) => {
        this.levelDicList = res.data.data.dicList;
        this.levelDic.id = this.levelDicList[0].id;
      });
    },
    initData(id) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/role/selectRole",
        data: {
          data: {
            id: id,
          },
        },
      }).then((res) => {
        this.form = res.data.data;
        this.form.status = res.data.data.status+"";
        this.levelDic.id = this.form.levelDic.id;
      });
    },
    reset() {
        this.form={
          id: null,
          name: "",
          status: "1",
          levelDic: 78,
          description: "",
        }
        this.levelDic.id=78;
    },
    addRole() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/role/saveRole",
        data: {
          data: {
            name: this.form.name,
            status: parseInt(this.form.status),
            level: this.levelDic.id,
            description: this.form.description,
          },
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$message("操作成功！");
        }
      });
    },
    updateRole() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/role/updateRole",
        data: {
          data: {
            id: this.form.id,
            name: this.form.name,
            status: parseInt(this.form.status),
            level: this.levelDic.id,
            description: this.form.description,
          },
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$message("操作成功！");
        }
      });
    },
  },
};
</script>