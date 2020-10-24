<template>
  <el-dialog
    title="分享银行卡"
    class="cardShare"
    :close-on-click-modal="false"
    :visible.sync="cardShare"
  >
    <el-form ref="form" :model="form" label-width="100px">
      <el-table
        ref="multipleTable"
        :data="groupList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="项目组" width="120">
        </el-table-column>
        <el-table-column prop="code" label="编码" width="120">
        </el-table-column>
        <el-table-column prop="addTime" label="添加时间" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">分享</el-button>
        <el-button @click="cancelButton()">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      form: {
        id: "",
        name: "",
        cardNumber: "",
        bankName: "",
      },
      groupList:[],
      cardShare: false,
    };
  },
  created() {
      this.initGroupList();
  },
  methods: {
    initCardData(id) {
      this.cardShare = true;
    },
    initGroupList(){
        this.axios({
        method: "post",
        url: "/myoa/smbus/org/selectOrgAll",
        data: {
          data: {},
        },
      }).then((res) => {
        this.groupList = res.data.data.orgList;
      });
    },
    onSubmit() {},
    cancelButton() {
      this.cardShare = false;
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    }
  },
};
</script>