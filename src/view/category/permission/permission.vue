<template>
  <div id="permissionList">
    <el-row>
      <el-col :span="8">
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
              >
              </el-tree>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <div class="tip">
            <p><code>ADD MENU</code></p>
            <hr />
            <el-form :model="menuModel" label-width="80px">
              <el-form-item label="级别">
                <el-select
                  v-model="menuModel.level"
                  placeholder="请选择级别"
                  style="width: 100%"
                  v-on:change="showSeconMenuList"
                >
                  <el-option
                    v-for="item in menuModelLevelList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="seconde" label="父菜单">
                <el-select
                  v-model="menuModel.parentId"
                  placeholder="请选择父级菜单"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in menuModelParentMenuList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="菜单名称">
                <el-input v-model="menuModel.name"></el-input>
              </el-form-item>
              <el-form-item label="菜单名称">
                <el-input v-model="menuModel.code"></el-input>
              </el-form-item>
              <el-form-item label="访问路径">
                <el-input v-model="menuModel.url"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-switch v-model="menuModel.status"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addMenuSubmit"
                  >立即创建</el-button
                >
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
        code:""
      },
      menuModelParentMenuList: [],
      seconde: false,
      menuModelLevelList: [],
      defaultProps: {
        children: "childrenList",
        label: function (data, node) {
          return data.name + " " +data.code+ " " + data.dic.name;
        },
      },
    };
  },
  created: function () {
    this.initAppList();
    this.addMenuInitMenuLevelList("12");
  },
  methods: {
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
        this.addMenuInitParentMenuList(this.appList[0].id, -1);
      });
    },
    changeSelectApp: function () {
      this.initMenuList(this.appModel.id);
      this.addMenuInitParentMenuList(this.appModel.id, -1);
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
    showSeconMenuList: function () {
      if (this.menuModel.level != 61) {
        this.seconde = true;
      } else {
        this.seconde = false;
      }
    },
    addMenuInitParentMenuList: function (appId, parentId) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/menu/selectMenuListByAppId",
        async: false,
        data: {
          data: {
            appId: appId,
            parentId: parentId,
          },
        },
      }).then((res) => {
        this.menuModelParentMenuList = res.data.data.menuList;
        console.log("menuModelParentMenuList:" + this.menuModelParentMenuList);
      });
    },
    addMenuInitMenuLevelList: function (dicType) {
      this.axios({
        method: "post",
        url: "/myoa/smbus/dic/dic/selectDicInType",
        data: {
          data: {
            type: dicType,
          },
        },
      }).then((res) => {
        this.menuModelLevelList = res.data.data.dicList;
        this.menuModel.level = this.menuModelLevelList[0].id;
      });
    },
    addMenuSubmit: function () {
      var status = 1;
      if (this.menuModel.status == "" || this.menuModel.status == true) {
        status = 1;
      }
      if (this.menuModel.status == false) {
        status = 0;
      }
      if (this.menuModel.parentId == null || this.menuModel.parentId == "") {
        this.menuModel.parentId = -1;
      }
      this.axios({
        method: "post",
        url: "/myoa/smbus/menu/saveMenu",
        data: {
          data: {
            name: this.menuModel.name,
            level: this.menuModel.level,
            parentId: this.menuModel.parentId,
            status: status,
            url: this.menuModel.url,
            appId: this.appModel.id,
            code:this.menuModel.code
          },
        },
      }).then((res) => {
        this.$message({
          type: "info",
          message: "操作成功！",
        });
        this.initAppList();
        this.addMenuInitMenuLevelList("12");
      });
    },
  },
};
</script>