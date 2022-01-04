<template>
  <a-layout class="layout">
<!--     文章 -->
    <a-layout-content class="MainScroll" style="padding: 0 80px; margin-top:20px" id="article-section">
      <a-page-header
        class="header" 
        style="border: 1px solid rgb(235, 237, 240)"
        title="返回"
        @back="BackOneStep()"
      />
      <div :style="{ background: '#fff', padding: '70px', minHeight: '280px' }">
        <div class="title"><a>{{meta.title}}</a></div>
        <div class="meta-info">
            <a-avatar :size="50" :src="meta.avator"/>
            <div class="author-info">
              <div class="author-name">{{meta.username}}</div>
              <div class="meta-box">
                <div class="time">
                  {{meta.date}}
                  <span>&nbsp;·&nbsp;&nbsp;阅读: {{meta.view}}</span>
                </div>
              </div>  
            </div>
        </div>
        <div class="content" v-html="meta.content"></div>
      </div>
      <Comment :id="id"/>
    </a-layout-content>

<!--     评论 -->
    <SubGuide/>
    <a-back-top />
  </a-layout>
</template>

<script>
var dayjs = require('dayjs')
import {useRoute,useRouter} from 'vue-router'
import {getArticleById} from '../fake-api'
import {reactive,ref} from 'vue'
import Comment from './Comment.vue'
import {CookiesSet} from './plugins/Cookies'
import SubGuide from './SubGuide.vue'
export default {  
  name:'ArticleDetail',
  components:{
    Comment,
    SubGuide,
  },
  activated() {
    const route = useRoute();
    const id = route.params.id;
    getArticleById(id).then((res)=>{
      console.log(res);
      if(res.code == 0) {
        this.meta.title = res.data.article.article_info.title
        this.meta.content += res.data.article.article_content;
        this.meta.avator   = res.data.article.author_user_info.avatar_large;
        this.meta.username = res.data.article.author_user_info.user_name;
        this.meta.date = dayjs.unix(res.data.article.article_info.ctime).format('YYYY年MM月DD日 h时m分');
        this.meta.view = res.data.article.article_info.view_count;
        this.meta.historyId = res.data.article.category_info.first_category_id + '/' + res.data.article.category_info.second_category_id;
        console.log(this.meta.historyId)

        CookiesSet(this.meta.historyId, id)
      }
    })

  },
  setup() {
    let meta = reactive({
      title:'',
      avator:'',
      username:'',
      date:'',
      view: 0,
      content: '',
      historyId:'',
    });
    let id = ref(0);
    let router = useRouter()
    function BackOneStep() {
      router.go(-1)
    }

    return {
      id,
      meta,
      BackOneStep,
    }
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}
.header {
  margin-top: -20px;
  margin-left: -10px;
}
.title {
  margin: 0 0 1.667rem;
  font-size: 1.667rem;
  font-weight: 600;
  line-height: 1.31;
  color: #252933;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: #909090;
}

.meta-info {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 10px;
  border-bottom: 1px solid rgb(240, 237, 242);
}
.author-info {
  min-width: 0;
  flex-grow: 1;
  min-height: 43px;
  margin-top:-6px;
  margin-left:10px;
}
.author-name {
  display: inline-block;
  width: 100%;
  font-size: 1.110rem;

  font-weight: 500;
  color: #515767;
  line-height: 2rem;
  height: 2rem;
}

.meta-box {
  letter-spacing: 1px;
}
.time {
  font-size: 0.7rem;
  color: #8a919f;
  margin-top: 2px;
  line-height: 22px;
}
.ant-layout{    
  flex-direction: row;
}
.MainScroll{
  order: 0;
  flex: 1 0 70%;
}

</style>