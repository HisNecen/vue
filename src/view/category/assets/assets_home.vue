<template>
  <div id="assets">
    <el-card v-for="item in cardList" :key="item.id" class="box-card">
      <div slot="header" class="clearfix">
        <span><el-tag type="danger">银行卡</el-tag> {{ item.name }}</span>
        <div style="float: right">
          <el-button type="success" size="mini" @click="shareCard(item.id)"><i class="el-icon-share"></i></el-button>
          <el-button type="primary" size="mini" @click="editCard(item.id)"
            ><i class="el-icon-edit"></i
          ></el-button>
          <el-button type="danger" size="mini" @click="deleteCard(item.id)">
            <i class="el-icon-delete"></i>
          </el-button>
        </div>
      </div>
      <div class="text item">
        <p><el-tag type="primary">账户卡号：</el-tag> {{ item.cardNumber }}</p>
        <p><el-tag type="primary">开户银行：</el-tag> {{ item.bankName }}</p>
        <p><el-tag type="primary">开户地址：</el-tag> {{ item.bankAddress }}</p>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><el-tag type="danger">银行卡</el-tag>添加</span>
        <div style="float: right">
          <el-button type="primary" size="mini" @click="addCard()"
            ><i class="el-icon-plus"></i
          ></el-button>
        </div>
      </div>
      <div class="text item">
        <p><el-tag type="primary">提示：</el-tag> 银行卡为重要信息</p>
        <p><el-tag type="primary">提示：</el-tag> 请保证内容的正确性</p>
        <p>
          <el-tag type="primary">提示：</el-tag> 如有问题联系管理员
        </p>
      </div>
    </el-card>
    <!-- addOrUpdate -->
    <add-or-update v-if="editProp" ref="addOrUpdate"></add-or-update>
    <card-share v-if="cardShare" ref="cardShare"></card-share>
  </div>
</template>
<script>
import addOrUpdate from "./card_edit";
import cardShare from "./card_share";
export default {
  components: {
    addOrUpdate,cardShare
  },
  data() {
    return {
      cardList: [],
      editProp: false,
      cardShare: false,
    };
  },
  created() {
    this.initCardData();
  },
  methods: {
    initCardData() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/card/selectCardAll",
        data: {
          data: {},
        },
      }).then((res) => {
        this.cardList = res.data.data.cardList;
      });
    },
    deleteCard(id) {},
    editCard(id) {
      this.editProp = true;
      this.$nextTick(() => {
          this.$refs.addOrUpdate.initData(id);
        });
    },
    addCard() {
      this.editProp = true;
      this.$nextTick(() => {
          this.$refs.addOrUpdate.initData(null);
        });
    },
    shareCard(id) {
this.cardShare = true;
      this.$nextTick(() => {
          this.$refs.cardShare.initCardData();
        });
    }
  },
};
</script>
<style>
.text {
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card__header {
  background-color: #d9ecff;
  padding: 10px 20px;
}
.el-card__body {
  padding: 10px 20px;
}
.box-card {
  margin-top: 10px;
  width: 30%;
  margin-left: 10px;
  float: left;
}
</style>