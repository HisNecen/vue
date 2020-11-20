<template>
  <el-menu
    theme="dark"
    mode="horizontal"
    class="el-menu-admin"
    @select="handleSelect"
  >
    <el-menu-item index="/">
      <el-tag effect="dark">VUE-ELEMENT(Example)</el-tag>
    </el-menu-item>
    <el-menu-item index="/home" v-if="menuList.HOME.flag">
      <i class="el-icon-s-home"></i>首页
    </el-menu-item>
    <el-submenu index="1" v-if="menuList.SERVICE.flag">
      <template slot="title"> <i class="el-icon-mouse"></i>业务 </template>
      <el-menu-item index="/billboard/list" v-if="menuList.BILLBOARD.flag">
        <i class="el-icon-question"></i>公示板
      </el-menu-item>
      <el-menu-item index="/server/list" v-if="menuList.SERVER.flag">
        <i class="el-icon-s-platform"></i>服务器
      </el-menu-item>
      <el-menu-item index="/supplier/list" v-if="menuList.SUPPLIER.flag">
        <i class="el-icon-goods"></i>供应商
      </el-menu-item>
      <el-menu-item index="/notebook/list" v-if="menuList.NOTEBOOK.flag">
        <i class="el-icon-notebook-1"></i>记事本
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2" v-if="menuList.FINANCE.flag">
      <template slot="title"> <i class="el-icon-orange"></i>财务 </template>
      <el-menu-item index="/income/list" v-if="menuList.INCOME.flag">
        <i class="el-icon-download"></i>入账
      </el-menu-item>
      <el-menu-item index="/payout/list" v-if="menuList.OUTCOME.flag">
        <i class="el-icon-upload2"></i>出账
      </el-menu-item>
      <el-menu-item index="/report/list" v-if="menuList.REPORT.flag">
        <i class="el-icon-s-data"></i>报表
      </el-menu-item>
      <el-menu-item index="/assets/home" v-if="menuList.ASSETS.flag">
        <i class="el-icon-office-building"></i>资产
      </el-menu-item>
    </el-submenu>

    <el-submenu index="3" v-if="menuList.USERM.flag">
      <template slot="title"> <i class="el-icon-s-custom"></i>用户 </template>
      <el-menu-item index="/group/list" v-if="menuList.ORG.flag">
        <i class="el-icon-ship"></i>项目
      </el-menu-item>
      <el-menu-item index="/user/list" v-if="menuList.USERS.flag">
        <i class="el-icon-user"></i>用户
      </el-menu-item>
      <el-menu-item index="/role/list" v-if="menuList.ROLE.flag">
        <i class="el-icon-s-management"></i>角色
      </el-menu-item>
      <el-menu-item index="/app/list" v-if="menuList.APP.flag">
        <i class="el-icon-monitor"></i>应用
      </el-menu-item>
      <el-menu-item index="/permission/list" v-if="menuList.PER.flag">
        <i class="el-icon-caret-right"></i>权限
      </el-menu-item>
      <el-menu-item index="/job/list" v-if="menuList.JOB.flag">
        <i class="el-icon-bank-card"></i>职务
      </el-menu-item>
    </el-submenu>

    <el-menu-item index="/activiti/list" v-if="menuList.STREAM.flag">
      <i class="el-icon-refresh"></i>流程
    </el-menu-item>
    <el-menu-item index="/info/userinfo" v-if="menuList.RESUME.flag">
      <i class="el-icon-info"></i>Resume
    </el-menu-item>
    <el-menu-item index="5" v-if="menuList.ABOUT.flag"> <i class="el-icon-goblet"></i>About </el-menu-item>
    <el-menu-item index="/" v-if="menuList.LOGOUT.flag">
      <i class="el-icon-switch-button"></i>LogOut
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      menuList: {
        HOME: {
          flag: false,
          code: "HOME",
        },
        SERVICE: {
          flag: false,
          code: "SERVICE",
        },
        FINANCE: {
          flag: false,
          code: "FINANCE",
        },
        USERM: {
          flag: false,
          code: "USERM",
        },
        STREAM: {
          flag: false,
          code: "STREAM",
        },
        LOGOUT: {
          flag: false,
          code: "LOGOUT",
        },
        RESUME: {
          flag: false,
          code: "RESUME",
        },
        ABOUT: {
          flag: false,
          code: "ABOUT",
        },
        SERVER: {
          flag: false,
          code: "SERVER",
        },
        SUPPLIER: {
          flag: false,
          code: "SUPPLIER",
        },
        INCOME: {
          flag: false,
          code: "INCOME",
        },
        OUTCOME: {
          flag: false,
          code: "OUTCOME",
        },
        REPORT: {
          flag: false,
          code: "REPORT",
        },
        BILLBOARD: {
          flag: false,
          code: "BILLBOARD",
        },
        NOTEBOOK: {
          flag: false,
          code: "NOTEBOOK",
        },
        ASSETS: {
          flag: false,
          code: "ASSETS",
        },
        USERS: {
          flag: false,
          code: "USERS",
        },
        ROLE: {
          flag: false,
          code: "ROLE",
        },
        APP: {
          flag: false,
          code: "APP",
        },
        PER: {
          flag: false,
          code: "PER",
        },
        JOB: {
          flag: false,
          code: "JOB",
        },
        ORG: {
          flag: false,
          code: "ORG",
        },
      },
      menuListGet: [],
    };
  },
  created() {
    this.initMenuList();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key);
      this.$router.push(key);
    },
    initMenuList() {
      this.axios({
        method: "post",
        url: "/myoa/smbus/menu/selectMenuListUser",
        data: {
          data: {
            appId: 1,
          },
        },
      }).then((res) => {
        this.menuListGet = res.data.data.menuList;
        this.menuListGet.forEach( (item, index) =>{
          if (item.code === this.menuList.HOME.code) {
            this.menuList.HOME.flag = true;
          }
          if (item.code == this.menuList.SERVICE.code) {
            this.menuList.SERVICE.flag = true;
          }
          if (item.code == this.menuList.FINANCE.code) {
            this.menuList.FINANCE.flag = true;
          }
          if (item.code == this.menuList.USERM.code) {
            this.menuList.USERM.flag = true;
          }
          if (item.code == this.menuList.STREAM.code) {
            this.menuList.STREAM.flag = true;
          }
          if (item.code == this.menuList.LOGOUT.code) {
            this.menuList.LOGOUT.flag = true;
          }
          if (item.code == this.menuList.RESUME.code) {
            this.menuList.RESUME.flag = true;
          }
          if (item.code == this.menuList.ABOUT.code) {
            this.menuList.ABOUT.flag = true;
          }
          if (item.code == this.menuList.SERVER.code) {
            this.menuList.SERVER.flag = true;
          }
          if (item.code == this.menuList.SUPPLIER.code) {
            this.menuList.SUPPLIER.flag = true;
          }
          if (item.code == this.menuList.INCOME.code) {
            this.menuList.INCOME.flag = true;
          }
          if (item.code == this.menuList.OUTCOME.code) {
            this.menuList.OUTCOME.flag = true;
          }
          if (item.code == this.menuList.REPORT.code) {
            this.menuList.REPORT.flag = true;
          }
          if (item.code == this.menuList.BILLBOARD.code) {
            this.menuList.BILLBOARD.flag = true;
          }
          if (item.code == this.menuList.NOTEBOOK.code) {
            this.menuList.NOTEBOOK.flag = true;
          }
          if (item.code == this.menuList.ASSETS.code) {
            this.menuList.ASSETS.flag = true;
          }
          if (item.code == this.menuList.USERS.code) {
            this.menuList.USERS.flag = true;
          }
          if (item.code == this.menuList.ROLE.code) {
            this.menuList.ROLE.flag = true;
          }
          if (item.code == this.menuList.APP.code) {
            this.menuList.APP.flag = true;
          }
          if (item.code == this.menuList.PER.code) {
            this.menuList.PER.flag = true;
          }
          if (item.code == this.menuList.JOB.code) {
            this.menuList.JOB.flag = true;
          }
          if (item.code == this.menuList.ORG.code) {
            this.menuList.ORG.flag = true;
          }
        });
      });
    },
  },
};
</script>
<style>
.el-menu-item:hover {
  border-left: #33a2ef solid 6px !important;
  background-color: #e2eff9 !important;
  color: #38b2ff !important;
  /* //less语法，实现鼠标悬停时icon变色 */
}
.el-menu-item:hover i {
  color: #38b2ff;
}
/* el-submenu:hover{
        border-left:#33A2EF solid 6px !important;
        background-color: #E2EFF9 !important;
        color: #38B2FF !important;
} */
</style>