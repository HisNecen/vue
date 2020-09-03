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
          >
            <el-form-item label="名称">
              <el-input v-model="formInline.roleName" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="级别">
              <el-select v-model="formInline.region" placeholder="级别">
                <el-option label="机构一" value="shanghai"></el-option>
                <el-option label="机构二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
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
      <el-table-column prop="id" label="序号" width="90"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="level" label="级别" width="180"></el-table-column>
      <el-table-column prop="entryTime" label="日期" width="180" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="roleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button
            @click="roleDelete(scope.$index, scope.row)"
            icon="el-icon-circle-close"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      formInline: {
        roleName: ""
      }, //默认每页数据量
      pageSize: 10,
      //当前页码
      currentPage: 1,
      //默认数据总数
      totalCount: 1000,
    };
  },
  filters: {
    formatdate: function (value) {
      return value + "000";
    },
  },
  methods: {
    showor: function () {
      if (this.show == true) {
        this.show = false;
        this.switch2 = "显示";
      } else {
        this.show = true;
        this.switch2 = "隐藏";
      }
    },
    initDataTable:function(){

    },
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
    roleEdit:function(index,row){

    },
    roleDelete:function(index,row){

    },
    dateFormat:function(row,column){
      return this.myutil.dateFormatYMDHMS(row[column.property]);
    },
    onSubmit:function(){

    }
  },
};
</script>