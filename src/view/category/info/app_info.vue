<template>
  <div class="app_info">
    <el-rate
      v-model="value"
      disabled
      show-score
      text-color="#ff9900"
      score-template="{value}"
    >
    </el-rate>
  </div>
</template>
<script>
export default {};
</script>