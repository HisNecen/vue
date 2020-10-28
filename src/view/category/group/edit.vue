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
        <el-col>
          <el-form-item label="编码">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{editName}}</el-button>
        <el-button @click="cancelButton()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import group from "./group"
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        code: "",
      },
      editName: "",
      editProp: false,
      
    };
  },
  created: function () {
  },
  methods: {
    onSubmit() {
      if (this.form.id == null) {
        this.addGroup();
      } else {
        this.updateGroup();
      }
      this.cancelButton();
      this.$parent.initGroupData();
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
        url: "/myoa/smbus/org/selectOrg",
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
          code: "",
        },
      };
    },
    addGroup() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/org/saveOrg",
        data: {
          data: {
            name: this.form.name,
            code: this.form.code,
            status: "14",
            parent: -1,
          },
        },
      }).then((res) => {
        if(res.status==200){
          this.$message("操作成功！");
        }
      });
    },
    updateGroup() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/org/updateOrg",
        data: {
          data: {
            id: this.form.id,
            name: this.form.name,
            code: this.form.code,
            status: "14",
            parent: -1,
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