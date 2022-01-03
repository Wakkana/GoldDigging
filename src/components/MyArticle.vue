<template>
  <div class="articles">
    <a><span class="author"> {{author_name}} </span> &emsp;|&emsp; <span>{{date}} </span> &emsp;|&emsp; <span>{{tags}}</span> </a><br/>
    <a><span class="titles"> {{title}} </span></a><br/>
    <a class="content"> {{content}} </a><br/><br/>
    <Stat :watchs="viewcount" :thumbups="diggcount" :comments="commentcount"/>
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
    return {
      author_name,
      date,
      tags,
      title,
      content,
      viewcount,
      diggcount,
      commentcount
    }
  }
}
</script>

<style scoped>
.articles {
  margin-top: -3px; 
  padding: 20px;
  border: 3px solid	#D3D3D3;
}
.articles > a {
  color: grey;
  font-size:18px;
}
.titles {
  font-size: 30px;
  color: black;
}
.author {
  color: #83afaf ;
}
.content {
  padding-top:10px;
  padding-bottom: 10px;
}
</style>