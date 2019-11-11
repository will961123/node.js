<template>
  <div v-loading="loading">
    <h1>{{id?'编辑文章':'新建文章'}}</h1>
    <el-form @submit.native.prevent="id?editCategory(id):save() " label-width="120px">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="(item,index) in categories"
            :key="index"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <VueEditor v-model="model.body" useCustomImageHandler @image-added="uploadImgSuccess" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="shbmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  props: {
    id: { type: String }
  }, 
  data() {
    return {
      model: {},
      categories: [],
      loading: false
    };
  },
  created() {
    this.model = {};
    this.id && this.findOneById(this.id);
    this.findCategories();
  },
  methods: {
    // 方法

    // 查询分类
    async findCategories() {
      this.loading = true;
      const res = await this.$http.get("/rest/categories");
      window.console.log("查询父级分类", res.data);
      if (res.data.returnCode === 1) {
        this.categories = res.data.list;
      } else {
        this.$message.error(res.data.returnStr || "查询父级失败!");
      }
      this.loading = false;
    },

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
      const res = await this.$http.put("/rest/articles/" + id, this.model);
      window.console.log("修改文章", res.data);
      if (res.data.returnCode === 1) {
        this.$message({
          type: "success",
          message: res.data.returnStr
        });
        this.$router.push("/articles/list");
      } else {
        this.$message.error(res.data.returnStr || "修改失败!");
      }

      this.loading = false;
    },

    // 上传富文本图片
    async uploadImgSuccess(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("/upload", formData);
      window.console.log("上传富文本", res);
      Editor.insertEmbed(cursorLocation, "image", this.imgUrl+res.data.src);
      resetUploader()
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