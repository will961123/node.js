<template>
  <div v-loading="loading">
    <h1>{{id?'编辑英雄':'新建英雄'}}</h1>
    <el-form @submit.native.prevent="id?editCategory(id):save() " label-width="120px">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="uploadImgSuccess"
            >
              <img v-if="model.icon" :src="imgUrl+model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="(item,index) in categories"
                :key="index"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="padding-top:0.7em" :max="9" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="padding-top:0.7em" :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="padding-top:0.7em" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="padding-top:0.7em" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="(item,index) in items"
                :key="index"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="(item,index) in items"
                :key="index"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.src)"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="item.icon" :src="imgUrl+item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:1rem">
        <el-button type="primary" native-type="shbmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
  },
  watch: {
    id(newval) {
      if (!newval) {
        this.model = {
          scores: {},
          skills: []
        };
      }
    }
  },
  data() {
    return {
      model: {
        scores: {},
        skills: []
      },
      categories: [],
      items: [],
      loading: false
    };
  },
  created() {
    this.id && this.findOneById(this.id);
    this.findCategories();
    this.findItems();
  },
  methods: {
    // 方法

    // 查询分类列表
    async findCategories() {
      this.loading = true;
      const res = await this.$http.get("/rest/categories");
      window.console.log("查询分类列表", res.data);
      if (res.data.returnCode === 1) {
        this.categories = res.data.list;
      } else {
        this.$message.error(res.data.returnStr || "查询失败!");
      }
      this.loading = false;
    },

    // 查询装备列表
    async findItems() {
      this.loading = true;
      const res = await this.$http.get("/rest/items");
      window.console.log("查询装备列表", res.data);
      if (res.data.returnCode === 1) {
        this.items = res.data.list;
      } else {
        this.$message.error(res.data.returnStr || "查询失败!");
      }
      this.loading = false;
    },

    // 新增单个
    async save() {
      this.loading = true;
      const res = await this.$http.post("/rest/heroes", this.model);
      window.console.log("新增英雄", res.data);
      if (res.data.returnCode === 1) {
        this.$message({
          type: "success",
          message: res.data.returnStr
        });
        this.$router.push("/heroes/list");
      } else {
        this.$message.error(res.data.returnStr || "新增失败!");
      }

      this.loading = false;
    },

    // 查询单个
    async findOneById(id) {
      this.loading = true;
      const res = await this.$http.get("/rest/heroes/" + id);
      window.console.log("查询单个英雄", res.data);
      if (res.data.returnCode === 1) {
        // this.model = res.data.list;
        // 这样赋值可以防止多层级的对象为空导致js报错
        this.model = Object.assign({}, this.model, res.data.list);
      } else {
        this.$message.error(res.data.returnStr || "查询失败!");
      }

      this.loading = false;
    },

    // 修改单个
    async editCategory(id) {
      this.loading = true;
      const res = await this.$http.put("/rest/heroes/" + id, this.model);
      window.console.log("修改英雄", res.data);
      if (res.data.returnCode === 1) {
        this.$message({
          type: "success",
          message: res.data.returnStr
        });
        this.$router.push("/heroes/list");
      } else {
        this.$message.error(res.data.returnStr || "修改失败!");
      }

      this.loading = false;
    },

    // 上传图片成功后
    uploadImgSuccess(res, file) {
      console.log("服务器返回:", res, "本地返回", file);
      // this.model.icon = URL.createObjectURL(file.raw);
      this.$set(this.model, "icon", res.src);
    },

    // 上传图片前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
 
<style> 
</style>