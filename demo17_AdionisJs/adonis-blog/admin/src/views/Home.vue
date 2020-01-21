<template>
  <div class="home">
    <el-container>
      <el-aside
        width="200px"
        style="background-color: rgb(238, 241, 246);height:100%;"
      >
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>文章管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/list" tag="div">文章列表</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/articles/edit/" tag="div"
                  >新增文章</router-link
                >
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <router-view :key="$route.path"></router-view>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
