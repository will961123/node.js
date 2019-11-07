<template>
  <div v-loading="loading">
    <h1>{{id?'编辑文章':'新建文章'}}</h1>
    <el-form @submit.native.prevent="id?editCategory(id):save() " label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :show-file-list="false"
          :on-success="uploadImgSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.icon" :src="imgUrl+model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    this.model = {};
    this.id && this.findOneById(this.id);
  },
  methods: {
    // 方法

    // 新增单个
    async save() {
      this.loading = true;
      const res = await this.$http.post("/rest/articles", this.model);
      window.console.log("新增文章", res.data);
      if (res.data.returnCode === 1) {
        this.$message({
          type: "success",
          message: res.data.returnStr
        });
        this.$router.push("/articles/list");
      } else {
        this.$message.error(res.data.returnStr || "新增失败!");
      }

      this.loading = false;
    },

    // 查询单个
    async findOneById(id) {
      this.loading = true;
      const res = await this.$http.get("/rest/articles/" + id);
      window.console.log("查询单个文章", res.data);
      if (res.data.returnCode === 1) {
        this.model = res.data.list;
      } else {
        this.$message.error(res.data.returnStr || "查询失败!");
      }

      this.loading = false;
    },

    // 修改单个
    async editCategory(id) {
      this.loading = true;
      const res = await this.$http.put("/rest/items/" + id, this.model);
      window.console.log("修改文章", res.data);
      if (res.data.returnCode === 1) {
        this.$message({
          type: "success",
          message: res.data.returnStr
        });
        this.$router.push("/items/list");
      } else {
        this.$message.error(res.data.returnStr || "修改失败!");
      }

      this.loading = false;
    },

    // 上传图片成功后
    uploadImgSuccess(res, file) {
      console.log("服务器返回:", res, "本地返回", file);
      // this.model.icon = URL.createObjectURL(file.raw);
      this.$set(this.model, "icon", res.src);
    },
    // 上传图片前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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