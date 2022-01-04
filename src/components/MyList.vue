<template>
  <div class="bg">
    <div class="tags">
      <a-button v-for="t in info.tags" shape="round" :key="t.category_id">
        <a @click="changeTags(t.category_id)"> {{t.category_name}}</a>
      </a-button>
    </div>

    <a-layout-content class="MainScroll" style="padding: 0 5px" ref="scroll">
      <SortBy/>
      <a-layout-content style="padding: 0 5px">
        <div v-if="info.loading" class="loading">
          <a-spin />
        </div>
        <div v-else :style="{ background: '#fff', minHeight: '280px' }" ref="myScroll">
          <MyArticle
            v-for="a in info.articles" 
            :key="a.article_id" 
            :data="a"
          />
        </div>
      </a-layout-content>
    </a-layout-content>
    <a-layout-content class="watchlater-wrapper">
      <WatchLater/>
    </a-layout-content>
  </div>

</template>

<script>
import MyArticle from './MyArticle.vue'
import WatchLater from './WatchLater.vue'
import SortBy from './SortBy'
import { inject,onMounted,ref} from 'vue'
import {getArticles} from '../fake-api'
export default {
  name: "MyList",
  components: {
    MyArticle,
    WatchLater,
    SortBy,
  },
  setup() {
    onMounted(()=> {
      window.addEventListener('scroll',()=>{loadingMore()})
    })
    let info = inject('info');
    let state = ref('finish');
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
    function changeTags(val) {
      info.loading = true;
      info.currTags = val;
      info.sortBy = 'hot';
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
      state.value = 'finish'
    }     
    function loadingMore() {
      if (info.sortBy === 'history') return;
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      let bottomOfWindow = (scrollTop + clientHeight) >= (scrollHeight - 40)
      if (scrollTop != 0 && bottomOfWindow && state.value == 'finish') {
          state.value = 'loading'
          appendArticles()
        }
    }

    return {
      info,
      changeTags,
      appendArticles,
      loadingMore,
    }
  },
}
</script>

<style scoped>

.bg {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 0px;
  background-size: cover;
  background-color: rgb(244,245,245);
}
.MainScroll {
  flex: 0 0 60%;
  margin-top:15px;
  margin-left:5%;
  background-color:white
}
.watchlater-wrapper {
  flex: 0 0 30%;
  margin-top:15px;
  margin-left:2%;
  margin-right:3%;
  background-color:white
}
.loading {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
.tags {
  flex:0 0 100%;
  padding-top:20px;
  margin-left:10%;
}
.ant-btn {
  margin-right:10px;
}
</style>