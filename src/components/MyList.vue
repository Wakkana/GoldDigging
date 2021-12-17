<template>
  <div>
    <MyArticle v-for="a in arts" :key="a.date" :title="a.title" :date="a.date"/>
  </div>

</template>

<script>
import MyArticle from './MyArticle.vue'
export default {
  name: "MyList",
  components: {
    MyArticle
  },
  data() {
    return {
      arts: [
        {title: "test1", date: "20210899"},
        {title: "test2", date: "20203432"},
      ]
    }
  }
}
</script>

<style>

</style>