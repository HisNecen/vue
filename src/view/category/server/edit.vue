<template>
  <el-dialog
    title="服务器信息"
    class="userEidt"
    :close-on-click-modal="false"
    top="60px"
    :visible.sync="editEditProp"
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

      <el-divider><i class="el-icon-edit-outline"></i> 其他信息</el-divider>

      <el-row>
        <el-col :span="12">
          <el-form-item label="流量权重">
            <el-input v-model="form.flowwight"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-select
              v-model="form.status"
              placeholder="请选择活动区域"
              style="width: 100%"
            >
              <el-option
                v-for="item in statusList"
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
          <el-form-item label="是否转移">
            <el-switch
              v-model="form.transferStatus"
              active-text="已转移"
              inactive-text="当前"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转移至">
            <el-select
              v-model="form.transferServerId"
              placeholder="请选择活动区域"
              style="width: 100%"
            >
              <el-option
                value=""
                label="无"
                key=""
              ></el-option>
              <el-option
                v-for="item in serverList"
                :key="item.id"
                :value="item.id"
                :label="item.name+' '+item.priip"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="心跳开关">
            <el-switch
              v-model="form.heartbytes"
              active-text="心跳开"
              inactive-text="心跳关"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="心跳地址">
            <el-input v-model="form.heartbytesUrl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

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
        id: null,
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

        flowwight: null,
        status: null,
        transferStatus: null,
        transferServerId: null,
        heartbytesUrl: "",
        heartbytes: null,
      },
      supplireList: [],
      userList: [],
      procedureList: [],
      feeTypeList: [],

      statusList: [],
      serverList: [],
      editName: "",
      editEditProp: false,
    };
  },
  created: function () {
    this.initFeeTypeList("3");
    this.initProcedureList("8");
    this.initSupplireList();
    this.initUserList();
    this.initExpireTime();
    this.initServerStatusList('4');
    this.initServerList();
  },
  methods: {
    onSubmit() {
        this.updateServer();
    },
    updateServer() {
      this.form.expireTime = util.dateFormatYMDHMS(this.form.expireTime);
      if (
        this.form.name == null || this.form.name == '' ||
        this.form.price == null || this.form.price == '' ||
        this.form.priip == null || this.form.priip == ''
      ) {
        this.$message({message:"必填项不能为空！",type:'warning'});
        return;
      }

      if(this.form.transferServerId==this.form.id){
        this.$message({message:"服务器不能转移到自己归属的服务器上！",type:"error"});
        return;
      }

      if(this.form.heartbytes == true){
          this.form.heartbytes = 1;
      }else{
          this.form.heartbytes = 0;
      }
      if(this.form.transferStatus == true){
          this.form.transferStatus = 1;
      }else{
          this.form.transferStatus = 0;
      }
      if(this.form.transferServerId == ''){
          this.form.transferServerId = null;
      }
      this.axios({
        method: "post",
        url: "/myoa/smbus/server/updateServer",
        data: {
          data: this.form
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$message("操作成功！");
        }
        this.cancelButton();
        this.$parent.initServerData();
      });
    },
    init(id) {
      this.editEditProp = true;
      if (id != null) {
        this.editName = "创建";
        this.initData(id);
      }
    },
    cancelButton() {
      this.editEditProp = false;
    },
    initData(id) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/server/selectServer",
        data: {
          data: {
            id: id,
          },
        },
      }).then((res) => {
        this.form = res.data.data;
        console.log(this.form.supplierId);
        if(this.form.heartbytes == 1){
            this.form.heartbytes = true;
        }
        if(this.form.transferStatus == 1){
            this.form.transferStatus = true;
        }
        if(this.form.transferServerId==-1){
            this.form.transferServerId = null;
        }
      });
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
    initServerStatusList(dicType){
        this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        data: {
          data: {
            type: dicType,
          },
        },
      }).then((res) => {
        this.statusList = res.data.data.dicList;
      });
    },
    initServerList(){
        this.axios({
        method: "post",
        url: "/myoa/smbus/server/selectServerAll",
        data: {
          data: {
          },
        },
      }).then((res) => {
        this.serverList = res.data.data.serverList;
        console.log(this.serverList)
      });
    },
    initExpireTime() {
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
    
  },
};
</script>