<template>
  <Categories/>
  <router-view v-slot="{ Component }">
    <transition
    :name="'fade-transform'"
    :mode="'out-in'"
    >
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view> 
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
      sortBy: 'hot',
      loading: false,
      watchlater: [],
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
