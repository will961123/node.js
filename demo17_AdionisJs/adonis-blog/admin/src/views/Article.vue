<template>
  <div class="view-article">
    <el-form ref="form" :model="model" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="model.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <!-- <el-form-item label="文章分类">
        <el-select v-model="model.region" placeholder="请选择文章分类">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="文章简介">
        <el-input
          type="textarea"
          v-model="model.synopsis"
          placeholder="请输入文章简介"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <VueEditor v-model="model.content"></VueEditor>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="canSave"
          type="primary"
          @click="id ? upLoadArticle() : createArticle()"
          >{{ id ? "立即修改" : "立即创建" }}</el-button
        >
        <el-button @click="() => $router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "Article",
  props: {
    id: {
      type: String
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VueEditor
  },
  data() {
    return {
      model: {}
    };
  },
  computed: {
    canSave() {
      return !this.model.title || !this.model.synopsis || !this.model.content;
    }
  },
  created() {
    console.log(``, this.$route.path);
    this.id && this.getArticleById();
  },
  methods: {
    getArticleById() {
      this.$http.get("posts/" + this.id).then(res => {
        console.log(`查询单个`, res);
        this.model = res.data;
      });
    },
    upLoadArticle() {
      this.$http.put("/posts/" + this.id, this.model).then(res => {
        console.log("修改", res);
        this.$router.go(-1);
      });
    },
    createArticle() {
      this.$http.post("/posts", this.model).then(res => {
        console.log("新增", res);
        this.$router.go(-1);
      });
    }
  }
};
</script>

<style scoped>
.view-article {
  padding-top: 30px;
  margin-left: 20px;
}
</style>
