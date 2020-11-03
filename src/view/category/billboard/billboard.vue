<template>
  <div>
    <el-card class="serverboard">
      <el-tag effect="dark">服务器监控面板</el-tag>
      <el-alert 
        v-for="item in server.warningStatusServerList" 
        :key="item.id" 
        type="error" 
        style="margin-top:5px;"
        @close="dealWarningStatusServer(item.id,item.name,item.priip)"
        >
        服务器 {{item.name}} 其主IP：{{item.priip}}:{{item.port}} 的心跳地址:
        <el-link type="success" :href="item.heartbytesUrl" target="_blank">{{item.heartbytesUrl}}</el-link> 
        于
        {{item.heartbytesTime}}
        时间点心跳时，判断为 【 
        <span style="font-weight:bold;font-size:13px;color:red;">{{item.heartbytesStatus | heartbytesStatusZD}}</span>
        】，请及时处理！
      </el-alert>
    </el-card>
    <el-card class="cardboard">
      <el-tag effect="dark">银行卡公示面板</el-tag>
      <el-row style="margin-top:5px;font-size:11px;">
        <el-card 
          v-for="item in card.usefulCardList" 
          :key="item.id" 
          style="width:31%;float:left;margin-left:0.5%;background-color:#fdffe9;border-left:5px solid #4cbd5d;"
        >
          <el-tag>姓名</el-tag> : {{item.name}}<br/>
          <el-tag>卡号</el-tag>：{{item.cardNumber}}<br/>
          <el-tag>银行</el-tag>：{{item.bankName}}
        </el-card>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="12">
          <div
            id="groupIncomeAllUser"
            :style="{ width: '100%', height: '400px' }"
          ></div>
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
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <div
      class="total-class"
      id="myChart"
      :style="{ width: '100%', height: '400px' }"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        month: null,
      },
      group: {
        groupIncomeAllUser: null,
        groupIncomeAllUserData: [],
      },
      server: {
        warningStatusServerList: [],
      },
      card: {
        usefulCardList: []
      }
    };
  },
  mounted() {
    this.drawLine();
    this.initGroupIncomeAllUserData();
    this.initWarningStatusServerList();
    this.initUsefulCardList();
  },
  methods: {
    initGroupIncomeAllUserData() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/report/selectIncomeMonthReport",
        data: {
          data: {
            orgId: 1,
            date: "2020-10",
          },
        },
      }).then((res) => {
        this.group.groupIncomeAllUserData = res.data.data.incomeMRList;
        this.drawGroupIncomeAllUser();
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
    initUsefulCardList(){
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
    dealWarningStatusServer(id,name,priip){
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

      console.log(userAmountAllList);
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
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
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
            data: ["Mon", "Tue", "Wed", "Thur", "Fir", "Sat", "Sun"],
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
            name: "测试",
            type: "bar",
            barWidth: "50%",
            data: [15, 35, 45, 68, 70, 50, 60],
          },
        ],
      });
    },
  },
  filters:{
    heartbytesStatusZD(val){
      if (val == 1) {
        return "正常";
      } else if (val == 0) {
        return "已宕机";
      } else {
        return "高延迟";
      }
    },
  }
};
</script>
<style scoped>
.el-card__body {
    padding: 10px;
}
</style>