<template>
  <div v-loading="loading">
    <h1>文章列表</h1>
    <el-table :data="itemList">
      <el-table-column prop="_id" label="id" width="280"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="icon" label="文章分类">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.categories" :key="index"> {{item.name}} </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="primary" size="small">修改</el-button>
          <el-button @click="del(scope.row)" type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemList: [],
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 方法

    // 查询文章
    async getList() {
      this.loading = true;
      const res = await this.$http.get("/rest/articles");
      window.console.log("文章列表", res);
      if (res.data.returnCode === 1) {
        this.itemList = res.data.list;
      } else {
        this.$message.error(res.data.returnStr || "查询失败!");
      }
      this.loading = false;
    },

    // 去修改文章
    edit(id) {
      this.$router.push("/articles/edit/" + id);
    },

    // 删除文章
    async del(item) {
      this.$confirm(
        "此操作将永久删除 " + '"' + item.title + '"' + " 文章, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          this.loading = true;
          const res = await this.$http.delete("/rest/articles/" + item._id);
          window.console.log("删除一个文章", res);
          if (res.data.returnCode === 1) {
            this.$message({
              type: "success",
              message: res.data.returnStr
            });
          } else {
            this.$message.error(res.data.returnStr || "删除失败!");
          }
          this.loading = false;
          this.getList();
        })
        .catch(() => {});
    }
  }
};
</script>
 
<style  >
</style>