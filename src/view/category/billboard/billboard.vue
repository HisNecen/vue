<template>
  <div>
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
    return {};
  },
  mounted(){
      this.drawLine()
  },
  methods: {
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
};
</script>