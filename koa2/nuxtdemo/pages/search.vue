<template>
  <div>
    Page is search
    <ul>
      <li v-for="(item, index) in list" :key="index">{{item}}</li>
      <li v-for="(item, index) in $store.state.city.list" :key="index">{{item}}</li>
      <li>{{$store.state.city.nowSeconds}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'search',
  data() {
    return {
      list: []
    }
  },
  // async mounted() {
  //   let { status, data: list } = await axios.get('/city/list')
  //   if (status === 200) {
  //     this.list = list
  //   }
  // },
  // async asyncData() {
  //   let { status, data: list } = await axios.get('http://127.0.0.1:3000/city/list')
  //   if (status === 200) {
  //     return {
  //       list
  //     }
  //   }
  // }
  async fetch({ store, params }) {
    let { data: list } = await axios.get('http://127.0.0.1:3000/city/list')
    for (const idx in list) {
      await store.dispatch('city/add', list[idx])
    }
  }
}
</script>
