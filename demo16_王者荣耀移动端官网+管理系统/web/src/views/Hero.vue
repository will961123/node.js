<template>
  <div class="page-hero">
    <div class="topbar d-flex ai-center py-2 px-3 bg-black text-white fs-sm">
      <img src="../assets/images/logo.png" height="30" alt />
      <div class="ml-2 mr-3">王者荣耀</div>
      <div class="flex-1">攻略站</div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top_banner text-white" :style="{'background-image':`url(${imgUrl+model.banner})`}">
      <div class="info p-3 d-flex flex-column jc-end h-100">
        <div>{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div v-if="model.categories">{{model.categories.map(i=>i.name).join('/')}}</div>
        <div class="d-flex jc-between">
          <div v-if="model.scores" class="text-center">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey">皮肤 : 2</router-link>
        </div>
      </div>
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
      this.model = res.data;
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
  .top_banner {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .badge {
      display: inline-block;
      width: 1.3em;
      height: 1.3em;
      line-height: 1.3em;
      border-radius: 50%;
      margin: 0 0.2em;
      font-size: 0.75rem;
    }
  }
}
</style>