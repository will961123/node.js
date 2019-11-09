<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30" alt />
      <div class="px-2">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button class="btn bg-primary text-black">立即下载</button>
    </div>
    <div class="nav">
      <h1>首页上方橘黄色的跳转菜单</h1>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>