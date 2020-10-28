<template>
  <div class="income">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form
            label-position="right"
            :inline="true"
            :model="form"
            class="demo-form-inline"
            style="text-align: right"
          >
            <el-row>
              
              <el-form-item label="类型" :inline="true">
                <el-select
                  v-model="form.payRecodeType"
                  placeholder="请选择活动区域"
                >
                  <el-option
                    v-for="item in payRecodeTypeList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态" :inline="true">
                <el-select
                  v-model="form.payRecodeStatus"
                  placeholder="请选择活动区域"
                >
                  <el-option
                    v-for="item in payRecodeStatusList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户" :inline="true">
                <el-select v-model="form.userId" placeholder="请选择活动区域">
                  <el-option value="" v-if="userAll" label="全部"
                    >全部</el-option
                  >
                  <el-option
                    v-for="item in userList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目组" :inline="true">
                <el-select v-model="form.groupId" placeholder="请选择活动区域">
                  <el-option value="" v-if="groupAll" label="全部"
                    >全部</el-option
                  >
                  <el-option
                    v-for="item in groupList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="onSubmit()"
                  >查询</el-button
                >
              </el-form-item>
              
            </el-row>
            <el-row>
              <el-form-item label="收款方">
                <el-input v-model="form.name" placeholder="收款方"></el-input>
              </el-form-item>
              <el-form-item label="付款账号">
                <el-input
                  v-model="form.bankAccount"
                  placeholder="付款账号"
                ></el-input>
              </el-form-item>
              <el-form-item label="供应商" :inline="true">
                <el-select
                  v-model="form.supplireId"
                  placeholder="请选择活动区域"
                >
                  <el-option
                    v-for="item in supplireList"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  @click="payRecodeEdit()"
                  >添加</el-button
                >
              </el-form-item>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-collapse accordion>
      <el-collapse-item v-for="item in payRecodeList" :key="item.id">
        <template slot="title">
          <el-tag type="danger" size="mini">支出</el-tag>
          <span style="width: 15%"
            > <i class="el-icon-date" style="color: blue"></i>
            {{ item.addTime | addTimeFilter }}</span
          >
          <span style="width: 15%"
            ><i class="header-icon el-icon-info" style="color: red"></i>
            金额：{{ item.amount }} ¥</span
          >
          <span style="width: 35%"
            ><i class="el-icon-user-solid" style="color: #00ffff"></i>
            付款卡:<span v-if="item.cardPay != null">{{
              item.cardPay.name
            }}</span>
            {{ item.bankname }}</span
          >
          <span v-if="item.userPay != null" style="width: 100px"
            ><i class="el-icon-user" style="color: #daa520"></i> 付款人：{{
              item.userPay.name
            }}</span
          >
        </template>
        <hr />
        <div class="incomeinfo">
          <td v-if="item.statusDic != null" style="width: 150px">
            <i class="el-icon-circle-check" style="color: #409eff"></i> 状态：{{
              item.statusDic.name
            }}
          </td>
          <td v-if="item.typeDic != null" style="width: 200px">
            <i class="el-icon-s-help" style="color: #67c23a"></i> 类型：{{
              item.typeDic.name
            }}
          </td>
          <td style="width: 200px">
            <i class="el-icon-postcard" style="color: #ffd700"></i> 卡号：{{
              item.bankaccount
            }}
          </td>
          <br />
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            style="position: absolute; right: 5%"
            @click="payRecodeDelete(item.id,item.amount)"
          ></el-button>
          <el-popover
            placement="right"
            trigger="click"
            style="position: absolute; right: 7%"
          >
            <el-button type="success" size="mini" @click="ST(item.id,16)">到账</el-button>
            <el-button type="danger" size="mini" @click="ST(item.id,18)">未到账</el-button>
            <el-button type="info" size="mini" @click="ST(item.id,17)">补发</el-button>
            <el-button type="warning" size="mini" @click="ST(item.id,19)">错发账号</el-button>
            <el-button
              slot="reference"
              size="mini"
              type="success"
              circle
            >ST</el-button>
          </el-popover>
          <td v-if="item.payee != null">
            <i class="el-icon-s-custom" style="color: orange"></i> 收款方：{{
              item.payee
            }}
          </td>
          <br/>
          <td>
            <i class="el-icon-question" style="color:#4B0082;"></i> 描述：{{item.description}}
          </td>

          <br />
          <td v-if="item.supplirePay != null" style="width: 150px">
            <i class="el-icon-smoking" style="color: #00ff7f"></i> 来自：{{
              item.supplirePay.name
            }}
          </td>
          <td v-if="item.orgPay != null">
            <i class="el-icon-ship" style="color: #c71585"></i> 项目：{{
              item.orgPay.name
            }}
          </td>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- addOrUpdate -->
    <add-or-update v-if="editProp" ref="addOrUpdate"></add-or-update>
  </div>
</template>
<script>
import addOrUpdate from "./edit";
import util from "../../util/dateutil";
export default {
  components: {
    addOrUpdate: addOrUpdate,
  },
  data() {
    return {
      form: {
        payRecodeType: null,
        payRecodeStatus: null,
        userId: null,
        groupId: null,
        supplireId: null,
        bankAccount: "",
        name: "",
      },
      userAll: false,
      groupAll: false,
      editProp: false,
      payRecodeList: [],
      payRecodeTypeList: [],
      payRecodeStatusList: [],
      userList: [],
      groupList: [],
      supplireList: [],
    };
  },
  created() {
    this.initPayRecodeTypeList();
    this.initPayRecodeStatusList();
    this.initUserList();
    this.initSupplireList();
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.initData();
    },
    payRecodeEdit() {
      this.editProp = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.initPayRecodeData();
      });
    },
    payRecodeDelete(id,value){
      //普通调用方式
      this.$confirm("将删除" + value + ", 是否确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios({
            method: "post",
            url: "/myoa/smbus/payRecode/deletePayRecode",
            data: {
              data: {
                id: id,
              },
            },
          }).then((res) => {
            if (res.status == 200) {
              this.$message("删除成功！");
            }
            this.initData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    initData: async function () {
      if (this.form.userId == "") {
        this.form.userId = null;
      }
      if (this.form.groupId == "") {
        this.form.groupId = null;
      }
      await this.axios({
        method: "post",
        url: "/myoa/smbus/payRecode/selectPayRecodeAll",
        async: false,
        data: {
          data: {
            orgId: this.form.groupId,
            userId: this.form.userId,
            supplireId: this.form.supplireId,
            incomeType: this.form.incomeType,
            incomeStatus: this.form.incomeStatus,
            name: this.form.name,
            bankAccount: this.form.bankAccount,
          },
        },
      }).then((res) => {
        this.payRecodeList = res.data.data.payRecodeList;
      });
    },
    initPayRecodeTypeList: async function () {
      await this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        async: false,
        data: {
          data: {
            type: "9",
          },
        },
      }).then((res) => {
        this.payRecodeTypeList = res.data.data.dicList;
      });
    },
    initPayRecodeStatusList: async function () {
      await this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        async: false,
        data: {
          data: {
            type: "6",
          },
        },
      }).then((res) => {
        this.payRecodeStatusList = res.data.data.dicList;
      });
    },
    initUserList: async function () {
      await this.axios({
        method: "post",
        url: "/myoa/smbus/user/selectUserListByUser",
        async: false,
        data: {
          data: {},
        },
      }).then((res) => {
        this.userList = res.data.data.userList;
        if (this.userList.length == 1) {
          this.form.userId = this.userList[0].id;
        } else {
          this.userAll = true;
        }
        this.initGroupList();
      });
    },
    initGroupList: async function () {
      await this.axios({
        method: "post",
        url: "/myoa/smbus/org/selectOrgListByUser",
        async: false,
        data: {
          data: {},
        },
      }).then((res) => {
        this.groupList = res.data.data.orgList;
        if (this.groupList.length == 1) {
          this.form.groupId = this.groupList[0].id;
        } else {
          this.groupAll = true;
        }
        this.initData();
      });
    },
    initSupplireList: async function () {
      await this.axios({
        method: "post",
        url: "/myoa/smbus/supplire/selectSupplireAll",
        async: false,
        data: {
          data: {},
        },
      }).then((res) => {
        this.supplireList = res.data.data.supplireList;
        if (this.supplireList.length == 1) {
          this.form.supplireId = this.supplireList[0].id;
        }
      });
    },
    ST (id,value) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/payRecode/updatePayRecodeStatus",
        data: {
          data: {
            id: id,
            dicId: value,
          },
        },
      }).then((res) => {
        this.$message("操作成功！");
        this.initData();
      }).catch((res) => {
        this.$message("操作失败！");
      });
    }
  },
  filters: {
    addTimeFilter: function (value) {
      return util.dateFormatYMDHMS(value);
    },
  },
};
</script>
<style>
.incomeinfo td {
  line-height: 10px;
}
</style>
