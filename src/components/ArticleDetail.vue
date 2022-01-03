<template>
  <a-layout class="layout">
    <a-layout-content style="padding: 0 80px">
      <div :style="{ background: '#fff', padding: '50px', minHeight: '280px' }" v-html="content"></div>
    </a-layout-content>

    <a-layout-content style="padding: 0 80px">
      <div :style="{ background: '#fff', padding: '40px', minHeight: '280px' }"></div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core';
import {useRoute} from 'vue-router'
import {getArticleById} from '../fake-api'
import {ref} from 'vue'
export default {  
  name:'ArticleDetail',
  setup() {
    const route = useRoute();
    const id = route.params.id;
    let content = ref('');
    onBeforeMount(()=>{
      getArticleById(id).then((res)=>{
        if(res.code == 0) {
          content.value += res.data.article.article_content;
        }
      })
    })

    return {
      content,
    }
  }
}
</script>

<style>
</style>