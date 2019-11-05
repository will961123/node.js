<template>
  <div class="listArticle">
    <el-table :data="articleData">
      <el-table-column prop="title" label="标题" width="140"></el-table-column>
      <el-table-column prop="body" label="内容" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row._id,scope)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "listArticle",
  components: {
    // 组件
  },
  propos: [],
  data() {
    return {
      articleData: []
    };
  },
  watch: {
    // 监听数据
  },
  computed: {
    // 计算属性
  },
  methods: {
    // 方法

    // 查询列表
    getList() {
      this.$http.get("/articles").then(res => {
        console.log(res);
        this.articleData = res.data;
      });
    },
    // 删除
    remove(id,a) {
      console.log(a.row,id);  
      // console.log(id);
      this.$http.delete("/articles/" + id).then(res => {
        console.log(res);
        this.$message({
          message: res.data.returnStr,
          type: "success"
        });
        this.getList();
      });
    },
    // 编辑
    edit(id) {
      console.log(id);
      this.$router.push("/articles/" + id + "/edit");
    }
  },
  created() {
    // 页面初始化开始
    this.getList();
  },
  mounted() {
    // 页面初始化完成
  },
  destroyed() {
    // 页面销毁
  }
};
</script>
 
<style  scoped>
.listArticle {
}
</style>