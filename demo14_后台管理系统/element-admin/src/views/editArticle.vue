<template>
  <div class="editArticel">
    <el-form @submit.native.prevent="editArticle" ref="form" :model="article" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input type="textarea" v-model="article.body"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "editArticel",
  components: {
    // 组件
  },
  propos: [],
  data() {
    return {
      article: {
        title: "",
        body: ""
      }
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

    // 修改
    editArticle() {
      this.$http.put("/articles/" + this.$route.params.id, this.article).then(res => {
        console.log("修改文章", res);
        if (res.data.returnCode === 1) {
          this.$message({
            message: res.data.returnStr,
            type: "success"
          });
        } else {
          this.$message.error(res.data.returnStr);
        }
        this.$router.push("/articles/index");
      });
    },
    // 获取单篇文章
    getArticle(id) {
      this.$http.get("/articles/" + id).then(res => {
        console.log("单篇文章", res.data);
        this.article = res.data;
      });
    }
  },
  created() {
    // 页面初始化开始
    this.getArticle(this.$route.params.id);
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
.editArticel {
}
</style>