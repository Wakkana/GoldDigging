<template>
  <div id="comment-section" class="MainScroll" :style="{ background: '#fff', padding: '50px', minHeight: '280px' }">
    <a-list
      class="comment-list"
      :header="`${comments.length} replies`"
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
import { onBeforeMount } from '@vue/runtime-core'
import {getCommentsByArticleId} from '../fake-api'
import {ref} from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime';
var dayjs = require('dayjs')
dayjs.extend(relativeTime);
export default {
  name:'Comment',
  props:['id'],
  setup(props) {
    let comments = ref([]);
    onBeforeMount(()=>{
      getCommentsByArticleId(props.id).then((res)=>{
        if (res.code == 0) {
          console.log(res)
          comments.value.length = 0;
          comments.value.push(...res.data.comments);
        }
      })
    })
    return {
      comments,      
      dayjs,
    }
  }
}
</script>

<style scoped>

.ant-list-item {
  padding: 0px;
}
.ant-list-header {
  font-size: 20px;
}
.MainScroll {
  order: 1;
  flex: 0 0 60%;
}
.reply {
  padding-left:20px;
  background-color: rgb(250,250,251);
}
.reply-inner {
  margin-top: -10px;
  margin-left: 10px;
}
</style>
