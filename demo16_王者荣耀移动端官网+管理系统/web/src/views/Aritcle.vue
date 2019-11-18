<template>
  <div class="page-article">
    <div class="d-flex px-3 py-2 ai-center toptitle">
      <i class="back-bg"></i>
      <strong class="flex-1 py-1 ml-2 fs-lg text-info text-ellipsis mr-2">{{model.title}}</strong>
      <div class="fs-sm text-grey">{{model.createdAt|date()}}</div>
    </div>
    <div v-html="model.body" class="px-3 fs-lg body"></div>
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
  data() {
    return {
      model: ""
    };
  },
  filters: {
    date(val) {
      return dayjs(val).format("YY/MM/DD");
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
}
</style>