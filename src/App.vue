<template>
  <Categories/>
  <router-view></router-view>
</template>

<script>
import {reactive, provide} from 'vue'
import Categories from './components/Categories.vue'
export default {
  components: { Categories },
  name: 'App',
  setup() {
    let info = reactive({
      categories: [],
      tags: [],
      articles: [],
      currCategories: 0,
      currTags: 0,
      sortBy: 'hot'
    })
    provide('info', info);

    return {
      info
    }
  },

}
</script>

<style>

</style>
