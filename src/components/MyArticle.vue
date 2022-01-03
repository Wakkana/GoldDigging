<template>
  <div class="articles">
    <div class="meta-container">
      <div class="author"> {{author_name}} </div> 
      <div class="date">{{date}}</div>
      <div class="tag">{{tags}}</div><br>
    </div>

    <div class="content-wrapper">
      <a><router-link class="titles" :to="`/articles/${articleId}`">{{title}}</router-link></a>
      <div class="content"><a> {{content}}··· </a></div>
      <Stat :watchs="viewcount" :thumbups="diggcount" :comments="commentcount"/>
    </div>
  </div>
</template>

<script>
import {toRaw} from 'vue'
import Stat from './Stat.vue'
var dayjs = require('dayjs')
export default {
  name: "Article",
  props:['info'],
  components:{
    Stat,
  },
  setup(props) {
    let author_name = toRaw(props.info.author_user_info.user_name)
    let date = dayjs.unix(props.info.article_info.ctime).format('DD/MM/YYYY')
    let tags = props.info.category_info.first_category_name + ' · ' + props.info.category_info.second_category_name
    let title = toRaw(props.info.article_info.title)
    let content = toRaw(props.info.article_info.brief_content)
    let viewcount = toRaw(props.info.article_info.view_count)
    let diggcount = toRaw(props.info.article_info.digg_count)
    let commentcount = toRaw(props.info.article_info.comment_count)
    let articleId = toRaw(props.info.article_id);
    return {
      author_name,
      date,
      tags,
      title,
      content,
      viewcount,
      diggcount,
      commentcount,
      articleId
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
  cursor: pointer;
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

.articles > a {
  color: grey;
  font-size:10px;
  cursor: default;
  margin-bottom: 4px;
}

.meta-container {
  display: flex;
  align-items: center;
}

.date {
  position: relative;
  padding: 0 10px;
  line-height: 22px;
  font-size: 13px;
  flex-shrink: 0;
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
  flex-shrink: 0;
  font-size: 13px;
  line-height: 22px;
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
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
/*   border-bottom: 1px solid #e5e6eb; */
  margin-top: 10px;
  width: 100%;
}

</style>