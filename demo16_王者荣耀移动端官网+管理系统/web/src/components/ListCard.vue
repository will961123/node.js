<template>
  <m-card :icon="icon" :title="title">
    <!-- 将下面放入card-body的插槽中 -->
    <div class="nav jc-between">
      <div
        class="nav-item"
        v-for="(item,index) in categories "
        :key="index"
        :class="{active:active===index}"
      >
        <div @click="active=index" class="nav-link">{{item.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper>
        <swiper-slide v-for="(item,index) in categories " :key="index">
          <!-- <div v-for="(itm,idx) in item.Newslist" :key="idx" class="py-2">
              <span>{{itm.name}}</span>
              <span>{{itm.title}}</span>
              <span>{{itm.date}}</span>
          </div>-->
          <!-- 由于每个卡片的样式不同 所以这个地方用slot 并且把循环的值传给外层 -->
          <slot name="items" :category="item"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
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
    categories: {
      type: Array,
      // 必填的意思
      required: true
    }
  },
  data() {
    return {
      active: 0
    };
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
 
<style lang="scss" >
</style>