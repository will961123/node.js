<template>
  <div v-loading="loading">
    <h1>分类列表</h1>
    <el-table :data="catrgoryList">
      <el-table-column prop="_id" label="id" width="280"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类" width="280"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
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
      const res = await this.$http.get("/rest/categories");
      window.console.log("分类列表", res);
      if (res.data.returnCode === 1) {
        this.catrgoryList = res.data.list;
      } else {
        this.$message.error(res.data.returnStr || "查询失败!");
      }
      this.loading = false;
    },

    // 去修改分类
    edit(id) {
      this.$router.push("/categories/edit/" + id);
    },

    // 删除分类
    async del(item) {
      this.$confirm(
        "此操作将永久删除 " + '"' + item.name + '"' + " 分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          this.loading = true;
          const res = await this.$http.delete("/rest/categories/" + item._id);
          window.console.log("删除一个分类", res);
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