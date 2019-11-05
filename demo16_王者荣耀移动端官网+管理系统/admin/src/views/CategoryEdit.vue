<template>
  <div v-loading="loading">
    <h1>新建分类</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
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
  data() {
    return {
      model: {},
      loading: false
    };
  },
  methods: {
    // 方法

    // 新增
    async save() {
      this.loading = true;

      const res = await this.$http.post("/categories", this.model);
      window.console.log("新增文章", res.data);
      this.loading = false;
      this.$message({
        type: "success",
        message: res.data.returnStr
      });
      this.$router.push("/categories/list") 

      //   this.$http.post("/categories", this.model).then(res => {
      //     window.console.log("新增文章", res.data);
      //     this.loading = false;
      //     this.$message({
      //       type: "success",
      //       message: res.data.returnStr
      //     });
      //   });
    }
  }
};
</script>
 
<style  >
</style>