<template>
  <el-dialog
    title="服务器信息"
    class="userEidt"
    :close-on-click-modal="false"
    top="60px"
    :visible.sync="editProp"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标号" hidden>
        <el-input v-model="form.id"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="供应商" :inline="true">
            <el-select
              v-model="form.supplierId"
              placeholder="请选择活动区域"
              style="width: 100%"
            >
              <el-option
                v-for="item in supplireList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户" :inline="true">
            <el-select
              v-model="form.userId"
              placeholder="请选择活动区域"
              style="width: 100%"
            >
              <el-option
                v-for="item in userList"
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
          <el-form-item
            label="名称"
            prop="name"
            :rules="[{ required: true, message: '名称不能为空' }]"
          >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="价格"
            prop="price"
            :rules="[
              { required: true, message: '金额不能为空' },
              { type: 'number', message: '金额必须为数字值' },
            ]"
          >
            <el-input
              v-model.number="form.price"
              type="price"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            label="主IP"
            prop="priip"
            :rules="[{ required: true, message: '主IP不能为空' }]"
          >
            <el-input v-model="form.priip"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="端口">
            <el-input v-model="form.port"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="IP段">
            <el-input v-model="form.iprange" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="登录名">
            <el-input v-model="form.loginName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="程序类型" :inline="true">
            <el-select
              v-model="form.procedureId"
              placeholder="请选择活动区域"
              style="width: 100%"
            >
              <el-option
                v-for="item in procedureList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="LA51">
            <el-input v-model="form.la51"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="付费规则" :inline="true">
            <el-select
              v-model="form.feeType"
              placeholder="请选择活动区域"
              style="width: 100%"
            >
              <el-option
                v-for="item in feeTypeList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到期日">
            <div class="block">
              <el-date-picker
                v-model="form.expireTime"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="说明">
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
import server from "./server";
import util from "../../util/dateutil";
export default {
  data() {
    return {
      form: {
        name: "",
        supplierId: null,
        userId: null,
        price: null,
        priip: "",
        iprange: "",
        port: "",
        loginName: "",
        password: "",
        procedureId: null,
        la51: "",
        feeType: null,
        expireTime: "",
        description: "",
      },
      supplireList: [],
      userList: [],
      procedureList: [],
      feeTypeList: [],
      editName: "",
      editProp: false,
    };
  },
  created: function () {
    this.initFeeTypeList("3");
    this.initProcedureList("8");
    this.initSupplireList();
    this.initUserList();
    this.initExpireTime();
  },
  methods: {
    onSubmit() {
      if (this.form.id == null) {
        this.addServer();
      } else {
        this.updateServer();
      }
    },
    init(id) {
      this.editProp = true;
      if (id == null) {
        this.editName = "创建";
      }
    },
    cancelButton() {
      this.editProp = false;
    },
    initFeeTypeList(dicType) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        data: {
          data: {
            type: dicType,
          },
        },
      }).then((res) => {
        this.feeTypeList = res.data.data.dicList;
        this.form.feeType = this.feeTypeList[0].id;
      });
    },
    initProcedureList(dicType) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        data: {
          data: {
            type: dicType,
          },
        },
      }).then((res) => {
        this.procedureList = res.data.data.dicList;
        this.form.procedureId = this.procedureList[0].id;
      });
    },
    initUserList() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/user/selectUserAll",
        data: {
          data: {},
        },
      }).then((res) => {
        this.userList = res.data.data.userList;
        this.form.userId = this.userList[0].id;
      });
    },
    initSupplireList() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/supplire/selectSupplireAll",
        data: {
          data: {},
        },
      }).then((res) => {
        this.supplireList = res.data.data.supplireList;
        this.form.supplireId = this.supplireList[0].id;
      });
    },
    initExpireTime(){
      this.form.expireTime = util.dateFormatYMD(new Date());
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
    addServer() {
      this.form.expireTime = util.dateFormatYMDHMS(this.form.expireTime);
      if (
        this.form.name == null ||
        this.form.price == null ||
        this.form.priip == null
      ) {
        this.$message("必填项不能为空！");
        return;
      }
      this.axios({
        method: "post",
        url: "/myoa/smbus/server/saveServer",
        data: {
          data: this.form,
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$message("操作成功！");
        }
        this.cancelButton();
        this.$parent.initServerData();
      });
    },
    updateServer() {
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
        if (res.status == 200) {
          this.$message("操作成功！");
        }
      });
    },
  },
};
</script>