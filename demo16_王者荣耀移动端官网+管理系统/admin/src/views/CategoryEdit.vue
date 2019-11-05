<template>
  <div v-loading="loading">
    <h1>{{id?'编辑分类':'新建分类'}}</h1>
    <el-form @submit.native.prevent="id?editCategory(id):save()" label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option :label="item.name" :value="item._id" v-for="(item,index) in parents" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
  data() {
    return {
      model: {},
      parents: [],
      loading: false
    };
  },
  created() {
    this.model = {};
    // if (this.id) this.findOneById(this.id);
    this.id && this.findOneById(this.id);
    this.getparents()
  },
  methods: {
    // 方法

    // 新增单个
    async save() {
      this.loading = true;
      const res = await this.$http.post("/categories", this.model);
      window.console.log("新增分类", res.data);
      if (res.data.returnCode === 1) {
        this.$message({
          type: "success",
          message: res.data.returnStr
        });
        this.$router.push("/categories/list");
      } else {
        this.$message.error(res.data.returnStr || "新增失败!");
      }

      this.loading = false;
    },

    // 查询单个
    async findOneById(id) {
      this.loading = true;
      const res = await this.$http.get("/categories/" + id);
      window.console.log("查询单个分类", res.data);
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
      const res = await this.$http.put("/categories/" + id, this.model);
      window.console.log("修改分类", res.data);
      if (res.data.returnCode === 1) {
        this.$message({
          type: "success",
          message: res.data.returnStr
        });
        this.$router.push("/categories/list");
      } else {
        this.$message.error(res.data.returnStr || "修改失败!");
      }

      this.loading = false;
    },

    // 获取上级分类
    async getparents() {
      this.loading = true;
      const res = await this.$http.get("/categories/");
      window.console.log("查询父级分类", res.data);
      if (res.data.returnCode === 1) {
        this.parents = res.data.list;
      } else {
        this.$message.error(res.data.returnStr || "查询父级失败!");
      }
      this.loading = false;
    }
  }
};
</script>
 
<style  >
</style>