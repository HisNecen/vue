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
          <el-form-item label="薪资">
            <el-input v-model="form.salary"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="类型" :inline="true">
            <el-select v-model="dicType.id" placeholder="请选择活动区域">
              <el-option
                v-for="item in dicTypeList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="个人说明">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{editName}}</el-button>
        <el-button @click="cancelButton()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import job from "./job";
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        type: "",
        salary: "",
        description: "",
      },
      editName: "",
      editProp: false,
      dicTypeList: [],
      dicType: {
        id: "",
        name: "",
        type: "",
        value: "",
      },
    };
  },
  created: function () {
    this.initDic("2");
  },
  methods: {
    onSubmit() {
      if (this.form.id == null) {
        this.addJob();
      } else {
        this.updateJob();
      }
      this.cancelButton();
      this.$parent.initJobData();
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
        this.dicTypeList = res.data.data.dicList;
        this.dicType.id = this.dicTypeList[0].id;
      });
    },
    initData(id) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/job/selectJob",
        data: {
          data: {
            id: id,
          },
        },
      }).then((res) => {
        this.form = res.data.data;
        this.dicType.id = this.form.type;
      });
    },
    reset() {
      return {
        form: {
          id: "",
          name: "",
          type: "",
          salary: "",
          description: "",
        },
      };
    },
    addJob() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/job/saveJob",
        data: {
          data: {
            name: this.form.name,
            salary: this.form.salary+"",
            type: this.dicType.id,
            description: this.form.description,
          },
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$message("操作成功！");
        }
      });
    },
    updateJob() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/job/updateJob",
        data: {
          data: {
            id: this.form.id,
            name: this.form.name,
            salary: this.form.salary+"",
            type: this.dicType.id,
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