<template>
  <div>
    <el-dialog
      title="添加记录"
      class="userEidt"
      :close-on-click-modal="false"
      :visible.sync="addNoteProp"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标号" hidden>
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-row>
          <el-col>
            <el-form-item label="记录名称">
              <el-input type="text" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="内容">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="描述">
              <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{ editName }}</el-button>
          <el-button @click="cancelButton()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import notebook from "./notebook";
export default {
  data() {
    return {
      addNoteProp: false,
      editName: "添加",
      form: {
        id: "",
        name: "",
        content: "",
        description: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.form.id == null || this.form.id == "") {
        this.axios({
          method: "post",
          url: "/myoa/smbus/notebook/saveNote",
          data: {
            data: {
              name: this.form.name,
              content: this.form.content,
              description: this.form.description,
            },
          },
        }).then((res) => {
          this.$message("添加成功！");
          this.$parent.initData();
        });
      } else {
        this.axios({
          method: "post",
          url: "/myoa/smbus/notebook/updateNote",
          data: {
            data: {
              id: this.form.id,
              name: this.form.name,
              content: this.form.content,
              description: this.form.description,
            },
          },
        }).then((res) => {
          this.$message("修改成功！");
          this.$parent.initData();
        });
      }
      this.cancelButton();
    },
    cancelButton: function () {
      this.addNoteProp = false;
    },
    showAddNote: function (id) {
      this.addNoteProp = true;
      if (id != null) {
        this.editName = "保存";
        this.form.id = id;
        this.initDate();
      } else {
        this.editName = "添加";

        this.form.id = "";
        this.form.name = "";
        this.form.content = "";
        this.form.description = "";
      }
    },
    initDate() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/notebook/selectNote",
        data: {
          data: {
            id: this.form.id,
          },
        },
      }).then((res) => {
        this.form.name = res.data.data.name;
        this.form.content = res.data.data.content;
        this.form.description = res.data.data.description;
      });
    },
  },
};
</script>