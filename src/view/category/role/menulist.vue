<template>
  <div id="menuList">
    <el-dialog
      :title="roleModel.name + ' ' + roleModel.levelDic"
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
              :default-checked-keys="menuListSelect"
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
import router from "../../../router";
import Role from "./role";
export default {
  data() {
    return {
      addMenuProp: false,
      roleModel: {
        id: "",
        name: "",
        levelId: "",
        levelDic: "",
      },
      appList: [],
      appModel: {
        id: "",
        name: "",
      },
      menuList: [],
      menuListSelect: [],
      menuModel: {
        id: "",
        name: "",
        level: "",
        parentId: "",
        status: "",
        url: "",
        appId: "",
      },
      selectFlag: false,
      defaultProps: {
        children: "childrenList",
        label: function (data, node) {
          return data.name + " " + data.code + " " + data.dic.name;
        },
      },
    };
  },
  created: function () {},
  methods: {
    init(roleId) {
      this.addMenuProp = true;
      this.axios({
        method: "post",
        url: "/myoa/smbus/role/selectRole",
        data: {
          data: {
            id: roleId,
          },
        },
      }).then((res) => {
        this.roleModel.name = res.data.data.name;
        this.roleModel.id = res.data.data.id;
        this.roleModel.levelId = res.data.data.levelId;
        this.roleModel.levelDic = res.data.data.levelDic.name;
      });

      this.initAppList();
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

        this.initRoleMenuSelect(this.roleModel.id, this.appModel.id);
      });
    },
    initRoleMenuSelect: async function (roleId, appId) {
      this.selectFlag = false;
      await this.axios({
        method: "post",
        url: "/myoa/smbus/role/selectRoleMenu",
        async: false,
        data: {
          data: {
            roleId: roleId,
            appId: appId,
          },
        },
      }).then((res) => {
        if (res.data.data != null) {
          var menuIdList = [];
          for (var i = 0; i < res.data.data.menuList.length; i++) {
            if (res.data.data.menuList[i].parentId != -1) {
              menuIdList.push(res.data.data.menuList[i].id);
            } else if (res.data.data.menuList[i].parentId == -1) {
              if (res.data.data.menuList[i].childrenList.length<1) {
                menuIdList.push(res.data.data.menuList[i].id);
              }
            }
          }
          this.menuListSelect = menuIdList;
        } else {
          this.menuListSelect = null;
        }
      });
      this.selectFlag = true;
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data.id + "-" + checked + "-" + indeterminate);
      if (data.parentId == -1) {
        if (!checked) {
          if (indeterminate) {
            return;
          }
        }
      }
      if (checked && this.selectFlag) {
        this.axios({
          method: "post",
          url: "/myoa/smbus/role/addRoleMenu",
          data: {
            data: {
              roleId: this.roleModel.id,
              appId: this.appModel.id,
              menuId: data.id,
              childMenuList: data.childrenList,
              parentId: data.parentId + "",
            },
          },
        }).then((res) => {
          this.$message({
            type: "info",
            message: "操作成功！",
          });
        });
      } else if (this.selectFlag) {
        this.axios({
          method: "post",
          url: "/myoa/smbus/role/removeRoleMenu",
          data: {
            data: {
              roleId: this.roleModel.id,
              appId: this.appModel.id,
              menuId: data.id,
              childMenuList: data.childrenList,
            },
          },
        }).then((res) => {
          this.$message({
            type: "info",
            message: "操作成功！",
          });
        });
      }
      return;
    },
  },
};
</script>