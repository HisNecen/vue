<template>
  <el-dialog
    title="分享银行卡"
    class="cardShare"
    :close-on-click-modal="false"
    :visible.sync="cardShare"
  >
    <el-card>
      <div slot="header" class="clearfix">
        <span style="font-weight: bold;"
          >{{ form.name }} {{ form.cardNumber }} {{ form.bankName }}</span
        >
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-table
            ref="multipleTable"
            :data="groupList"
            tooltip-effect="dark"
            style="width: 100%"
            :row-key="(row) => row.id"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="name" label="项目组" width="120">
            </el-table-column>
            <el-table-column prop="code" label="编码" width="120">
            </el-table-column>
            <el-table-column
              prop="addTime"
              label="添加时间"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
          <br />
          <el-button type="primary" @click="onSubmit()">分享</el-button>
          <el-button @click="cancelButton()">取消</el-button>
          <el-form-item> </el-form-item>
        </el-form>
      </div>
    </el-card>
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
      groupList: [],
      cardShare: false,
      multipleSelection: [],
    };
  },
  created() {
    this.initGroupList();
  },
  methods: {
    initCardData(id) {
      this.cardShare = true;
      this.axios({
        method: "post",
        url: "/myoa/smbus/card/selectCard",
        data: {
          data: { id: id },
        },
      }).then((res) => {
        this.form = res.data.data;
        this.initCardShareOrgList(this.form.id);
      });
    },
    initGroupList() {
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
    initCardShareOrgList(id) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/card/selectCardShare",
        data: {
          data: {
            cardId: id,
          },
        },
      }).then((res) => {
        this.multipleSelection = res.data.data.orgList;
        if (this.multipleSelection) {
          this.multipleSelection.forEach((row) => {
            this.groupList.forEach((group) => {
              if (row.id == group.id) {
                this.$nextTick(function () {
                  this.$refs.multipleTable.toggleRowSelection(group, true);
                });
              }
            });
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      });
    },
    onSubmit() {
      this.share();
      this.cancelButton();
    },
    share() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/card/shareCardToOrg",
        data: {
          data: {
            cardId: this.form.id,
            orgList: this.multipleSelection,
          },
        },
      }).then((res) => {
        this.$message("操作成功！");
      });
    },
    cancelButton() {
      this.cardShare = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>