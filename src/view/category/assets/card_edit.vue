<template>
  <el-dialog
    title="银行卡信息"
    class="userEidt"
    :close-on-click-modal="false"
    :visible.sync="editProp"
  >
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="标号" hidden>
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="卡号">
            <el-input v-model="form.cardNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话号">
            <el-input v-model="form.phoneNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号">
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="银行名称">
            <el-input v-model="form.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户地址">
            <el-input v-model="form.bankAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="卡类型">
            <el-select v-model="form.cardType" placeholder="请选择活动区域">
              <el-option
                v-for="item in cardTypeList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="卡状态">
            <el-select v-model="form.cardStatus" placeholder="请选择活动区域">
              <el-option
                v-for="item in cardStatusList"
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
          <el-form-item label="卡级别">
            <el-select v-model="form.cardLevel" placeholder="请选择活动区域">
              <el-option
                v-for="item in cardLevelList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开户日期">
            <div class="block">
              <el-date-picker
                v-model="form.cardBuilddate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="账户余额">
            <el-input v-model="form.cardBalance"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关联电话">
            <el-input v-model="form.cardLinkphone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="ATM密码">
            <el-input v-model="form.cardAtmpassword"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="网银登录密码">
            <el-input v-model="form.cardWebpassword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="U盾密码">
            <el-input v-model="form.cardUdunpassword"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="网银付款密码">
            <el-input v-model="form.cardPaypassword"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="租金">
            <el-input v-model="form.rent"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="卡来源">
            <el-input v-model="form.rentfrom"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col >
          <el-form-item label="描述">
            <el-input v-model="form.description" type="textarea"></el-input>
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
import assetshome from "./assets_home";
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        idCard: "",
        phoneNumber: "",
        cardNumber: "",
        bankName: "",
        bankAddress: "",
        cardType: 79,
        cardStatus: 81,
        cardLevel: 87,
        cardBuilddate: "",
        cardBalance: "",
        cardLinkphone: "",
        cardAtmpassword: "",
        cardWebpassword: "",
        cardUdunpassword: "",
        cardPaypassword: "",
        rent: "",
        rentfrom: "",
        description: "",
      },
      editProp: false,
      editName: "添加",
      cardTypeList: [],
      cardStatusList: [],
      cardLevelList: [],
    };
  },
  created() {
    this.initCardType("17");
    this.initCardStatus("18");
    this.initCardLevel("19");
  },
  methods: {
    initData(id) {
      this.editProp = true;
      if (id == null || id == "") {
        this.editName = "添加";
        this.reset();
      } else {
        this.editName = "保存";
        this.initCardInfo(id);
      }
    },
    initCardInfo(id) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/card/selectCard",
        data: {
          data: {
            id: id,
          },
        },
      }).then((res) => {
        this.form = res.data.data;
      });
    },
    initCardType(type) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        data: {
          data: {
            type: type,
          },
        },
      }).then((res) => {
        this.cardTypeList = res.data.data.dicList;
        this.form.cardType = this.cardTypeList[0].id;
      });
    },
    initCardStatus(status) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        data: {
          data: {
            type: status,
          },
        },
      }).then((res) => {
        this.cardStatusList = res.data.data.dicList;
        this.form.cardStatus = this.cardStatusList[0].id;
      });
    },
    initCardLevel(level) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        data: {
          data: {
            type: level,
          },
        },
      }).then((res) => {
        this.cardLevelList = res.data.data.dicList;
        this.form.cardLevel = this.cardLevelList[0].id;
      });
    },
    onSubmit() {
      if (this.form.id == null || this.form.id == "") {
        this.addCard();
      } else {
        this.updateCard();
      }
      this.cancelButton();
    },
    addCard() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/card/saveCard",
        data: {
          data: this.form,
        },
      }).then((res) => {
        this.$message("操作成功！");

        this.$parent.initCardData();
      });
    },
    updateCard() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/card/updateCard",
        data: {
          data: this.form,
        },
      }).then((res) => {
        this.$message("操作成功！");

        this.$parent.initCardData();
      });
    },
    cancelButton() {
      this.reset();
      this.editProp = false;
    },
    reset() {
      this.form.id = "";
      this.form.name = "";
      this.form.idCard = "";
      this.form.phoneNumber = "";
      this.form.cardNumber = "";
      this.form.bankName = "";
      this.form.bankAddress = "";
      this.form.cardType = 79;
      this.form.cardStatus = 81;
      this.form.cardLevel = 87;
      this.form.cardBuilddate = "";
      this.form.cardBalance = "";
      this.form.cardLinkphone = "";
      this.form.cardAtmpassword = "";
      this.form.cardWebpassword = "";
      this.form.cardUdunpassword = "";
      this.form.cardPaypassword = "";
      this.form.rent = "";
      this.form.rentfrom = "";

      this.description = "";
    },
  },
};
</script>