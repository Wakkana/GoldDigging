<template>
  <div class="bg">
    <a-menu
      v-model:selectedKey="info.currTags"
      theme="dark"
      mode="horizontal"
      style="padding-left:111px"
      :style="{ lineHeight: '64px'}"
    >
      <a-menu-item v-for="t in info.tags" :key="t.category_id">
        <a @click="changeTags(t.category_id)"> {{t.category_name}}</a>
      </a-menu-item>
    </a-menu>


    <a-layout-content class="MainScroll" style="padding: 0 5px" ref="scroll">
      <SortBy/>
      <a-layout-content style="padding: 0 5px">
        <div :style="{ background: '#fff', minHeight: '280px' }">
          <MyArticle
            v-for="a in info.articles" 
            :key="a.article_id" 
            :info="a"
          />
        </div>
      </a-layout-content>
    </a-layout-content>
    <button @click="appendArticles()">click to update</button>
  </div>

</template>

<script>
import MyArticle from './MyArticle.vue'
import SortBy from './SortBy'
import { inject } from 'vue'
import {getArticles} from '../fake-api'
export default {
  name: "MyList",
  components: {
    MyArticle,
    SortBy,
  },
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
    function changeTags(val) {
      info.currTags = val;
      updateArticles(info.currTags, info.sortBy)
    }

    function appendArticles() {
      getArticles(info.currTags, info.sortBy, info.articles.length).then((res)=>{
        if (res.code == 0) {
          info.articles.push(...res.data.articles);
        } else {
          console.log("err", res.code);
        }
      })
    }
    return {
      info,
      changeTags,
      appendArticles,
    }
  },
}
</script>

<style scoped>

.bg {
  display: block;
  margin-top: 0px;
  background-size: cover;
  border-radius: 20px;
  background-color: rgb(244,245,245);
}
.MainScroll {
  margin-left:10%;
  margin-right:10%;
  margin-top:4%;
  background-color:white
}
</style>