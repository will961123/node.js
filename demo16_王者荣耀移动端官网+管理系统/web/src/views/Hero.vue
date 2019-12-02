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
          <router-link to="/" tag="span" class="text-grey">皮肤 : 2 &gt;</router-link>
        </div>
      </div>
    </div>

    <!-- 顶部banner结束 -->
    <div class="bg-white px-2">
      <div class="nav jc-around pt-3 pb-2 border-bottom">
        <div class="nav-item active">
          <div class="nav-link">英雄初识</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">进阶攻略</div>
        </div>
      </div>
    </div>
    <swiper>
      <swiper-slide v-if="model.skills">
        <div>
          <div class="p-3 bg-white border-bottom">
            <div class="d-flex jc-between">
              <router-link tag="button" to="/" class="btn btn-lg flex-1">
                <i class="iconfont icon-menu"></i>
                英雄介绍视频
              </router-link>
              <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                <i class="iconfont icon-menu"></i>
                一图识英雄
              </router-link>
            </div>

            <div class="d-flex mt-3 jc-around skills">
              <img
                @click="skillsIndx=index"
                class="icon"
                :class="{'select':skillsIndx===index }"
                v-for="(item,index) in model.skills"
                :key="index"
                :src="imgUrl+item.icon"
                width="60"
                height="60"
              />
            </div>
            <div class="d-flex ai-center">
              <h3>{{model.skills[skillsIndx].name}}</h3>
              <span
                class="ml-3 text-grey-1"
              >(冷却：{{model.skills[skillsIndx].cost}} 消耗：{{model.skills[skillsIndx].delay}})</span>
            </div>
            <div class="pb-2 border-bottom">{{model.skills[skillsIndx].description}}</div>
            <div class="pt-2 text-grey">{{model.skills[skillsIndx].tips}}</div>
          </div>

          <m-card plain icon="menu" class="hero-items" title="出装推荐">
            <div class="border-bottom pb-3">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex text-center jc-around mt-3">
                <div class="item" v-for="(item,index ) in model.items1" :key="index">
                  <img :src="imgUrl+item.icon" alt />
                  <div class="mt-2 fs-sm text-grey-1">{{item.name}}</div>
                </div>
              </div>
            </div>

            <div class="pb-3 mt-3">
              <div class="fs-xl">逆风出装</div>
              <div class="d-flex text-center jc-around mt-3">
                <div class="item" v-for="(item,index ) in model.items2" :key="index">
                  <img :src="imgUrl+item.icon" alt />
                  <div class="mt-2 fs-sm text-grey-1">{{item.name}}</div>
                </div>
              </div>
            </div>
          </m-card>
          <m-card plain icon="menu" title="使用技巧">{{model.usageTips}}</m-card>
          <m-card plain icon="menu" title="对抗技巧">{{model.battleTips}}</m-card>
          <m-card plain icon="menu" title="团战思路">{{model.teamTips}}</m-card>
          <m-card plain icon="menu" title="英雄关系" class="partner-items">
            <div class="fs-xl mb-2">最佳搭档</div>
            <div class="item d-flex mt-3" v-for="(item,index) in model.partners" :key="index">
              <img :src="item.hero.icon" alt />
              <p class="fs-sm m-0 ml-2 flex-1 ">{{item.description}}</p>
            </div>
          </m-card>
        </div>
      </swiper-slide>
      <swiper-slide></swiper-slide>
    </swiper>
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
      model: "",
      skillsIndx: 0
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
      border: 1px solid #fff;
    }
  }

  .border-bottom {
    border-bottom: 1px solid $border-color;
  }

  .skills {
    img.icon {
      border: 3px solid map-get($colors, "white");
      &.select {
        border-color: map-get($colors, "primary");
        border-radius: 45%;
      }
    }
  }

  .hero-items {
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }

  .partner-items {
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>