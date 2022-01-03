<template>
  <a-layout-header>
    <div class="logo">
      <img src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6bdafd801c878b10edb5fed5d00969e9.svg" class="logo" data-v-cafea3d4="">
    </div>
    
    <a-menu
      v-model:selectedKey="info.currCategories"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item v-for="c in info.categories" :key="c.category_id">
        <a @click="changeCategories(c.category_id)"> {{c.category_name}}</a>
      </a-menu-item>
    </a-menu>


  </a-layout-header>
</template>

<script>
  import { ref} from '@vue/reactivity'
  import { inject } from 'vue'
  import { getCategories,getArticles } from "../fake-api"
  import { onBeforeMount } from '@vue/runtime-core';
  export default {
    name: "MainRef",
    setup() {
      let loaded = ref(false);
      let info = inject('info');
      onBeforeMount(()=> {
        //获取分类
        getCategories().then((res)=> {
          info.categories = res.data.categories
          loaded.value = true
        })
        
        //获取初始文章
        updateArticles(0, "hot")
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
      } 

      //主分类导航栏更改
      function changeCategories(val) {
        info.currCategories = val;
        if (info.currCategories != 0) {
          info.currTags = info.categories[info.currCategories].children[0].category_id
          info.tags = info.categories[info.currCategories].children
        } else {
          info.tags = []
        }

        updateArticles(info.currTags, info.sortBy)
      }

      //tags导航栏更改


      return {
        info,
        changeCategories,
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
</style>