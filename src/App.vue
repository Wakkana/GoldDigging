<template>
  <Categories/>
  <MyList/>
</template>

<script>
import Categories from './components/Categories.vue'
import MyList from './components/MyList.vue'
import {ref, provide} from 'vue'

export default {
  name: 'App',
  setup() {
    let articles = ref([])
    provide('articles', articles);

    return {articles}
  },
  components: {
    Categories,
    MyList
  },

}
</script>

<style>

</style>
