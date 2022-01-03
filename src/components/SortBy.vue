<template>
  <a-menu v-model:selectedKey="info.sortBy" mode="horizontal">
    <a-menu-item key="hot" @click="changeSortBy('hot')">
      热门
    </a-menu-item>
    <a-menu-item key="new" @click="changeSortBy('new')">
      最新
    </a-menu-item>
    <a-menu-item key="history" @click="changeSortBy('history')">
      历史
    </a-menu-item>
  </a-menu>
</template>

<script>
import {inject} from 'vue'
import {getArticles} from '../fake-api'
export default {
  name:"SortBy",
  setup() {
    let info = inject('info');

    function updateArticles(categoryId = 0, sortBy = 'hot', offset = 0, limit = 10) {
        getArticles(categoryId, sortBy, offset, limit).then((res)=>{
          if (res.code == 0) {
            info.articles.length = 0;
            info.articles.push(...res.data.articles);
          } else {
            console.log("err", res.code);
          }
        })
      } 
    function changeSortBy(val) {
      info.sortBy = val;
      updateArticles(info.categoryId, info.sortBy);
    }

    return {
      info,
      changeSortBy
    }
  }
}
</script>

<style>

</style>