<template>
  <div class="bg">
    <MyArticle
      v-for="a in articles" 
      :key="a.article_id" 
      :info="a"
    />
  </div>

</template>

<script>
import MyArticle from './MyArticle.vue'
import { inject } from 'vue'
export default {
  name: "MyList",
  components: {
    MyArticle
  },
  setup() {
    let articles = inject('articles'); 
    console.log(articles)
    return {
      articles
    }
  },
}
</script>

<style scoped>

  .bg {
    display: block;
    margin-top: 20px;
    background-color: white;
    background-size: cover;
    border-radius: 20px;
  }
</style>