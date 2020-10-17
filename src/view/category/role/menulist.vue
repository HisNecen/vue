<template>
  <div id="menuList">
    <el-dialog
      :title="roleModel.name+' '+roleModel.levelDic"
      class="menuList"
      :close-on-click-modal="false"
      :visible.sync="addMenuProp"
      width="30%"
    >
      <div class="grid-content bg-purple">
        <el-form label-width="80px">
          <el-form-item label="应用名称">
            <el-select
              v-model="appModel.id"
              placeholder="请选择"
              style="width: 100%"
              v-on:change="changeSelectApp"
            >
              <el-option
                v-for="item in appList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单列表">
            <el-tree
              :data="menuList"
              :props="defaultProps"
              node-key="id"
              default-expand-all
              show-checkbox
              @check-change="handleCheckChange"
            >
            </el-tree>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Role from "./role";
export default {
  data() {
    return {
      addMenuProp: false,
      roleModel:{
          id:"",
          name:"",
          levelId:"",
          levelDic:""
      }, 
      appList: [],
      appModel: {
        id: "",
        name: "",
      },
      menuList: [],
      menuModel: {
        id: "",
        name: "",
        level: "",
        parentId: "",
        status: "",
        url: "",
        appId: "",
      },
      defaultProps: {
        children: "childrenList",
        label: function (data, node) {
          return data.name + " " + data.code + " " + data.dic.name;
        },
      },
    };
  },
  created: function () {
    this.initAppList();
  },
  methods: {
    init(roleId) {
      this.addMenuProp = true;
      this.axios({
        method: "post",
        url: "/myoa/smbus/role/selectRole",
        data: {
            data:{
                id:roleId
            }
        },
      }).then((res) => {
        this.roleModel.name = res.data.data.name;
        this.roleModel.id = res.data.data.id;
        this.roleModel.levelId = res.data.data.levelId;
        this.roleModel.levelDic = res.data.data.levelDic.name;
      });
    },
    initAppList: async function () {
      await this.axios({
        method: "post",
        url: "/myoa/smbus/app/selectAppAll",
        async: false,
        data: {},
      }).then((res) => {
        this.appList = res.data.data.appList;
        this.appModel.id = this.appList[0].id;
        this.initMenuList(this.appList[0].id);
      });
    },
    changeSelectApp: function () {
      this.initMenuList(this.appModel.id);
    },
    initMenuList: async function (appId) {
      await this.axios({
        method: "post",
        url: "/myoa/smbus/menu/selectMenuListByAppId",
        async: false,
        data: {
          data: {
            appId: appId,
            parentId: -1,
          },
        },
      }).then((res) => {
        this.menuList = res.data.data.menuList;
      });
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
  },
};
</script>