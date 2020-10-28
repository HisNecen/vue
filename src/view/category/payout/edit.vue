<template>
  <el-dialog
    title="添加记录"
    class="userEidt"
    :close-on-click-modal="false"
    :visible.sync="editProp"
  >
    <el-form ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col>
          <el-form-item
            label="金额"
            prop="amount"
            :rules="[
              { required: true, message: '金额不能为空' },
              { type: 'number', message: '金额必须为数字值' },
            ]"
          >
            <el-input
              v-model.number="form.amount"
              type="amount"
              auto-complete="off"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="付款方">
            <el-input v-model="form.payee" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="描述">
            <el-input v-model="form.description" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收款卡">
            <el-select
              v-model="form.cardIdPay"
              placeholder="请选择活动区域"
              style="width: 100%"
            >
              <el-option
                v-for="item in cardList"
                :key="item.id"
                :value="item.id"
                :label="item.name + ' ' + item.bankName + ' ' + item.cardNumber"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源">
            <el-select v-model="form.supplireId" placeholder="请选择活动区域">
              <el-option
                v-for="item in supplireList"
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
          <el-form-item label="类型">
            <el-select
              v-model="form.type"
              placeholder="请选择活动区域"
              style="width: 100%"
            >
              <el-option
                v-for="item in payRecodetypeList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择活动区域">
              <el-option
                v-for="item in payRecodeStatusList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">{{ editName }}</el-button>
        <el-button @click="cancelButton()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import payout from "./payout";
export default {
  data() {
    return {
      form: {
        payee: "",
        cardIdPay: "",
        bankaccount: "",
        bankname: "",
        amount: "",
        description: "",
        supplireId: null,
        status: 16,
        type: 32,
      },
      editProp: false,
      editName: "添加",
      supplireList: [],
      cardList: [],
      payRecodetypeList: [],
      payRecodeStatusList: [],
    };
  },
  created() {
    this.initPayRecodeStatusList("6");
    this.initPayRecodeTypeList("9");
    this.initCardList();
    this.initSupplireList();
  },
  methods: {
    initPayRecodeData() {
      this.editProp = true;
      this.editName = "添加";
      this.reset();
    },
    initCardList() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/card/selectCardUser",
        data: {
          data: {},
        },
      }).then((res) => {
        this.cardList = res.data.data.cardList;
        this.form.cardIdPay = this.cardList[0].id;
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
      });
    },
    initPayRecodeTypeList(status) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        data: {
          data: {
            type: status,
          },
        },
      }).then((res) => {
        this.payRecodetypeList = res.data.data.dicList;
        this.form.type = this.payRecodetypeList[0].id;
      });
    },
    initPayRecodeStatusList(level) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        data: {
          data: {
            type: level,
          },
        },
      }).then((res) => {
        this.payRecodeStatusList = res.data.data.dicList;
        this.form.status = this.payRecodeStatusList[0].id;
      });
    },
    onSubmit() {
      this.addPayRecodeRecode();
      this.cancelButton();
    },
    addPayRecodeRecode() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/payRecode/savePayRecode",
        data: {
          data: {
            payee: this.form.payee,
            amount: this.form.amount+'',
            description: this.form.description,
            supplireId: this.form.supplireId,
            status: this.form.status,
            type: this.form.type,
            cardIdPay: this.form.cardIdPay,
          },
        },
      }).then((res) => {
        this.$message("操作成功！");

        this.$parent.initData();
      });
    },
    cancelButton() {
      this.reset();
      this.editProp = false;
    },
    reset() {
      this.form.payee = "";
      this.form.bankaccount = "";
      this.form.bankname = "";
      this.form.amount = "";
      this.form.description = "";
      this.form.supplireId = null;
      this.form.status = 16;
      this.form.type = 32;
    },
  },
};
</script>