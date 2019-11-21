<template>
  <div class="page-hero">
    <div class="topbar d-flex ai-center py-2 px-3 bg-black text-white fs-sm">
      <img src="../assets/images/logo.png" height="30" alt />
      <div class="ml-2 mr-3">王者荣耀</div>
      <div class="flex-1">攻略站</div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  watch: {},
  data() {
    return {
      model: ""
    };
  },
  created() {
    this.getHeroesDetail();
  },
  methods: {
    async getHeroesDetail() {
      const res = await this.$http.get("heroes/list/" + this.id);
      window.console.log("英雄详情", res);
      // this.model = res.data;
    }
  }
};
</script>

<style lang="scss" >
@import "../assets/scss/variables.scss";
.page-hero {
  .topbar {
    position: static;
    top: 0;
    z-index: 99;
  }
}
</style>