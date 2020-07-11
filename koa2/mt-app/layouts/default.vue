<template>
  <el-container>
    <el-header class="myHeader">
      <my-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import MyHeader from '../components/header/index'
export default {
  components: {
    MyHeader
  }
}
</script>

<style lang='scss'>
.myHeader {
  background: #ededed;
  padding: 0 8%;
  font-size: 12px; 
  line-height: 60px;
}
</style>
