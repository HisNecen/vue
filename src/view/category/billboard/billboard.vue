<template>
  <div>
    <el-card class="serverboard">
      <el-tag effect="dark">服务器监控面板</el-tag>
      <el-alert
        v-for="item in server.warningStatusServerList"
        :key="item.id"
        type="error"
        style="margin-top: 5px"
        @close="dealWarningStatusServer(item.id, item.name, item.priip)"
      >
        服务器 {{ item.name }} 其主IP：{{ item.priip }}:{{ item.port }}
        的心跳地址:
        <el-link type="success" :href="item.heartbytesUrl" target="_blank">{{
          item.heartbytesUrl
        }}</el-link>
        于
        {{ item.heartbytesTime }}
        时间点心跳时，判断为 【
        <span style="font-weight: bold; font-size: 13px; color: red">{{
          item.heartbytesStatus | heartbytesStatusZD
        }}</span>
        】，请及时处理！
      </el-alert>
    </el-card>
    <el-card class="cardboard">
      <el-tag effect="dark">银行卡公示面板</el-tag>
      <el-row style="margin-top: 5px; font-size: 11px">
        <el-card
          v-for="item in card.usefulCardList"
          :key="item.id"
          style="
            width: 31%;
            float: left;
            margin-left: 0.5%;
            background-color: #fdffe9;
            border-left: 5px solid #4cbd5d;
          "
        >
          <el-tag>姓名</el-tag> : {{ item.name }}<br />
          <el-tag>卡号</el-tag>：{{ item.cardNumber }}<br />
          <el-tag>银行</el-tag>：{{ item.bankName }}
        </el-card>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col
          :span="12"
          style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); padding: 15px"
        >
          <el-form
            label-position="left"
            :inline="true"
            :model="form"
            class="demo-form-inline"
            style="text-align: left"
          >
            <el-form-item label="日期">
              <div class="block">
                <el-date-picker
                  type="month"
                  v-model="form.month"
                  placeholder="选择日期"
                  format="yyyy-MM"
                  @change="groupIncomeAllUserMonthChange"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="项目组" :inline="true">
              <el-select
                v-model="form.groupId"
                @change="groupIncomeAllUserGroupChange"
                placeholder="请选择活动区域"
              >
                <el-option
                  v-for="item in groupList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div
            id="groupIncomeAllUser"
            :style="{ width: '100%', height: '400px' }"
          ></div>
        </el-col>
        <el-col
          :span="12"
          style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); padding: 15px"
        >
          <el-form
            label-position="left"
            :inline="true"
            :model="form"
            class="demo-form-inline"
            style="text-align: left"
          >
            <el-form-item label="用户" :inline="true">
              <el-select
                v-model="incomeUser.userId"
                placeholder="请选择活动区域"
                @change="incomeUserChange"
              >
                <el-option
                  v-for="item in incomeUser.userList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div
            id="incomeUser"
            :style="{ width: '100%', height: '400px' }"
          ></div>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-form
        label-position="left"
        :inline="true"
        :model="form"
        class="demo-form-inline"
        style="text-align: left"
      >
        <el-form-item label="日期">
          <div class="block">
            <el-date-picker
              type="month"
              v-model="incomeUserDay.month"
              placeholder="选择日期"
              format="yyyy-MM"
              @change="incomeUserDayMonthChange"
            ></el-date-picker>
          </div>
        </el-form-item>
      </el-form>

      <div
        class="total-class"
        id="myChart"
        :style="{ width: '100%', height: '400px' }"
      ></div>
    </el-card>

    <div style="margin-bottom: 30px">REPORT</div>
  </div>
</template>
<script>
import util from "../../util/dateutil";
export default {
  data() {
    return {
      form: {
        month: "",
        groupId: null,
      },
      groupList: [],
      group: {
        groupIncomeAllUser: null,
        groupIncomeAllUserData: [],
      },
      incomeUser: {
        incomeUser: null,
        incomeUserData: [],
        userList: [],
        userId: null,
        everyMonthValue: {
          Jan: null,
          Feb: null,
          Mar: null,
          Apr: null,
          May: null,
          Jun: null,
          Jul: null,
          Aug: null,
          Sep: null,
          Oct: null,
          Nov: null,
          Dec: null,
        },
      },
      incomeUserDay: {
        incomeUserDayData: [],
        month: "",
        everyDayValue: {
          one: null,
          two: null,
          three: null,
          four: null,
          five: null,
          six: null,
          seven: null,
          eight: null,
          nine: null,
          ten: null,
          eleven: null,
          twelve: null,
          thirteen: null,
          fourteen: null,
          fifteen: null,
          sixteen: null,
          seventeen: null,
          eighteen: null,
          nineteen: null,
          twenty: null,
          twentyone: null,
          twentytwo: null,
          twentythree: null,
          twentyfour: null,
          twentyfive: null,
          twentysix: null,
          twentyseven: null,
          twentyeight: null,
          twentynine: null,
          thirty: null,
          thirtyone: null,
        },
      },
      server: {
        warningStatusServerList: [],
      },
      card: {
        usefulCardList: [],
      },
    };
  },
  created() {
    this.initGroupIncomeAllUserMonth();
    this.initIncomeUserDayMonth();
  },
  mounted() {
    this.initWarningStatusServerList();
    this.initUsefulCardList();

    this.initGroupList();
    this.initUserList();
    this.initIncomeUserDayData();
  },
  methods: {
    groupIncomeAllUserMonthChange(val) {
      this.form.month = util.dateFormatYM(val);
      this.initGroupIncomeAllUserData();
    },

    groupIncomeAllUserGroupChange() {
      this.initGroupIncomeAllUserData();
    },
    incomeUserChange(val) {
      this.incomeUser.userId = val;
      this.initIncomeUserData();
    },
    incomeUserDayMonthChange(){
      this.initIncomeUserDayData();
    },
    initGroupIncomeAllUserMonth() {
      this.form.month = util.dateFormatYM(new Date());
    },
    initIncomeUserDayMonth() {
      this.incomeUserDay.month = util.dateFormatYM(new Date());
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
        this.form.groupId = this.groupList[0].id;

        this.initGroupIncomeAllUserData();
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
        this.incomeUser.userList = res.data.data.userList;
        this.incomeUser.userId = this.incomeUser.userList[0].id;

        this.initIncomeUserData();
      });
    },
    initGroupIncomeAllUserData: async function () {
      await this.axios({
        method: "post",
        url: "/myoa/smbus/report/selectIncomeMonthReport",
        async: false,
        data: {
          data: {
            orgId: this.form.groupId,
            date: this.form.month,
          },
        },
      }).then((res) => {
        this.group.groupIncomeAllUserData = res.data.data.incomeMRList;
        this.drawGroupIncomeAllUser();
      });
    },
    initIncomeUserData: async function () {
      await this.axios({
        method: "post",
        url: "/myoa/smbus/report/selectIncomeMonthUser",
        async: false,
        data: {
          data: {
            userId: this.incomeUser.userId,
            year: util.dateFormatY(new Date()) + "",
          },
        },
      }).then((res) => {
        this.incomeUser.incomeUserData = res.data.data.incomeList;
        this.drawIncomeUser();
      });
    },
    initIncomeUserDayData() {
      this.incomeUserDay.month = util.dateFormatYM(this.incomeUserDay.month);
      this.axios({
        method: "post",
        url: "/myoa/smbus/report/selectIncomeDayUser",
        async: false,
        data: {
          data: {
            month: this.incomeUserDay.month,
          },
        },
      }).then((res) => {
        this.incomeUserDay.incomeUserDayData = res.data.data.incomeList;
        this.drawLine();
      });
    },
    initWarningStatusServerList() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/server/selectWarningStatusServerList",
        data: {
          data: {},
        },
      }).then((res) => {
        this.server.warningStatusServerList = res.data.data.serverList;
      });
    },
    initUsefulCardList() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/card/selectCardUser",
        data: {
          data: {},
        },
      }).then((res) => {
        this.card.usefulCardList = res.data.data.cardList;
      });
    },
    dealWarningStatusServer(id, name, priip) {
      //普通调用方式
      this.$confirm(
        "已经处理" + name + " " + priip + "服务器, 是否确定?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.axios({
            method: "post",
            url: "/myoa/smbus/server/dealWarningStatusServer",
            data: {
              data: {
                id: id,
              },
            },
          }).then((res) => {
            if (res.status == 200) {
              this.$message("删除成功！");
            }
            this.initWarningStatusServerList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    drawGroupIncomeAllUser() {
      this.groupIncomeAllUser = this.$echarts.init(
        document.getElementById("groupIncomeAllUser")
      );
      var userNameList = [];
      var userAmountAllList = [];
      var amountAll = 0;
      this.group.groupIncomeAllUserData.forEach((element) => {
        userNameList.push(element.smbusUser.name);
        userAmountAllList.push({
          value: element.amountAll,
          name: element.smbusUser.name,
        });
        amountAll += element.amountAll;
      });

      this.groupIncomeAllUser.setOption({
        title: {
          text: "项目组整体收入情况",
          subtext: "总收入：" + amountAll,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: userNameList,
        },
        series: [
          {
            name: "个人情况",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: userAmountAllList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    drawIncomeUser() {
      this.incomeUser.everyMonthValue.Jan = null;
      this.incomeUser.everyMonthValue.Feb = null;
      this.incomeUser.everyMonthValue.Mar = null;
      this.incomeUser.everyMonthValue.Apr = null;
      this.incomeUser.everyMonthValue.May = null;
      this.incomeUser.everyMonthValue.Jun = null;
      this.incomeUser.everyMonthValue.Jul = null;
      this.incomeUser.everyMonthValue.Aug = null;
      this.incomeUser.everyMonthValue.Sep = null;
      this.incomeUser.everyMonthValue.Oct = null;
      this.incomeUser.everyMonthValue.Nov = null;
      this.incomeUser.everyMonthValue.Dec = null;

      this.incomeUser.incomeUserData.forEach((item) => {
        if (util.dateFormatMM(item.date) == 1) {
          this.incomeUser.everyMonthValue.Jan = item.amountAll;
        }
        if (util.dateFormatMM(item.date) == 2) {
          this.incomeUser.everyMonthValue.Feb = item.amountAll;
        }
        if (util.dateFormatMM(item.date) == 3) {
          this.incomeUser.everyMonthValue.Mar = item.amountAll;
        }
        if (util.dateFormatMM(item.date) == 4) {
          this.incomeUser.everyMonthValue.Apr = item.amountAll;
        }
        if (util.dateFormatMM(item.date) == 5) {
          this.incomeUser.everyMonthValue.May = item.amountAll;
        }
        if (util.dateFormatMM(item.date) == 6) {
          this.incomeUser.everyMonthValue.Jun = item.amountAll;
        }
        if (util.dateFormatMM(item.date) == 7) {
          this.incomeUser.everyMonthValue.Jul = item.amountAll;
        }
        if (util.dateFormatMM(item.date) == 8) {
          this.incomeUser.everyMonthValue.Aug = item.amountAll;
        }
        if (util.dateFormatMM(item.date) == 9) {
          this.incomeUser.everyMonthValue.Sep = item.amountAll;
        }
        if (util.dateFormatMM(item.date) == 10) {
          this.incomeUser.everyMonthValue.Oct = item.amountAll;
        }
        if (util.dateFormatMM(item.date) == 11) {
          this.incomeUser.everyMonthValue.Nov = item.amountAll;
        }
        if (util.dateFormatMM(item.date) == 12) {
          this.incomeUser.everyMonthValue.Dec = item.amountAll;
        }
      });

      this.incomeUser.incomeUser = this.$echarts.init(
        document.getElementById("incomeUser")
      );

      this.incomeUser.incomeUser.setOption({
        title: {
          text: "个人月份收入折线图（￥/月）",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{c}￥",
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            smooth: true,
            symbolSize: 15, //设定实心点的大小
            data: [
              this.incomeUser.everyMonthValue.Jan,
              this.incomeUser.everyMonthValue.Feb,
              this.incomeUser.everyMonthValue.Mar,
              this.incomeUser.everyMonthValue.Apr,
              this.incomeUser.everyMonthValue.May,
              this.incomeUser.everyMonthValue.Jun,
              this.incomeUser.everyMonthValue.Jul,
              this.incomeUser.everyMonthValue.Aug,
              this.incomeUser.everyMonthValue.Sep,
              this.incomeUser.everyMonthValue.Oct,
              this.incomeUser.everyMonthValue.Nov,
              this.incomeUser.everyMonthValue.Dec,
            ],
          },
        ],
      });
    },
    drawLine() {
      this.incomeUserDay.everyDayValue.one = null;
      this.incomeUserDay.everyDayValue.two = null;
      this.incomeUserDay.everyDayValue.three = null;
      this.incomeUserDay.everyDayValue.four = null;
      this.incomeUserDay.everyDayValue.five = null;
      this.incomeUserDay.everyDayValue.six = null;
      this.incomeUserDay.everyDayValue.seven = null;
      this.incomeUserDay.everyDayValue.eight = null;
      this.incomeUserDay.everyDayValue.nine = null;
      this.incomeUserDay.everyDayValue.ten = null;
      this.incomeUserDay.everyDayValue.eleven = null;
      this.incomeUserDay.everyDayValue.twelve = null;
      this.incomeUserDay.everyDayValue.thirteen = null;
      this.incomeUserDay.everyDayValue.fourteen = null;
      this.incomeUserDay.everyDayValue.fifteen = null;
      this.incomeUserDay.everyDayValue.sixteen = null;
      this.incomeUserDay.everyDayValue.seventeen = null;
      this.incomeUserDay.everyDayValue.eighteen = null;
      this.incomeUserDay.everyDayValue.nineteen = null;
      this.incomeUserDay.everyDayValue.twenty = null;
      this.incomeUserDay.everyDayValue.twentyone = null;
      this.incomeUserDay.everyDayValue.twentytwo = null;
      this.incomeUserDay.everyDayValue.twentythree = null;
      this.incomeUserDay.everyDayValue.twentyfour = null;
      this.incomeUserDay.everyDayValue.twentyfive = null;
      this.incomeUserDay.everyDayValue.twentysix = null;
      this.incomeUserDay.everyDayValue.twentyseven = null;
      this.incomeUserDay.everyDayValue.twentyeight = null;
      this.incomeUserDay.everyDayValue.twentynine = null;
      this.incomeUserDay.everyDayValue.thirty = null;
      this.incomeUserDay.everyDayValue.thirtyone = null;

      this.incomeUserDay.incomeUserDayData.forEach((item) => {
        if (util.dateFormatDD(item.date) == 1) {
          this.incomeUserDay.everyDayValue.one = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 2) {
          this.incomeUserDay.everyDayValue.two = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 3) {
          this.incomeUserDay.everyDayValue.three = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 4) {
          this.incomeUserDay.everyDayValue.four = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 5) {
          this.incomeUserDay.everyDayValue.five = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 6) {
          this.incomeUserDay.everyDayValue.six = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 7) {
          this.incomeUserDay.everyDayValue.seven = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 8) {
          this.incomeUserDay.everyDayValue.eight = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 9) {
          this.incomeUserDay.everyDayValue.nine = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 10) {
          this.incomeUserDay.everyDayValue.ten = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 11) {
          this.incomeUserDay.everyDayValue.eleven = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 12) {
          this.incomeUserDay.everyDayValue.twelve = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 13) {
          this.incomeUserDay.everyDayValue.thirteen = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 14) {
          this.incomeUserDay.everyDayValue.fourteen = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 15) {
          this.incomeUserDay.everyDayValue.fifteen = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 16) {
          this.incomeUserDay.everyDayValue.sixteen = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 17) {
          this.incomeUserDay.everyDayValue.seventeen = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 18) {
          this.incomeUserDay.everyDayValue.eighteen = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 19) {
          this.incomeUserDay.everyDayValue.nineteen = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 20) {
          this.incomeUserDay.everyDayValue.twenty = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 21) {
          this.incomeUserDay.everyDayValue.twentyone = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 22) {
          this.incomeUserDay.everyDayValue.twentytwo = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 23) {
          this.incomeUserDay.everyDayValue.twentythree = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 24) {
          this.incomeUserDay.everyDayValue.twentyfour = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 25) {
          this.incomeUserDay.everyDayValue.twentyfive = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 26) {
          this.incomeUserDay.everyDayValue.twentysix = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 27) {
          this.incomeUserDay.everyDayValue.twentyseven = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 28) {
          this.incomeUserDay.everyDayValue.twentyeight = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 29) {
          this.incomeUserDay.everyDayValue.twentynine = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 30) {
          this.incomeUserDay.everyDayValue.thirty = item.amountAll;
        }
        if (util.dateFormatDD(item.date) == 31) {
          this.incomeUserDay.everyDayValue.thirtyone = item.amountAll;
        }
      });

      console.log(this.incomeUserDay.everyDayValue);

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "个人每日收入条形图（￥/日）",
          left: "center",
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "金额",
            type: "bar",
            barWidth: "50%",
            data: [
              this.incomeUserDay.everyDayValue.one,
              this.incomeUserDay.everyDayValue.two,
              this.incomeUserDay.everyDayValue.three,
              this.incomeUserDay.everyDayValue.four,
              this.incomeUserDay.everyDayValue.five,
              this.incomeUserDay.everyDayValue.six,
              this.incomeUserDay.everyDayValue.seven,
              this.incomeUserDay.everyDayValue.eight,
              this.incomeUserDay.everyDayValue.nine,
              this.incomeUserDay.everyDayValue.ten,
              this.incomeUserDay.everyDayValue.eleven,
              this.incomeUserDay.everyDayValue.twelve,
              this.incomeUserDay.everyDayValue.thirteen,
              this.incomeUserDay.everyDayValue.fourteen,
              this.incomeUserDay.everyDayValue.fifteen,
              this.incomeUserDay.everyDayValue.sixteen,
              this.incomeUserDay.everyDayValue.seventeen,
              this.incomeUserDay.everyDayValue.eighteen,
              this.incomeUserDay.everyDayValue.nineteen,
              this.incomeUserDay.everyDayValue.twenty,
              this.incomeUserDay.everyDayValue.twentyone,
              this.incomeUserDay.everyDayValue.twentytwo,
              this.incomeUserDay.everyDayValue.twentythree,
              this.incomeUserDay.everyDayValue.twentyfour,
              this.incomeUserDay.everyDayValue.twentyfive,
              this.incomeUserDay.everyDayValue.twentysix,
              this.incomeUserDay.everyDayValue.twentyseven,
              this.incomeUserDay.everyDayValue.twentyeight,
              this.incomeUserDay.everyDayValue.twentynine,
              this.incomeUserDay.everyDayValue.thirty,
              this.incomeUserDay.everyDayValue.thirtyone,
            ],
          },
        ],
      });
    },
  },
  filters: {
    heartbytesStatusZD(val) {
      if (val == 1) {
        return "正常";
      } else if (val == 0) {
        return "已宕机";
      } else {
        return "高延迟";
      }
    },
  },
};
</script>
<style scoped>
.el-card__body {
  padding: 10px;
}
</style>