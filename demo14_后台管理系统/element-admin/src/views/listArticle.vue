<template>
  <div class="listArticel">
    <el-table :data="tableData">
      <el-table-column prop="date" label="日期" width="140"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "listArticel",
  components: {
    // 组件
  },
  propos: [],
  data() {
    return {
      tableData: Array(20).fill({
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      })
    };
  },
  watch() {
    // 监听数据
  },
  computed() {
    // 计算属性
  },
  methods() {
    // 方法
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
.listArticel {
}
</style>