<template>
  <div v-if="loaded">
    <ul class="categories-ul">
      <li class="categories-li" v-for="c in categories" :key="c.category_id">
        <a class="categories-a" :class="{bgColor: currCategories == c.category_id}" @click="changeCategories(c.category_id)"> {{c.category_name}}</a>
      </li>
    </ul>

    <ul class="tags-ul">
      <li class="tags-li" v-for="t in categories[currCategories].children" :key="t.category_id">
        <a class="tags-a" :class="{bgColor: currTags == t.category_id}" @click="changeTags(t.category_id)"> {{t.category_name}}</a>
      </li>
    </ul>

    <ul class="sort-by">
      <li @click="sortBy = 'hot'">热门</li>
      <li @click="sortBy = 'new'">最新</li>
      <li @click="sortBy = 'history'">历史</li>
    </ul>
  </div>

</template>

<script>
  import { ref} from '@vue/reactivity'
  import { inject } from 'vue'
  import { getCategories,getArticles } from "../fake-api"
  import { onBeforeMount } from '@vue/runtime-core';
  export default {
    name: "MainRef",
    setup() {
      let categories = ref([]);
      let currCategories = ref(0);
      let currTags = ref(0);
      let loaded = ref(false);
      let articles = inject('articles');
      console.log(articles)
      let sortBy = ref("hot");

      onBeforeMount(()=> {
        //获取分类
        getCategories().then((res)=> {
          categories.value = res.data.categories
          loaded.value = true
        })
        
        //获取初始文章
        updateArticles(0, "hot")
      })

      //切换分类时更新文章
      function updateArticles(categoryId = 0, sortBy = 'hot', offset = 0, limit = 10) {
        getArticles(categoryId, sortBy, offset, limit).then((res)=>{
          if (res.code == 0) {
            console.log("categories", articles)
            articles.value.length = 0;
            articles.value.push(...res.data.articles);
          } else {
            console.log("err", res.code);
          }
        })
      } 

      //主分类导航栏更改
      function changeCategories(val) {
        currCategories.value = val;
        if (currCategories.value != 0) {
          currTags.value = categories.value[currCategories.value].children[0].category_id
        }

        updateArticles(currTags.value, sortBy.value)
      }

      //tags导航栏更改
      function changeTags(val) {
        currTags.value = val;
        updateArticles(currTags.value, sortBy.value)
      }


      return {
        categories,
        currCategories,
        currTags,
        articles,
        sortBy,
        changeCategories,
        changeTags,
        loaded
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  li:not(:last-child) {
    border-right: 1px solid grey;
  } 

  /* 当鼠标悬停时把链接颜色更改为 #111（黑色） */
  li a:hover {
    background-color: rgba(211,211,211,0.3);
    cursor:pointer;
  }

  .categories-ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }

  .categories-li {
    float: left;
  }

  .categories-li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
  }

  /* 当鼠标悬停时把链接颜色更改为 #111（黑色） */
  .categories-li a:hover {
    background-color: #111;
    cursor: pointer;
  }

  .tags-ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    height: 50px;
  }
  .tags-li {
    float: left;
  }

  .tags-li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  /* 当鼠标悬停时把链接颜色更改为 #111（黑色） */
  .tags-li a:hover {
    background-color: #111;
    cursor: pointer;
  }

  .bgColor {
    background-color: #111;
  }
</style>