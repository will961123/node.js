<template>
  <div class="createArticel">
    <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input type="textarea" v-model="article.body"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "createArticel",
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
    saveArticle() {
      this.$http.post("/articles", this.article).then(res => {
        console.log('新增文章',res);
        if (res.data.returnCode === 1) {
          this.$message({
            message: res.data.returnStr,
            type: 'success'
          });
        } else {
          this.$message.error(res.data.returnStr);
        }
        this.$router.push("/articles/index")
      });
    }
  },
  created() {
    // 页面初始化开始
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
.createArticel {
}
</style>