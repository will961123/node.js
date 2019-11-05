<template>
  <div v-loading="loading">
    <h1>列表</h1>
    <el-table :data="catrgoryList">
      <el-table-column prop="_id" label="id" width="280"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
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
    },
    // 修改单篇
    // async edit(id) {

    // }
  }
};
</script>
 
<style  >
</style>