<template>
  <el-row :gutter="0">
    <el-col :span="6">
      <City></City>
    </el-col>
    <el-col :span="6">
      <User></User>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>

<script>
import City from './city'
import User from './user'
export default {
  components: {
    City,
    User
  }
}
</script>

<style>
</style>
