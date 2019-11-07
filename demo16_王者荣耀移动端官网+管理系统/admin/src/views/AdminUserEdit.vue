<template>
  <div v-loading="loading">
    <h1>{{id?'编辑管理员':'新建管理员'}}</h1>
    <el-form @submit.native.prevent="id?editCategory(id):save() " label-width="120px">
      <el-form-item label="账号">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="shbmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
  },
  watch: {
    id(newval) {
      if (!newval) {
        this.model = {};
      }
    }
  },
  data() {
    return {
      model: {},
      loading: false
    };
  },
  created() {
    this.id && this.findOneById(this.id);
  },
  methods: {
    // 方法

    // 新增单个
    async save() {
      this.loading = true;
      const res = await this.$http.post("/rest/admin_users", this.model);
      window.console.log("新增账号", res.data);
      if (res.data.returnCode === 1) {
        this.$message({
          type: "success",
          message: res.data.returnStr
        });
        this.$router.push("/admin_users/list");
      } else {
        this.$message.error(res.data.returnStr || "新增失败!");
      }

      this.loading = false;
    },

    // 查询单个
    async findOneById(id) {
      this.loading = true;
      const res = await this.$http.get("/rest/admin_users/" + id);
      window.console.log("查询单个账号", res.data);
      if (res.data.returnCode === 1) {
        this.model = Object.assign({}, this.model, res.data.list);
      } else {
        this.$message.error(res.data.returnStr || "查询失败!");
      }

      this.loading = false;
    },

    // 修改单个
    async editCategory(id) {
      this.loading = true;
      const res = await this.$http.put("/rest/admin_users/" + id, this.model);
      window.console.log("修改账号", res.data);
      if (res.data.returnCode === 1) {
        this.$message({
          type: "success",
          message: res.data.returnStr
        });
        this.$router.push("/admin_users/list");
      } else {
        this.$message.error(res.data.returnStr || "修改失败!");
      }

      this.loading = false;
    }
  }
};
</script>
 
<style  >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>