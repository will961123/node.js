<template>
  <div class="home">
    <!-- swiper -->
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../images/sw1.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../images/sw1.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>

    <!-- 图标导航 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex felx-wrap">
        <div class="nav-item mb-3" v-for="(item,index) in 10 " :key="index">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrowtop mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <!-- 新闻列表资讯卡片 -->
    <m-list-card icon="menu" title="新闻资讯" :categories="NewsData">
      <!-- #表示要与某一个slot关联 并从中取值-->
      <template #items="{category}">
        <div v-for="(itm,idx) in category.Newslist" :key="idx" class="py-2">
          <span>{{itm.name}}</span>
          <span>{{itm.title}}</span>
          <span>{{itm.date}}</span>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      NewsData: [
        {
          name: "热门",
          Newslist: new Array(5).fill({
            name: "公告",
            title: "11月5日全服不停机更新公告",
            date: "06/05"
          })
        },
        {
          name: "新闻",
          Newslist: new Array(5).fill({
            name: "公告",
            title: "11月5日全服不停机更新公告",
            date: "06/05"
          })
        },
        {
          name: "热门",
          Newslist: new Array(5).fill({
            name: "公告",
            title: "11月5日全服不停机更新公告",
            date: "06/05"
          })
        },
        {
          name: "热门",
          Newslist: new Array(5).fill({
            name: "公告",
            title: "11月5日全服不停机更新公告",
            date: "06/05"
          })
        },
        {
          name: "热门",
          Newslist: new Array(5).fill({
            name: "公告",
            title: "11月5日全服不停机更新公告",
            date: "06/05"
          })
        }
      ]
    };
  }
};
</script>

<style lang="scss" >
// 直接引用样式工具库不好 所以将样式工具库的 变量和使用分离
// @import "../style.scss";
@import "../assets/scss/_variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    background: map-get($colors, "white");
    border-radius: 0.153846rem /* 2/13 */;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-bottom: 1px solid $border-color;
  border-top: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border: none;
    }
  }
}

// 精灵图
.sprite {
  background: url(../images/sprite.png) no-repeat 0 0;
  background-size: 28.846154rem /* 375/13 */;
  display: inline-block;
  &.sprite-news {
    background-position: 63.546% 15.517%;
    width: 1.769231rem /* 23/13 */;
    height: 1.538462rem /* 20/13 */;
  }
  &.sprite-arrowtop {
    background-position: 38.577% 52.076%;
    width: 0.769231rem /* 10/13 */;
    height: 0.769231rem /* 10/13 */ /* 10/13 */;
  }
}
</style>