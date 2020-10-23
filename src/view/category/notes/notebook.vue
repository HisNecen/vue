<template>
  <div>
    <div>
      <el-row class="demo-avatar demo-basic">
        <el-form
          label-position="left"
          :inline="true"
          class="demo-form-inline"
          style="text-align: right"
        >
          <el-tag
            >记事本为私密信息，非特殊情况下不要查看他人信息，并保证自己的安全码不要泄露给其他人！</el-tag
          >
          <el-button type="primary" @click="checkcodeProp()"
            >验证安全码</el-button
          >
        </el-form>
        <el-col>
          <div class="demo-basic--circle">
            <div class="block">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <div class="block">
                      <div class="radio">
                        内容排序：
                        <el-radio-group v-model="reverse">
                          <el-radio :label="true">倒序</el-radio>
                          <el-radio :label="false">正序</el-radio>
                        </el-radio-group>
                      </div>

                      <el-divider></el-divider>
                      <el-timeline v-if="checkProcedureFlag" :reverse="reverse">
                        <el-timeline-item
                          v-for="item in noteList"
                          :timestamp="item.addTime"
                          :key="item.id"
                          placement="top"
                        >
                          <el-card>
                            <div slot="header" class="clearfix">
                              <span>
                                <el-button
                                  @click="showUpdateNote(item.id)"
                                  type="primary"
                                  icon="el-icon-edit"
                                  size="mini"
                                  circle
                                >
                                </el-button>
                                {{ item.name }}
                              </span>

                              <el-button
                                @click="deleteNote(item.id,item.name)"
                                type="danger"
                                size="mini"
                                icon="el-icon-delete"
                                circle
                                style="float: right"
                              ></el-button>
                            </div>
                            <h3></h3>

                            <div style="font-width: bold">
                              内容：{{ item.content }}
                            </div>

                            <div>描述：{{ item.description }}</div>
                            <p>提交于 {{ item.addTime }}</p>
                          </el-card>
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                  </div>
                </el-col>
                <el-col
                  :span="8"
                  style="
                    margin-left: 10px;
                    position: fixed;
                    right: 15px;
                    top: 150px;
                  "
                >
                  <br />
                  <el-card>
                    <el-col :span="4">
                      <div
                        class="grid-content bg-purple"
                        style="text-align: right"
                      >
                        <el-avatar :size="50" :src="circleUrl"></el-avatar>
                        <div class="sub-title">记事本</div>
                        <br />
                      </div>
                    </el-col>
                    <el-form
                      label-position="left"
                      :inline="true"
                      class="demo-form-inline"
                      style="text-align: right"
                    >
                      <el-row>
                        <el-col :span="16">
                          <el-form-item label="关键字">
                            <el-input v-model="keyword"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-button type="primary" @click="initData()"
                            >查询</el-button
                          >
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="4">
                          <el-button type="success" @click="showAddNote()"
                            >添加记录
                          </el-button>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- addOrUpdate -->
    <add-or-update v-if="editProp" ref="addOrUpdate"></add-or-update>
    <checkcode v-if="checkProp" ref="checkcode"></checkcode>
  </div>
</template>
<script>
import checkcode from "./checkcode";
import addOrUpdate from "./edit";
export default {
  components: {
    addOrUpdate,
    checkcode,
  },
  data() {
    return {
      circleUrl: "/static/images/userHeder.png",
      checkProp: true,
      editProp: false,
      checkProcedureFlag: false,
      reverse: true,
      keyword: "",
      noteList: [],
    };
  },
  methods: {
    checkcodeProp: function () {
      this.checkProp = true;
      this.$nextTick(() => {
        this.$refs.checkcode.checkcodeProp();
      });
    },
    initData: function () {
      if (this.checkProcedureFlag) {
        this.axios({
          method: "post",
          url: "/myoa/smbus/notebook/selectNoteBookAll",
          data: {
            data: {
              keyword: this.keyword,
            },
          },
        }).then((res) => {
          this.noteList = res.data.data.notebookList;
        });
      }
    },
    showAddNote() {
      this.editProp = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.showAddNote(null);
      });
    },
    showUpdateNote(id) {
      this.editProp = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.showAddNote(id);
      });
    },
    deleteNote(id,name){
        //普通调用方式
      this.$confirm("将删除" + name + ", 是否确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios({
            method: "post",
            url: "/myoa/smbus/notebook/deleteNote",
            data: {
              data: {
                id: id,
              },
            },
          }).then((res) => {
            if (res.status == 200) {
              this.$message("删除成功！");
            }
            this.initData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  },
};
</script>