<template>
  <a-layout-header>
    <div class="logo">
      <img src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6bdafd801c878b10edb5fed5d00969e9.svg" class="logo">
    </div>
    
    <a-menu
      v-model:selectedKeys="onCategory"
      theme="light"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item v-for="c in info.categories" :key="c.category_id">
        <router-link @click="info.currCategories = c.category_id;" :to="`/${c.category_id}`">
          {{c.category_name}}
        </router-link>
      </a-menu-item>
    </a-menu>


  </a-layout-header>
</template>

<script>
  import { ref} from '@vue/reactivity'
  import { inject,watch } from 'vue'
  import { getCategories,getArticles } from "../fake-api"
  import {useRoute} from 'vue-router'
  import { onBeforeMount } from '@vue/runtime-core';
  export default {
    name: "MainRef",
    setup() {
      let loaded = ref(false);
      let info = inject('info');
      let onCategory = ref([0]);
      let route = useRoute();

      watch(()=>route.params, ()=>{
        info.currCategories = parseInt(route.params.category)
      })

      watch(()=>info.currCategories, ()=> {
        onCategory.value[0] = info.currCategories
        info.loading = true;
        if (info.currCategories > 0 && info.currCategories < 5) {
          info.currTags = info.categories[info.currCategories].children[0].category_id
          info.tags = info.categories[info.currCategories].children
        } else {
          info.tags = []
        }
        updateArticles(info.currTags, info.sortBy)
      })
      
      onBeforeMount(()=> {
        //获取分类
        getCategories().then((res)=> {
          info.categories = res.data.categories
          loaded.value = true
        })
        //获取初始文章
        updateArticles(info.currTags, "hot")
      })

      //切换分类时更新文章
      function updateArticles(categoryId = 0, sortBy = 'hot', offset = 0, limit = 10) {
        getArticles(categoryId, sortBy, offset, limit).then((res)=>{
          if (res.code == 0) {
            info.articles.length = 0;
            info.articles.push(...res.data.articles);
          } else {
            console.log("err", res.code);
          }
        })
        info.loading = false;
      } 

      //tags导航栏更改


      return {
        onCategory,
        info,
        loaded
      }
    }
  }
</script>

<style scoped>

.logo {
  float: left;
  margin-top: 9px;
  margin-left: -5px;
  margin-right: 20px;
}
.ant-layout-header {
  background-color: white;
}
</style>