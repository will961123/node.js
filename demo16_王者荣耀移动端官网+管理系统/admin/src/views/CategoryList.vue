<template>
  <div v-loading="loading">
    <h1>列表</h1>
    <el-table :data="catrgoryList">
      <el-table-column prop="_id" label="id" width='280'></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catrgoryList: [],
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 方法

    // 查询列表
    async getList() {
      this.loading = true;
      const res = await this.$http.get("categories");
      window.console.log("文章列表", res);
      this.catrgoryList = res.data;
      this.loading = false;
    }
  }
};
</script>
 
<style  >
</style>