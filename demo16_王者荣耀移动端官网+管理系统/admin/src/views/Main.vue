<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="$route.path" :default-openeds="selectidx" unique-opened>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets"></i>内容管理
            </template>
            <el-menu-item-group @click="selectidx[0]='1'">
              <template slot="title">物品</template>
              <el-menu-item index="/items/create">新建物品</el-menu-item>
              <el-menu-item index="/items/list">物品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/create">新建文章</el-menu-item>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-tickets"></i>运营管理
            </template>
            <el-menu-item-group @click="selectidx[0]='2'">
              <template slot="title">分类</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/ads/create">新建广告位</el-menu-item>
              <el-menu-item index="/ads/list">广告位列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-tickets"></i>系统设置
            </template>
            <el-menu-item-group @click="selectidx[0]='3'">
              <template slot="title">管理员</template>
              <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
              <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="Logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{username}}</span>
        </el-header>

        <el-main>
          <!-- 路由的区分方式默认是按页面区分的 可以通过key来指定通过路径来区分  -->
          <!-- 比如物品编辑跳到新建物品 路由变化将id给去掉了 但数据模型还在所以会有bug --> 
          <!-- 这样不用每个页面watch id 是否存在了了 -->
          <router-view :key="$route.path" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      selectidx: ["1"]
    };
  },
  computed: {
    username() { 
      return localStorage.username;
    }
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push('/login')
      this.$message({
        type:'success',
        message:"退出登录成功!"
      })
    }
  }
};
</script>

<style scoped > 
</style>
