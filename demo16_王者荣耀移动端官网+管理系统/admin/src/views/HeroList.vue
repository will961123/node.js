<template>
  <div v-loading="loading">
    <h1>英雄列表</h1>
    <el-table :data="heroList">
      <el-table-column prop="_id" label="id" width="280"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="称号"></el-table-column>
      <el-table-column prop="categories[0].name" label="分类">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.categories" :key="index"> {{item.name}} </span>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="头像">
        <template slot-scope="scope">
          <img style="width:40px;height:40px" :src="imgUrl+scope.row.icon" :alt="scope.row.name" />
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
      heroList: [],
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 方法

    // 查询物品
    async getList() {
      this.loading = true;
      const res = await this.$http.get("/rest/heroes");
      window.console.log("查询英雄", res);
      if (res.data.returnCode === 1) {
        this.heroList = res.data.list;
      } else {
        this.$message.error(res.data.returnStr || "查询失败!");
      }
      this.loading = false;
    },

    // 去修改物品
    edit(id) {
      this.$router.push("/heroes/edit/" + id);
    },

    // 删除物品
    async del(item) {
      this.$confirm(
        "此操作将永久删除 " + '"' + item.name + '"' + " 英雄, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          this.loading = true;
          const res = await this.$http.delete("/rest/heroes/" + item._id);
          window.console.log("删除一个英雄", res);
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