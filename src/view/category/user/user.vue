<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form
            label-position="left"
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            style="text-align: right;"
          >
            <el-form-item label="姓名">
              <el-input v-model="formInline.user" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="机构">
              <el-select v-model="formInline.region" placeholder="机构">
                <el-option label="机构一" value="shanghai"></el-option>
                <el-option label="机构二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" icon="el-icon-plus" @click="userEdit(null)">添加</el-button>
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
            @click="userEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button
            @click="userDelete(scope.$index, scope.row)"
            icon="el-icon-circle-close"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="序号" width="90"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色" width="180"></el-table-column>
      <el-table-column prop="smbusJob.name" label="职务" width="180"></el-table-column>
      <el-table-column prop="orgName" label="机构" width="180"></el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="sexFormat"></el-table-column>
      <el-table-column prop="entryTime" label="日期" width="180" :formatter="dateFormat"></el-table-column>
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
export default {
  components: {
    addOrUpdate: addOrUpdate,
  },
  data() {
    return {
      tableData: [],
      formInline: {
        user: "",
        region: "",
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
    this.initUserData();
  },
  methods: {
    initUserData: function () {
      this.axios({
        method: "post",
        url: "/myoa/smbus/user/selectUserListAll",
        data: {
          data: {
            name: this.formInline.user,
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
      this.initUserData();
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.initUserData();
      console.log(this.currentPage); //点击第几页
    },
    dateFormat: function (row, column) {
      var date2 = row[column.property];
      if (date2 === undefined) {
        return "";
      }

      let date = new Date(date2);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
    sexFormat: function (row, column) {
      var date2 = row[column.property];
      if (date2 === undefined) {
        return "男";
      } else if (date2 == "1") {
        return "男";
      } else if (date2 == "2") {
        return "女";
      } else if (date2 == "") {
        return "男";
      } else if (date2 == null) {
        return "男";
      }
    },
    userDelete: function (index, row) {
      //普通调用方式
      this.$confirm("将删除" + row.name + "用户, 是否确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("点击了确认");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    userEdit: function (index, row) {
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
      this.initUserData();
    },
  },
};
</script>
