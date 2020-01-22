<template>
  <div class="view-category">
    <el-form ref="form" :model="model" label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="model.title" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parentList"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="canSave"
          type="primary"
          @click="id ? upLoadCategory() : createCategory()"
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
  name: "Category",
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
      model: {},
      parentList: []
    };
  },
  computed: {
    canSave() {
      // return !this.model.title || !this.model.synopsis || !this.model.content;
      return false;
    }
  },
  created() {
    this.id && this.getCategoryById();
    this.getCategoryList();
  },
  methods: {
    getCategoryById() {
      this.$http.get("categories/" + this.id).then(res => {
        console.log(`查询单个分类`, res);
        this.model = res.data;
      });
    },
    getCategoryList() {
      this.$http.get("categories/?all=1").then(res => {
        console.log(`查询分类列表`, res);
        this.parentList = res.data;
      });
    },
    upLoadCategory() {
      this.$http.put("/categories/" + this.id, this.model).then(res => {
        console.log("修改", res);
        this.$router.go(-1);
      });
    },
    createCategory() {
      this.$http.post("/categories", this.model).then(res => {
        console.log("新增", res);
        this.$router.go(-1);
      });
    }
  }
};
</script>

<style scoped>
.view-category {
  padding-top: 30px;
  margin-left: 20px;
}
</style>
