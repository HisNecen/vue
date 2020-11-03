<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form
            label-position="right"
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            style="text-align: right"
          >
            <el-form-item label="名称">
              <el-input v-model="formInline.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="主IP">
              <el-input
                v-model="formInline.priip"
                placeholder="主IP"
              ></el-input>
            </el-form-item>
            <el-form-item label="IP段">
              <el-input
                v-model="formInline.iprange"
                placeholder="IP段"
              ></el-input>
            </el-form-item>

            <el-form-item label="La51">
              <el-input v-model="formInline.la51" placeholder="La51"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit"
                >查询</el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button
                type="info"
                icon="el-icon-plus"
                @click="serverEdit(null)"
                >添加</el-button
              >
            </el-form-item>

            <el-form-item label="用户" :inline="true">
              <el-select
                v-model="formInline.userId"
                placeholder="请选择活动区域"
              >
                <el-option value="" label="全部">全部</el-option>
                <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="程序类型" :inline="true">
              <el-select
                v-model="formInline.procedureId"
                placeholder="请选择活动区域"
              >
                <el-option value="" label="全部">全部</el-option>
                <el-option
                  v-for="item in procedureList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="供应商" :inline="true">
              <el-select
                v-model="formInline.supplireId"
                placeholder="请选择活动区域"
              >
                <el-option value="" label="全部">全部</el-option>
                <el-option
                  v-for="item in supplireList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="到期日">
              <div class="block">
                <el-date-picker
                  type="date"
                  v-model="formInline.expireTimeStart"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                ></el-date-picker>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      :stripe="true"
      :row-style="{ height: '38px' }"
      :cell-style="{ padding: '0px' }"
      style="width: 100%; font-size: 13px"
    >
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button
            @click="initServerInfo(scope.$index, scope.row)"
            icon="el-icon-discount"
            type="text"
            size="mini"
          ></el-button>

          <el-button
            @click="serverEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
            type="text"
            size="mini"
          ></el-button>
          <el-button
            @click="serverDelete(scope.$index, scope.row)"
            icon="el-icon-circle-close"
            type="text"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="120"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="expireTime"
        label="到期日"
        width="95"
      ></el-table-column>
      <el-table-column prop="priip" label="主IP" width="130"></el-table-column>

      <el-table-column prop="port" label="端口" width="60"></el-table-column>

      <el-table-column prop="iprange" label="IP段" width="150">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title="IP段"
            trigger="hover"
            width="150"
            v-if="scope.row.iprange != null"
            :content="scope.row.iprange"
          >
            <span slot="reference">{{ scope.row.iprange.substr(0, 16) }}</span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="price" label="价格" width="90"></el-table-column>
      <el-table-column
        prop="supplire.name"
        label="供应商"
        width="90"
      ></el-table-column>
      <el-table-column
        prop="procedureDic.name"
        label="程序类型"
        width=""
      ></el-table-column>
      <el-table-column prop="smbusUser.name" label="用户"></el-table-column>
    </el-table>
    <!-- page -->
    <div align="center">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager,next, total, sizes"
        :total="totalCount"
      ></el-pagination>
    </div>
    <!-- addOrUpdate -->
    <add-or-update v-if="editProp" ref="addOrUpdate"></add-or-update>
    <!-- addOrUpdate -->
    <edit v-if="editEditProp" ref="edit"></edit>
    <!-- info -->
    <el-drawer title="服务器信息" :visible.sync="drawer" :with-header="false">
      <el-card>
        <el-tag type="warning" effect="dark">系统信息</el-tag>
        <table>
          <tbody class="tbody-serverinfo">
            <tr>
              <td>名称</td>
              <td>{{ serverInfo.name }}</td>
            </tr>
            <tr>
              <td>LA51</td>
              <td>{{ serverInfo.la51 }}</td>
            </tr>
            <tr>
              <td>程序类型</td>
              <td v-if="serverInfo.procedureDic != null">
                {{ serverInfo.procedureDic.name }}
              </td>
            </tr>
            <tr>
              <td>用户</td>
              <td v-if="serverInfo.smbusUser != null">
                {{ serverInfo.smbusUser.name }}
              </td>
            </tr>
            <tr>
              <td>流量权重</td>
              <td>{{ serverInfo.flowwight }}</td>
            </tr>

            <tr>
              <td>状态</td>
              <td v-if="serverInfo.statusDic != null">
                {{ serverInfo.statusDic.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </el-card>
      <el-card>
        <el-tag type="info" effect="dark">服务器信息</el-tag>
        <table>
          <tbody class="tbody-serverinfo">
            <tr>
              <td>供应商</td>
              <td v-if="serverInfo.supplire != null">
                {{ serverInfo.supplire.name }}
              </td>
            </tr>
            <tr>
              <td>价格</td>
              <td>{{ serverInfo.price }}</td>
            </tr>
            <tr>
              <td>付费方式</td>
              <td v-if="serverInfo.feeTypeDic != null">
                {{ serverInfo.feeTypeDic.name }}
              </td>
            </tr>
            <tr>
              <td>主IP</td>
              <td>{{ serverInfo.priip }}</td>
            </tr>
            <tr>
              <td>IP段</td>
              <td>{{ serverInfo.iprange }}</td>
            </tr>
            <tr>
              <td>端口</td>
              <td>{{ serverInfo.port }}</td>
            </tr>
            <tr>
              <td>登录名</td>
              <td>{{ serverInfo.loginName }}</td>
            </tr>
            <tr>
              <td>登录密码</td>
              <td>{{ serverInfo.loginPassword }}</td>
            </tr>

            <tr>
              <td>到期日</td>
              <td>{{ serverInfo.expireTime }}</td>
            </tr>
            <tr>
              <td>续费日期</td>
              <td>{{ serverInfo.renewalTime }}</td>
            </tr>
          </tbody>
        </table>
      </el-card>
      <el-card>
        <el-tag type="success" effect="dark">维护信息</el-tag>
        <table>
          <tbody class="tbody-serverinfo">
            <tr>
              <td>是否转移</td>
              <td>{{ serverInfo.transferStatus | transferStatusZD }}</td>
            </tr>
            <tr>
              <td>转移至</td>
              <td v-if="serverInfo.transferServer != null">
                {{ serverInfo.transferServer.name }}
              </td>
            </tr>
            <tr>
              <td>描述</td>
              <td>{{ serverInfo.des }}</td>
            </tr>
          </tbody>
        </table>
      </el-card>
      <el-card>
        <el-tag type="danger" effect="dark">
        检测信息
        </el-tag>
        <table>
          <tbody class="tbody-serverinfo">
            <tr>
              <td>心跳开关</td>
              <td>{{ serverInfo.heartbytes | heartbytesZD }}</td>
            </tr>
            <tr>
              <td>心跳地址</td>
              <td>{{ serverInfo.heartbytesUrl }}</td>
            </tr>
            <tr>
              <td>上一次心跳时间</td>
              <td>{{ serverInfo.heartbytesTime }}</td>
            </tr>
            <tr>
              <td>心跳状态</td>
              <td>{{ serverInfo.heartbytesStatus | heartbytesStatusZD }}</td>
            </tr>
          </tbody>
        </table>
      </el-card>
    </el-drawer>
  </div>
</template>

<script>
import addOrUpdate from "./add";
import edit from "./edit";
import util from "../../util/dateutil";
export default {
  components: {
    addOrUpdate: addOrUpdate,
    edit: edit,
  },
  data() {
    return {
      tableData: [],
      formInline: {
        name: "",
        priip: "",
        iprange: "",
        la51: "",
        supplireId: null,
        procedureId: null,
        userId: null,
        expireTimeStart: "",
      },
      serverInfo: {
        id: null,
        name: "",
        la51: "",
        priip: "",
        iprange: "",
        port: "",
        loginName: "",
        loginPassword: "",
        supplierId: "",
        supplire: {
          id: null,
          name: "",
        },
        flowwight: null,
        procedureId: null,
        procedureDic: {
          id: null,
          name: "",
        },
        userId: null,
        smbusUser: {
          id: null,
          name: "",
        },
        addTime: "",
        addUser: "",
        updatedTime: "",
        updatedUser: "",
        transferServerId: "",
        transferServer: {
          id: null,
          name: "",
        },
        transferStatus: "",
        price: null,
        heartbytesStatus: "",
        heartbytesTime: "",
        heartbytesUrl: "",
        heartbytes: "",
        feeType: null,
        feeTypeDic: {
          id: null,
          name: "",
        },
        expireTime: "",
        renewalTime: "",
        status: "",
        statusDic: {
          id: null,
          name: "",
        },
        des: "",
      },
      procedureList: [],
      userList: [],
      supplireList: [],
      //默认每页数据量
      editProp: false,
      editEditProp: false,
      drawer: false,
      pageSize: 10,
      //当前页码
      currentPage: 1,
      //默认数据总数
      totalCount: 1000,
    };
  },
  created: function () {
    this.initServerData();
    this.initProcedureList("8");
    this.initSupplireList();
    this.initUserList();
  },
  methods: {
    initServerData: function () {
      if (this.formInline.procedureId == "") {
        this.formInline.procedureId = null;
      }
      if (this.formInline.userId == "") {
        this.formInline.userId = null;
      }
      if (this.formInline.supplireId == "") {
        this.formInline.supplireId = null;
      }

      this.axios({
        method: "post",
        url: "/myoa/smbus/server/selectServerPage",
        data: {
          data: this.formInline,
          page: {
            page: this.currentPage,
            size: this.pageSize,
          },
        },
      }).then((res) => {
        this.tableData = res.data.data.list;
        this.totalCount = res.data.data.total;
      });
    }, // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pageSize = size;
      this.initServerData();
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.initServerData();
    },
    dateFormat: function (row, column) {
      return util.dateFormatYMDHMS(row[column.property]);
    },
    initProcedureList(dicType) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        data: {
          data: {
            type: dicType,
          },
        },
      }).then((res) => {
        this.procedureList = res.data.data.dicList;
      });
    },
    initSupplireList() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/supplire/selectSupplireAll",
        data: {
          data: {},
        },
      }).then((res) => {
        this.supplireList = res.data.data.supplireList;
      });
    },
    initUserList() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/user/selectUserAll",
        data: {
          data: {},
        },
      }).then((res) => {
        this.userList = res.data.data.userList;
      });
    },
    initServerInfo(index, row) {
      this.drawer = true;
      this.axios({
        method: "post",
        url: "/myoa/smbus/server/selectServer",
        data: {
          data: {
            id: row.id,
          },
        },
      }).then((res) => {
        this.serverInfo = res.data.data;
      });
    },

    serverDelete: function (index, row) {
      //普通调用方式
      this.$confirm(
        "将删除" + row.name + " " + row.priip + "服务器, 是否确定?",
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
            url: "/myoa/smbus/server/deleteServer",
            data: {
              data: {
                id: row.id,
              },
            },
          }).then((res) => {
            if (res.status == 200) {
              this.$message("删除成功！");
            }
            this.initServerData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    serverEdit: function (index, row) {
      if (row != null) {
        this.editEditProp = true;
        this.$nextTick(() => {
          this.$refs.edit.init(row.id);
        });
      } else {
        this.editProp = true;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(null);
        });
      }
    },
    onSubmit() {
      this.initServerData();
    },
  },
  filters: {
    transferStatusZD(val) {
      if (val == 0) {
        return "当前";
      } else {
        return "已转移";
      }
    },
    heartbytesZD(val) {
      if (val == 0) {
        return "关";
      } else {
        return "开";
      }
    },
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
<style>
.tbody-serverinfo tr td {
  border: 2px solid #c9e3ff;
  padding: 3px;
  width: 250px;
}
.el-drawer__body {
  overflow: auto;
}
/*2.隐藏滚动条，太丑了*/
.el-drawer__container ::-webkit-scrollbar {
  display: none;
}
</style>
