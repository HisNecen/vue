<template>
  <el-dialog title="用户信息" class="userEidt" :close-on-click-modal="false" :visible.sync="editProp">
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
      <el-form-item label="个人说明">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{editName}}</el-button>
        <el-button @click="cancelButton()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import app from "./app"
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        desc: "",
      },
      editName: "",
      editProp: false,
    };
  },
  created: function () {
    this.initDic("1");
  },
  methods: {
    onSubmit() {
      if (this.form.id == null) {
        this.addApp();
      } else {
        this.updateApp();
      }
      this.cancelButton();
      this.$parent.initAppData();
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
        this.form = this.reset();
      }
    },
    cancelButton() {
      this.editProp = false;
    },
    initData(id) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/app/selectApp",
        data: {
          data: {
            id: id,
          },
        },
      }).then((res) => {
        this.form = res.data.data;
      });
    },
    reset() {
      return {
        form: {
          id: "",
          name: "",
          desc: "",
        },
      };
    },
    addApp() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/app/saveApp",
        data: {
          data: {
            name: this.form.name,
            description: this.form.desc,
          },
        },
      }).then((res) => {
        if(res.status==200){
          this.$message("操作成功！");
        }
      });
    },
    updateApp() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/app/updateApp",
        data: {
          data: {
            id: this.form.id,
            name: this.form.name,
            description: this.form.desc,
          },
        },
      }).then((res) => {
        if(res.status==200){
          this.$message("操作成功！");
        }
        
      });
    },
  },
};
</script>