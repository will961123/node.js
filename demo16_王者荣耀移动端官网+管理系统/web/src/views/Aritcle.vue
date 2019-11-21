<template>
  <div class="page-article">
    <div class="d-flex px-3 py-2 ai-center toptitle">
      <i class="back-bg"></i>
      <strong class="flex-1 py-1 ml-2 fs-lg text-info text-ellipsis mr-2">{{model.title}}</strong>
      <div class="fs-sm text-grey">{{model.createdAt|date()}}</div>
    </div>
    <div v-html="model.body" class="px-3 fs-lg body"></div>
    <div class="p-3 moreinfo">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu"></i>
        <span class="ml-2 text-info fs-lg">相关资讯</span>
      </div>
      <div class="pt-2 fs-lg">
        <router-link
          :to="`/articles/${item._id}`"
          tag="div"
          v-for="(item,index) in model.related"
          :key="index"
          class="py-1"
        >
          <div class="text-ellipsis w-100">{{item.title}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  watch: {
    id: "getNewsDetail"
  },
  data() {
    return {
      model: ""
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("YY年MM月DD日 HH:MM");
    }
  },
  created() {
    this.getNewsDetail();
  },
  methods: {
    async getNewsDetail() {
      const res = await this.$http.get("articles/list/" + this.id);
      window.console.log("新闻详情", res);
      this.model = res.data;
    }
  }
};
</script>

<style lang="scss" >
@import "../assets/scss/variables.scss";
.page-article {
  .toptitle {
    border-bottom: 1px solid $border-color;
    .back-bg {
      background: url(../assets/images/backBg.png) center;
      background-size: cover;
      display: inline-block;
      width: 0.769231rem /* 10/13 */;
      height: 1.230769rem; /* 16/13 */
    }
  }
  .body {
    h2 {
      text-align: center;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  .moreinfo {
    border-top: 2px solid $border-color;
  }
}
</style>