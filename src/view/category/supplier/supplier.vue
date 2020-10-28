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
            style="text-align: right;"
          >
            <el-form-item label="名称">
              <el-input v-model="formInline.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="联系账号">
              <el-input v-model="formInline.contactNum" placeholder="联系账号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" icon="el-icon-plus" @click="suplEdit(null)">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      :stripe="true"
      :row-style="{height:'20px'}"
      :cell-style="{padding:'0px'}"
      style="width: 100%"
    >
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="suplEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button
            @click="suplDelete(scope.$index, scope.row)"
            icon="el-icon-circle-close"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="序号" width="90"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="contactDic.name" label="类型" width="180"></el-table-column>
      <el-table-column prop="contactNum" label="账号" width="180"></el-table-column>
      <el-table-column prop="description" label="描述" width="280"></el-table-column>
      <el-table-column prop="addTime" label="日期" :formatter="dateFormat"></el-table-column>
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
  </div>
</template>

<script>
import addOrUpdate from "./edit";
import util from "../../util/dateutil";
export default {
  components: {
    addOrUpdate: addOrUpdate,
  },
  data() {
    return {
      tableData: [],
      formInline: {
        name: "",
        contactNum: "",
      }, //默认每页数据量
      editProp: false,
      pageSize: 10,
      //当前页码
      currentPage: 1,
      //默认数据总数
      totalCount: 1000,
    };
  },
  created: function () {
    this.initSupplierData();
  },
  methods: {
    initSupplierData: function () {
      this.axios({
        method: "post",
        url: "/myoa/smbus/supplire/selectSupplirePage",
        data: {
          data: {
            name: this.formInline.name,
            contactNum: this.formInline.contactNum,
          },
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
      this.initSupplierData();
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.initSupplierData();
    },
    dateFormat: function (row, column) {
      return util.dateFormatYMDHMS(row[column.property]);
    },
    suplDelete: function (index, row) {
      //普通调用方式
      this.$confirm("将删除" + row.name + "用户, 是否确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios({
            method: "post",
            url: "/myoa/smbus/supplire/deleteSupplire",
            data: {
              data: {
                id: row.id,
              },
            },
          }).then((res) => {
            if (res.status == 200) {
              this.$message("删除成功！");
            }
            this.initSupplierData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    suplEdit: function (index, row) {
      this.editProp = true;
      if (row != null) {
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(row.id);
        });
      } else {
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(null);
        });
      }
    },
    onSubmit() {
      this.initSupplierData();
    },
  },
};
</script>
