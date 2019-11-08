<template>
  <div class="login">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="账号">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {
    // 组件
  },
  propos: [],
  data() {
    return {
      model: {}
    };
  },
  methods: {
    // 方法
    async login() {
      const res = await this.$http.post("/login", this.model);
      window.console.log(res);
      if (res.data.returnCode === 1) {
        localStorage.token = res.data.token;
        this.$router.push("/items/list");
        this.$message({
            message:"登陆成功!",
            type:'success'
        })
        localStorage.username = res.data.user.username
      }
    }
  }
};
</script>
 
<style  >
.login-card {
  width: 30rem;
  margin: 10rem auto;
}
</style>