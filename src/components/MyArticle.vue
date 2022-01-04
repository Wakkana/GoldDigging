<template>
  <div class="articles">
    <div class="meta-container">
      <div class="author"> {{author_name}} </div> 
      <div class="date">{{date}}</div>
      <div class="tag">{{tags}}</div><br>
      <a-button class="watchlater" @click="WatchLater()" shape="round" size="small">稍后再看</a-button>
    </div>

    <div class="content-wrapper">
      <a><router-link class="titles" :to="`/articles/${articleId}`">{{title}}</router-link></a>
      <div class="content"><a> {{content}}··· </a></div>
      <Stat :watchs="viewcount" :thumbups="diggcount" :comments="commentcount"/>
    </div>

  </div>
</template>

<script>
import {toRaw, inject} from 'vue'
import Stat from './Stat.vue'
var dayjs = require('dayjs')
export default {
  name: "Article",
  props:['data'],
  components:{
    Stat,
  },
  setup(props) {
    let info = inject('info')
    let author_name = toRaw(props.data.author_user_info.user_name)
    let date = dayjs.unix(props.data.article_info.ctime).format('DD/MM/YYYY')
    let tags = props.data.category_info.first_category_name + ' · ' + props.data.category_info.second_category_name
    let title = toRaw(props.data.article_info.title)
    let content = toRaw(props.data.article_info.brief_content)
    let viewcount = toRaw(props.data.article_info.view_count)
    let diggcount = toRaw(props.data.article_info.digg_count)
    let commentcount = toRaw(props.data.article_info.comment_count)
    let articleId = toRaw(props.data.article_id);
    function WatchLater() {
      let tmp = info.watchlater;
      tmp.push(props.data);
      tmp = [...new Set(tmp)];
      info.watchlater.length = 0;
      info.watchlater.push(...tmp);
      console.log(info.watchlater)
    }
    return {
      author_name,
      date,
      tags,
      title,
      content,
      viewcount,
      diggcount,
      commentcount,
      articleId,
      WatchLater,
    }
  }
}
</script>

<style scoped>
div {
  display:block
}
.articles {
  display: flex;
  align-items: center;
  position: relative;
  background: #fff;
  padding: 12px 20px 0;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e6eb;
  margin-top: 10px;
  width: 100%;
}

.articles:hover .watchlater{
  visibility: visible;
}
.articles > a {
  color: grey;
  font-size:10px;
  cursor: default;
  margin-bottom: 4px;
}

.meta-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.date {
  position: relative;
  padding: 0 10px;
  line-height: 22px;
  font-size: 13px;
  flex-shrink: 0;
  color: #86909c;
}
.author {
  display: flex;
  align-items: center;
  margin-right: 10px;
  max-width: 162px;
  font-size: 13px;
  line-height: 22px;
  color: #4e5969;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.tag {
  position: relative;
  flex:1 1 auto;
  font-size: 13px;
  line-height: 28px;
  padding: 0 8px;
  color: #86909c;
}
.titles {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #1d2129;
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  margin-bottom: 8px;
   
}
.titles:hover {
  color: grey;
}

.content > a {
  color: #86909c;
  font-size: 13px;
  line-height: 22px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.content-wrapper {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  margin-top: 10px;
  width: 100%;
}


.watchlater {
  display: flex;
  flex: 0 0 10%;
  visibility: hidden;
}

</style>    