<template>
  <div class="userView">
    <div v-if="user">
      欢迎您,
      <span class="username">{{user}}</span>
      [
      <nuxt-link class="exit" to="/exit">退出</nuxt-link>]
    </div>

    <div v-else>
      [
      <nuxt-link class="login" to="/login">立即登录</nuxt-link>]
      [
      <nuxt-link class="register" to="/register">注册</nuxt-link>]
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  }
}
</script>

<style>
</style>
