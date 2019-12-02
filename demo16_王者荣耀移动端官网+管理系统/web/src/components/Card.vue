<template>
  <div class="card p-3 mt-3 bg-white">
    <!-- 首页导航栏 -->
    <div class="card-header d-flex ai-center" :class="{'border-bottom':!plain,'pb-3':!plain}">
      <!-- 字体图标 -->
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 ml-2">
        <strong>{{title}}</strong>
      </div>
      <i v-if="!plain" class="iconfont icon-more1"></i>
    </div>
    <div class="card-body pt-3">
      <!-- 预留插槽  外部引用组件时可以传递内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      // 必填的意思
      required: true
    },
    icon: {
      type: String,
      // 必填的意思
      required: true
    },
    plain: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  watch: {
    // 监听数据
  },
  computed: {
    // 计算属性
  },
  methods: {
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
 
<style lang='scss'  >
@import "../assets/scss/variables.scss";
.card {
  border-bottom: 1px solid $border-color;
  .border-bottom {
    border-bottom: 1px solid $border-color;
  }
}
</style>