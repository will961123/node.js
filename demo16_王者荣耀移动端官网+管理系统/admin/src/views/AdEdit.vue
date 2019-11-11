<template>
  <div v-loading="loading">
    <h1>{{id?'编辑广告位':'新建广告位'}}</h1>
    <el-form @submit.native.prevent="id?editCategory(id):save()" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button style="margin-bottom:1rem" @click="model.items.push({})">
          <i class="el-icon-plus"></i>新增图片
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col
            :md="24"
            v-for="(item,index) in model.items"
            :key="index"
            style="margin-bottom:1rem"
          >
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :show-file-list="false"
                :on-success="res=>$set(item,'image',res.src) "
                :before-upload="beforeAvatarUpload"
                :headers="getAuthHeaders()"
              >
                <img style="width:auto" v-if="item.image" :src="imgUrl+item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="删除" style="margin-top:1rem">
              <el-button type="danger" size="small" @click="model.items.splice(index,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-top:0.6rem" type="primary" native-type="shbmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
  }, 
  data() {
    return {
      model: {
        items: []
      },
      loading: false
    };
  },
  created() {
    this.id && this.findOneById(this.id);
  },
  methods: {
    // 方法

    // 新增单个
    async save() {
      this.loading = true;
      const res = await this.$http.post("/rest/ads", this.model);
      window.console.log("新增广告位", res.data);
      if (res.data.returnCode === 1) {
        this.$message({
          type: "success",
          message: res.data.returnStr
        });
        this.$router.push("/ads/list");
      } else {
        this.$message.error(res.data.returnStr || "新增失败!");
      }

      this.loading = false;
    },

    // 查询单个
    async findOneById(id) {
      this.loading = true;
      const res = await this.$http.get("/rest/ads/" + id);
      window.console.log("查询单个广告位", res.data);
      if (res.data.returnCode === 1) {
        this.model = Object.assign({}, this.model, res.data.list);
      } else {
        this.$message.error(res.data.returnStr || "查询失败!");
      }

      this.loading = false;
    },

    // 修改单个
    async editCategory(id) {
      this.loading = true;
      const res = await this.$http.put("/rest/ads/" + id, this.model);
      window.console.log("修改广告位", res.data);
      if (res.data.returnCode === 1) {
        this.$message({
          type: "success",
          message: res.data.returnStr
        });
        this.$router.push("/ads/list");
      } else {
        this.$message.error(res.data.returnStr || "修改失败!");
      }

      this.loading = false;
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
 
<style  >
</style>