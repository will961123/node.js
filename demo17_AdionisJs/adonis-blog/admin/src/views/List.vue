<template>
  <div v-loading="loading" class="view-list">
    <el-container>
      <el-container>
        <el-main>
          <el-table :data="articlesList">
            <el-table-column
              prop="created_at"
              label="创建日期"
            ></el-table-column>
            <el-table-column prop="title" label="文章标题"></el-table-column>
            <el-table-column prop="synopsis" label="简介"></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" v-on:click="edit(scope.row)"
                  >修改</el-button
                >
                <el-button type="danger" v-on:click="del(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      articlesList: [],
      loading: false
    };
  },
  created() {
    this.getAllList();
  },
  methods: {
    getAllList() {
      this.$http.get("posts").then(res => {
        console.log(`查询全部列表`, res);
        this.articlesList = res.data.data;
      });
    },
    edit(item) {
      console.log(``, item);
      this.$router.push("/articles/edit/" + item._id);
    },
    async del(item) {
      const loading = await this.$confirm(
        "此操作将永久删除 " + '"' + item.title + '"' + " 文章, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
      if (loading) {
        this.loading = true;
        this.$http.delete("posts/" + item._id).then(res => {
          console.log(`删除单个`, res);
          this.loading = false;
          this.getAllList();
        });
      }
    }
  }
};
</script>

<style scoped>
.view-list {
  width: 100%;
}
</style>
