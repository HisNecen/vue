<template>
  <div>
    <el-card style="background-color:#f4f4f5;">
      <el-col :span="24">
        <h3 style="position: absolute">月报表</h3>
        <div class="grid-content bg-purple-dark">
          <el-form
            label-position="right"
            :inline="true"
            :model="form"
            class="demo-form-inline"
            style="text-align: right"
          >
            <el-form-item label="日期">
              <div class="block">
                <el-date-picker
                  type="month"
                  v-model="form.month"
                  placeholder="选择日期"
                  format="yyyy-MM"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="用户" :inline="true">
              <el-select
                v-model="form.userIdMonth"
                placeholder="请选择活动区域"
              >
                <el-option value="" v-if="userAll" label="全部">全部</el-option>
                <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目组" :inline="true">
              <el-select
                v-model="form.groupIdMonth"
                placeholder="请选择活动区域"
              >
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
                @click="onsubmitMonth()"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <el-divider></el-divider>
      </el-col>
      <el-col :span="11">
        <el-tag effect="dark">收入</el-tag>
        <el-table
          :data="tableMonthIncome"
          :stripe="true"
          border
          :row-style="{ height: '30px' }"
          :cell-style="{ padding: '0px'}"
          style="width: 100%;"
        >
          <el-table-column prop="date" label="月份" :formatter="dateFormat" width="120">
          </el-table-column>
          <el-table-column prop="amountAll" label="金额 ( 单位:￥ )" width="180">
          </el-table-column>
          <el-table-column prop="smbusUser.name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="smbusUser.smbusOrg.name" label="项目">
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
      </el-col>
      <el-col :span="1"> &nbsp; </el-col>
      <el-col :span="11">
        <el-tag type="warning" effect="dark">支出</el-tag>
        <el-table
          :data="tableMonthPay"
          :stripe="true"
          border
          :row-style="{ height: '30px' }"
          :cell-style="{ padding: '0px' }"
          style="width: 100%"
        >
          <el-table-column prop="date" label="月份" :formatter="dateFormat" width="120">
          </el-table-column>
          <el-table-column prop="amountAll" label="金额 ( 单位:￥ )" width="180">
          </el-table-column>
          <el-table-column prop="smbusUser.name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="smbusUser.smbusOrg.name" label="项目">
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
      </el-col>
    </el-card>
    <br />
    <el-card style="background-color:#f0f9eb;">
      <el-col :span="24">
        <h3 style="position: absolute">日报表</h3>
        <div class="grid-content bg-purple-dark">
          <el-form
            label-position="right"
            :inline="true"
            :model="form"
            class="demo-form-inline"
            style="text-align: right"
          >
            <el-form-item label="日期">
              <div class="block">
                <el-date-picker
                  type="date"
                  v-model="form.date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="用户" :inline="true">
              <el-select v-model="form.userId" placeholder="请选择活动区域">
                <el-option value v-if="userAll" label="全部">全部</el-option>
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
                @click="onsubmit()"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <el-divider></el-divider>
      </el-col>

      <el-col :span="11">
        <el-tag effect="dark">收入</el-tag>
        <el-table
          :data="tableDataIncome"
          :stripe="true"
          border
          :row-style="{ height: '30px' }"
          :cell-style="{ padding: '0px' }"
          style="width: 100%"
        >
          <el-table-column prop="date" label="日期" width="120">
          </el-table-column>
          <el-table-column prop="amountAll" label="金额 ( 单位:￥ )" width="180">
          </el-table-column>
          <el-table-column prop="smbusUser.name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="smbusUser.smbusOrg.name" label="项目">
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
      </el-col>
      <el-col :span="1"> &nbsp; </el-col>
      <el-col :span="11">
        <el-tag type="warning" effect="dark">支出</el-tag>
        <el-table
          :data="tableDatePay"
          :stripe="true"
          border
          :row-style="{ height: '30px' }"
          :cell-style="{ padding: '0px' }"
          style="width: 100%"
        >
          <el-table-column prop="date" label="日期" width="120">
          </el-table-column>
          <el-table-column prop="amountAll" label="金额 ( 单位:￥ )" width="180">
          </el-table-column>
          <el-table-column prop="smbusUser.name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="smbusUser.smbusOrg.name" label="项目">
          </el-table-column>
        </el-table>
        <el-divider></el-divider>
      </el-col>
    </el-card>
  </div>
</template>
<script>
import util from "../../util/dateutil";
export default {
  data() {
    return {
      tableDataIncome: [],
      tableDatePay: [],
      tableMonthIncome: [],
      tableMonthPay: [],
      form: {
        userId: null,
        groupId: null,
        date: "",
        month: "",
        userIdMonth: null,
        groupIdMonth: null,
      },
      userAll: false,
      groupAll: false,
      userList: [],
      groupList: [],
    };
  },
  created() {
    this.initUserList();
    this.getNowDate();
    this.getNowMonth();
  },
  mounted() {},
  methods: {
    onsubmit() {
      this.initIncomeData();
    },
    onsubmitMonth() {
      this.initIncomeMonth();
    },
    initIncomeData: async function () {
      this.form.date = util.dateFormatYMD(this.form.date);
      if (this.form.userId == "") {
        this.form.userId = null;
      }
      if (this.form.groupId == "") {
        this.form.groupId = null;
      }
      await this.axios({
        method: "post",
        url: "/myoa/smbus/report/selectIncomeDateReport",
        async: false,
        data: {
          data: {
            userId: this.form.userId,
            orgId: this.form.groupId,
            date: this.form.date,
          },
        },
      }).then((res) => {
        this.tableDataIncome = res.data.data.incomeDRList;
        this.initPayRecodeData();
      });
    },
    initPayRecodeData: async function () {
      this.form.date = util.dateFormatYMD(this.form.date);
      if (this.form.userId == "") {
        this.form.userId = null;
      }
      if (this.form.groupId == "") {
        this.form.groupId = null;
      }
      await this.axios({
        method: "post",
        url: "/myoa/smbus/report/selectPayRecodeDateReport",
        async: false,
        data: {
          data: {
            userId: this.form.userId,
            orgId: this.form.groupId,
            date: this.form.date,
          },
        },
      }).then((res) => {
        this.tableDatePay = res.data.data.payRecodeDRList;
      });
    },
    initIncomeMonth: async function () {
      this.form.month = util.dateFormatYM(this.form.month);
      if (this.form.userIdMonth == "") {
        this.form.userIdMonth = null;
      }
      if (this.form.groupIdMonth == "") {
        this.form.groupIdMonth = null;
      }
      await this.axios({
        method: "post",
        url: "/myoa/smbus/report/selectIncomeMonthReport",
        async: false,
        data: {
          data: {
            userId: this.form.userIdMonth,
            orgId: this.form.groupIdMonth,
            date: this.form.month,
          },
        },
      }).then((res) => {
        this.tableMonthIncome = res.data.data.incomeMRList;
        this.initPayRecodeMonth();
      });
    },
    initPayRecodeMonth: async function () {
      this.form.month = util.dateFormatYM(this.form.month);
      if (this.form.userIdMonth == "") {
        this.form.userIdMonth = null;
      }
      if (this.form.groupIdMonth == "") {
        this.form.groupIdMonth = null;
      }
      await this.axios({
        method: "post",
        url: "/myoa/smbus/report/selectPayRecodeMonthReport",
        async: false,
        data: {
          data: {
            userId: this.form.userIdMonth,
            orgId: this.form.groupIdMonth,
            date: this.form.month,
          },
        },
      }).then((res) => {
        this.tableMonthPay = res.data.data.payRecodeMRList;
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
          this.form.userIdMonth = this.userList[0].id;
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
          this.form.groupIdMonth = this.groupList[0].id;
        } else {
          this.groupAll = true;
        }
        this.initIncomeData();
        this.initIncomeMonth();
      });
    },
    getNowDate() {
      this.form.date = util.dateFormatYMD(new Date());
      console.log(this.date);
    },
    getNowMonth() {
      this.form.month = util.dateFormatYM(new Date());
    },
    dateFormat: function (row, column) {
      var date2 = row[column.property];
      return util.dateFormatYM(date2);
    },
  },
};
</script>