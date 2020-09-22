<template>
    <div class="footer">
        <el-alert
            title="不可关闭的 alert"
            type="info"
            :closable="false" style="width:100%" show-icon>
        </el-alert>
    </div>
</template>
<style scoped>
    .footer {
        position: fixed;
        bottom: 0px;
        width: 100%;
    }
</style>