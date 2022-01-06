<template>
  <div id="comment-section" class="MainScroll" :style="{ background: '#fff', padding: '50px', minHeight: '280px' }">
    <h3>{{comments.length}} replies</h3>
    <a-button v-show="commenting" class="button-comment" @click="publish()">发布</a-button>
    <a-button v-if="commenting" class="button-comment" @click="commenting = false">取消</a-button>
    <a-button v-else class="button-comment" @click="commenting = true">评论</a-button>
    <a-textarea v-show="commenting" placeholder="请输入你的评论" :rows="4" v-model:value="content"/>
    <a-list
      class="comment-list"
      item-layout="horizontal"
      :data-source="comments"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment  :author="item.user_info.user_name" :avatar="item.user_info.avatar_large">
            <template #content>
              <p>
                {{ item.comment_info.comment_content }}
              </p>
            </template>
            <template #datetime>
              <a-tooltip :title="dayjs.unix(item.comment_info.ctime).format('YYYY-MM-DD HH:mm:ss')">
                <span>{{ dayjs.unix(item.comment_info.ctime).fromNow() }}</span>
              </a-tooltip>
            </template>
            <div v-if="item.reply_infos.length > 0">
              <a-list
                :data-source="item.reply_infos"
              >
                <template #renderItem="{ item }">
                  <a-list-item class="reply">
                    <a-comment :author="item.user_info.user_name" :avatar="item.user_info.avatar_large" class="reply-inner">
                      <template #content>
                        <p>
                          {{ item.reply_info.reply_content }}
                        </p>
                      </template>
                      <template #datetime>
                        <a-tooltip :title="dayjs.unix(item.reply_info.ctime).format('YYYY-MM-DD HH:mm:ss')">
                          <span>{{ dayjs.unix(item.reply_info.ctime).fromNow() }}</span>
                        </a-tooltip>
                      </template>
                    </a-comment>
                  </a-list-item>
                </template>
              </a-list>
            </div>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>

  </div>
</template>

<script>
import {getCommentsByArticleId} from '../fake-api'
import {useRoute} from 'vue-router'
import {ref} from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime';
var dayjs = require('dayjs')
dayjs.extend(relativeTime);

export default {
  name:'Comment',
  activated() {
    console.log("comment activated")
    const route = useRoute();
    const id = route.params.id;
    getCommentsByArticleId(id).then((res)=>{
      if (res.code == 0) {  
        console.log(id)
        console.log("comment",res)
        this.comments.length = 0;
        this.comments.push(...res.data.comments);
      }
    })
  },
  setup() {
    let comments = ref([]);
    let commenting = ref(false);
    let content = ref("");
    function publish() {
      commenting.value = false;
      comments.value.unshift({
    "comment_id": "6986796073394553636",
    "comment_info": {
        "comment_id": "6986796073394553636",
        "user_id": "1521379824381357",
        "item_id": "6984577649968414757",
        "item_type": 2,
        "comment_content": content.value,
        "comment_pics": [],
        "comment_status": 1,
        "ctime": 0,
        "comment_replys": [],
        "digg_count": 0,
        "bury_count": 0,
        "reply_count": 0,
        "is_digg": false,
        "is_bury": false,
        "level": 0
    },
    "user_info": {
        "user_id": "1521379824381357",
        "user_name": "You",
        "company": "Google Agricultural Business Group",
        "job_title": "Android Bug Engineer",
        "avatar_large": "",
        "level": 2,
        "description": "Bug工程师",
        "followee_count": 31,
        "follower_count": 53,
        "post_article_count": 6,
        "digg_article_count": 37,
        "got_digg_count": 76,
        "got_view_count": 6445,
        "post_shortmsg_count": 0,
        "digg_shortmsg_count": 0,
        "isfollowed": false,
        "favorable_author": 0,
        "power": 0,
        "study_point": 0,
        "university": {
            "university_id": "0",
            "name": "",
            "logo": ""
        },
        "major": {
            "major_id": "0",
            "parent_id": "0",
            "name": ""
        },
        "student_status": 0,
        "select_event_count": 0,
        "select_online_course_count": 0,
        "identity": 0,
        "is_select_annual": false,
        "select_annual_rank": 0,
        "annual_list_type": 0,
        "extraMap": {},
        "is_logout": 0
    },
    "reply_infos": []
}
      );
      console.log(comments);
    }
    return {
      comments,      
      commenting,
      content,
      dayjs,
      publish,
    }
  }
}
</script>

<style scoped>
h3 {
  flex: 1 0 30%;
}
.comment-list {
  flex: 0 0 100%; 
}
.ans-list {
  flex: 0 0 100%;
}
.ant-list-item {
  padding: 0px;
  flex:0 0 100%;
}
.MainScroll {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  order: 1;
  flex: 0 0 60%;
  justify-content: space-between;
}
.reply {
  padding-left:20px;
  background-color: rgb(250,250,251);
}
.reply-inner {
  margin-top: -10px;
  margin-left: 10px;
}
.button-comment {
  flex: 0 0 15%;
}
</style>
