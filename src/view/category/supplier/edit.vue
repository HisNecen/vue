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
          <el-form-item label="账号">
            <el-input v-model="form.contactNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="类型" :inline="true">
            <el-select v-model="contactType.id" placeholder="请选择活动区域">
              <el-option
                v-for="item in contactTypeList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
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
import supplier from "./supplier"
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        contactNum: "",
        contactType: "",
        desc: "",
      },
      editName: "",
      editProp: false,
      contactTypeList: [],
      contactType: {
        id: "",
        name: "",
        type: "",
        value: "",
      },
    };
  },
  created: function () {
    this.initDic("1");
  },
  methods: {
    onSubmit() {
      if (this.form.id == null) {
        this.addSupllier();
      } else {
        this.updateSupllier();
      }
      this.cancelButton();
      this.$parent.initSupplierData();
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
        this.contactTypeList = res.data.data.dicList;
        this.contactType.id = this.contactTypeList[0].id;
      });
    },
    initData(id) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/supplire/selectSupplire",
        data: {
          data: {
            id: id,
          },
        },
      }).then((res) => {
        this.form = res.data.data;
        this.contactType.id = this.form.contactType;
      });
    },
    reset() {
      return {
        form: {
          id: "",
          name: "",
          contactNum: "",
          contactType: "",
          desc: "",
        },
      };
    },
    addSupllier() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/supplire/saveSupplire",
        data: {
          data: {
            name: this.form.name,
            contactNum: this.form.contactNum,
            contactType: this.contactType.id,
            desc: this.form.desc,
          },
        },
      }).then((res) => {
        if(res.status==200){
          this.$message("操作成功！");
        }
      });
    },
    updateSupllier() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/supplire/updateSupplire",
        data: {
          data: {
            id: this.form.id,
            name: this.form.name,
            contactNum: this.form.contactNum,
            contactType: this.contactType.id,
            desc: this.form.desc,
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